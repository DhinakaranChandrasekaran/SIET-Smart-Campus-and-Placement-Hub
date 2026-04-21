package com.college.placement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * S3FileStorageService - AWS S3 Implementation
 * 
 * Folder structure in S3:
 * s3://bucket-name/
 * └── students/
 * ├── temp/
 * │ └── reg_XXXX/
 * │ ├── resume/
 * │ ├── projects/
 * │ ├── publications/
 * │ ├── patents/
 * │ └── certifications/
 * └── approved/
 * └── reg_XXXX/
 * ├── resume/
 * ├── projects/
 * ├── publications/
 * ├── patents/
 * └── certifications/
 * 
 * TO SWITCH FROM LOCAL TO S3:
 * 1. Set storage.type=s3 in application.properties
 * 2. Fill in AWS credentials in application.properties
 * 3. Restart the backend - NO other changes needed!
 */
@Service
@Primary
@ConditionalOnProperty(name = "storage.type", havingValue = "s3")
public class S3FileStorageService implements FileStorageService {

    @Autowired
    private S3Client s3Client;

    @Value("${aws.s3.bucket-name:siet-placement-files}")
    private String bucketName;

    @Value("${aws.s3.region:ap-south-1}")
    private String region;

    private static final String STUDENTS_DIR = "students";
    private static final String TEMP_DIR = "temp";
    private static final String APPROVED_DIR = "approved";

    @Override
    public String storeImage(MultipartFile file, String type, String id, String filename) throws IOException {
        // Build custom S3 key: type/photos/id/filename
        // e.g., students/photos/reg_921322205001/photo.jpg
        // faculty/photos/dr-priya/photo.jpg
        String folder = type + "/photos/" + id + "/";

        // Delete any existing photos in this folder first (prevent duplicates)
        try {
            ListObjectsV2Request listRequest = ListObjectsV2Request.builder()
                    .bucket(bucketName)
                    .prefix(folder)
                    .build();
            ListObjectsV2Response listResponse = s3Client.listObjectsV2(listRequest);
            for (S3Object obj : listResponse.contents()) {
                DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(obj.key())
                        .build();
                s3Client.deleteObject(deleteRequest);
                System.out.println("🗑️ Deleted old photo: " + obj.key());
            }
        } catch (S3Exception e) {
            System.out.println("⚠️ Could not clean old photos: " + e.getMessage());
        }

        String s3Key = folder + filename;
        uploadToS3(file, s3Key);
        return s3Key;
    }

    @Override
    public String storeTempFile(MultipartFile file, String registerNumber, String category) throws IOException {
        String s3Key = buildS3Key(TEMP_DIR, registerNumber, category, file.getOriginalFilename());
        uploadToS3(file, s3Key);
        return s3Key;
    }

    @Override
    public String storeApprovedFile(MultipartFile file, String registerNumber, String category) throws IOException {
        String s3Key = buildS3Key(APPROVED_DIR, registerNumber, category, file.getOriginalFilename());
        uploadToS3(file, s3Key);
        return s3Key;
    }

    @Override
    public String moveToApproved(String tempPath, String registerNumber, String category) throws IOException {
        // Build the approved path
        String approvedPath = tempPath.replace("/" + TEMP_DIR + "/", "/" + APPROVED_DIR + "/");

        try {
            // Copy from temp to approved
            CopyObjectRequest copyRequest = CopyObjectRequest.builder()
                    .sourceBucket(bucketName)
                    .sourceKey(tempPath)
                    .destinationBucket(bucketName)
                    .destinationKey(approvedPath)
                    .build();
            s3Client.copyObject(copyRequest);

            // Delete the temp file
            DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(tempPath)
                    .build();
            s3Client.deleteObject(deleteRequest);

            System.out.println("✅ Moved S3 file: " + tempPath + " → " + approvedPath);
            return approvedPath;

        } catch (S3Exception e) {
            throw new IOException("Failed to move file in S3: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteFile(String filePath) throws IOException {
        try {
            DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(filePath)
                    .build();
            s3Client.deleteObject(deleteRequest);
            System.out.println("🗑️ Deleted S3 file: " + filePath);

        } catch (S3Exception e) {
            throw new IOException("Failed to delete file from S3: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteTempFiles(String registerNumber) throws IOException {
        String prefix = STUDENTS_DIR + "/" + TEMP_DIR + "/reg_" + registerNumber + "/";

        try {
            // List all objects with the prefix
            ListObjectsV2Request listRequest = ListObjectsV2Request.builder()
                    .bucket(bucketName)
                    .prefix(prefix)
                    .build();

            ListObjectsV2Response listResponse = s3Client.listObjectsV2(listRequest);
            List<S3Object> objects = listResponse.contents();

            if (objects.isEmpty()) {
                System.out.println("ℹ️ No temp files found for: " + registerNumber);
                return;
            }

            // Delete all objects
            for (S3Object obj : objects) {
                DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(obj.key())
                        .build();
                s3Client.deleteObject(deleteRequest);
            }

            System.out.println("🗑️ Deleted " + objects.size() + " temp files for: " + registerNumber);

        } catch (S3Exception e) {
            throw new IOException("Failed to delete temp files from S3: " + e.getMessage(), e);
        }
    }

    @Override
    public byte[] loadFile(String filePath) throws IOException {
        try {
            GetObjectRequest getRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(filePath)
                    .build();

            ResponseInputStream<GetObjectResponse> response = s3Client.getObject(getRequest);
            return response.readAllBytes();

        } catch (S3Exception e) {
            throw new IOException("Failed to load file from S3: " + e.getMessage(), e);
        }
    }

    @Override
    public boolean fileExists(String filePath) {
        try {
            HeadObjectRequest headRequest = HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(filePath)
                    .build();
            s3Client.headObject(headRequest);
            return true;

        } catch (NoSuchKeyException e) {
            return false;
        } catch (S3Exception e) {
            return false;
        }
    }

    @Override
    public Path getFullPath(String relativePath) {
        // For S3, return a pseudo-path with the S3 URL
        String s3Url = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, relativePath);
        return Paths.get(s3Url);
    }

    // ==================== HELPER METHODS ====================

    private String buildS3Key(String type, String registerNumber, String category, String filename) {
        // students/[temp|approved]/reg_XXXX/category/filename
        return String.format("%s/%s/reg_%s/%s/%s",
                STUDENTS_DIR, type, registerNumber, category, filename);
    }

    private void uploadToS3(MultipartFile file, String s3Key) throws IOException {
        try {
            PutObjectRequest putRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            s3Client.putObject(putRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            System.out.println("✅ Uploaded to S3: " + s3Key);

        } catch (S3Exception e) {
            throw new IOException("Failed to upload file to S3: " + e.getMessage(), e);
        }
    }
}
