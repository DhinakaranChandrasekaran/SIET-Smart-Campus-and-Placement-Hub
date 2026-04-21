package com.college.placement.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

/**
 * LocalFileStorageService
 * Implementation for local file system storage
 * 
 * Folder Structure:
 * uploads/
 * └── students/
 * ├── temp/
 * │ └── reg_XXXX/
 * │ ├── resume.pdf
 * │ ├── certificates/
 * │ └── projects/
 * └── approved/
 * └── reg_XXXX/
 * ├── resume.pdf
 * ├── certificates/
 * └── projects/
 */
@Service
@ConditionalOnProperty(name = "storage.type", havingValue = "local", matchIfMissing = true)
public class LocalFileStorageService implements FileStorageService {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    private static final String STUDENTS_DIR = "students";
    private static final String TEMP_DIR = "temp";
    private static final String APPROVED_DIR = "approved";

    /**
     * Store image with custom path (student photos, faculty photos, etc.)
     */
    @Override
    public String storeImage(MultipartFile file, String type, String id, String filename) throws IOException {
        Path targetDir = Paths.get(uploadDir, type, "photos", id);
        Files.createDirectories(targetDir);
        Path targetPath = targetDir.resolve(filename);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        return Paths.get(uploadDir).relativize(targetPath).toString().replace("\\", "/");
    }

    /**
     * Store file in temp folder
     */
    @Override
    public String storeTempFile(MultipartFile file, String registerNumber, String category) throws IOException {
        // uploads/students/temp/reg_XXXX/category/filename
        Path targetPath = buildPath(TEMP_DIR, registerNumber, category);
        return storeFile(file, targetPath);
    }

    /**
     * Store file in approved folder
     */
    @Override
    public String storeApprovedFile(MultipartFile file, String registerNumber, String category) throws IOException {
        // uploads/students/approved/reg_XXXX/category/filename
        Path targetPath = buildPath(APPROVED_DIR, registerNumber, category);
        return storeFile(file, targetPath);
    }

    /**
     * Move file from temp to approved
     */
    @Override
    public String moveToApproved(String tempPath, String registerNumber, String category) throws IOException {
        Path sourcePath = Paths.get(uploadDir).resolve(tempPath);

        if (!Files.exists(sourcePath)) {
            throw new IOException("Source file not found: " + tempPath);
        }

        // Build approved path
        String fileName = sourcePath.getFileName().toString();
        Path approvedPath = buildPath(APPROVED_DIR, registerNumber, category);
        Files.createDirectories(approvedPath);

        Path targetPath = approvedPath.resolve(fileName);

        // Move file
        Files.move(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING);

        // Return relative path
        return Paths.get(uploadDir).relativize(targetPath).toString().replace("\\", "/");
    }

    /**
     * Delete file
     */
    @Override
    public void deleteFile(String filePath) throws IOException {
        Path path = Paths.get(uploadDir).resolve(filePath);
        if (Files.exists(path)) {
            Files.delete(path);
        }
    }

    /**
     * Delete all temp files for a student
     */
    @Override
    public void deleteTempFiles(String registerNumber) throws IOException {
        Path tempPath = Paths.get(uploadDir, STUDENTS_DIR, TEMP_DIR, "reg_" + registerNumber);
        if (Files.exists(tempPath)) {
            deleteDirectory(tempPath);
        }
    }

    /**
     * Load file as bytes
     */
    @Override
    public byte[] loadFile(String filePath) throws IOException {
        Path path = Paths.get(uploadDir).resolve(filePath);
        if (!Files.exists(path)) {
            throw new IOException("File not found: " + filePath);
        }
        return Files.readAllBytes(path);
    }

    /**
     * Check if file exists
     */
    @Override
    public boolean fileExists(String filePath) {
        Path path = Paths.get(uploadDir).resolve(filePath);
        return Files.exists(path);
    }

    /**
     * Get full path
     */
    @Override
    public Path getFullPath(String relativePath) {
        return Paths.get(uploadDir).resolve(relativePath);
    }

    // ==================== HELPER METHODS ====================

    /**
     * Build directory path
     */
    private Path buildPath(String type, String registerNumber, String category) {
        // uploads/students/[temp|approved]/reg_XXXX/category/
        return Paths.get(uploadDir, STUDENTS_DIR, type, "reg_" + registerNumber, category);
    }

    /**
     * Store file to path
     */
    private String storeFile(MultipartFile file, Path targetDir) throws IOException {
        // Create directories if not exist
        Files.createDirectories(targetDir);

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFilename = UUID.randomUUID().toString() + extension;

        // Full target path
        Path targetPath = targetDir.resolve(uniqueFilename);

        // Copy file
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        // Return relative path from upload dir
        return Paths.get(uploadDir).relativize(targetPath).toString().replace("\\", "/");
    }

    /**
     * Delete directory recursively
     */
    private void deleteDirectory(Path directory) throws IOException {
        if (Files.exists(directory)) {
            Files.walk(directory)
                    .sorted((a, b) -> b.compareTo(a)) // Reverse order for deletion
                    .forEach(path -> {
                        try {
                            Files.delete(path);
                        } catch (IOException e) {
                            System.err.println("Failed to delete: " + path);
                        }
                    });
        }
    }
}
