package com.college.placement.controllers;

import com.college.placement.services.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * File Controller
 * Handles file upload/download for both local and S3 storage
 * Does NOT know about storage implementation (local vs cloud)
 */
@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    /**
     * Upload file to temp folder (student update requests)
     * POST /files/temp/upload
     */
    @PostMapping("/temp/upload")
    public ResponseEntity<Map<String, String>> uploadTempFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("registerNumber") String registerNumber,
            @RequestParam("category") String category) {

        try {
            String filePath = fileStorageService.storeTempFile(file, registerNumber, category);

            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("filePath", filePath);
            response.put("message", "File uploaded successfully");

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Upload file to approved folder
     * POST /files/approved/upload
     */
    @PostMapping("/approved/upload")
    public ResponseEntity<Map<String, String>> uploadApprovedFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("registerNumber") String registerNumber,
            @RequestParam("category") String category) {

        try {
            String filePath = fileStorageService.storeApprovedFile(file, registerNumber, category);

            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("filePath", filePath);
            response.put("message", "File uploaded successfully");

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Upload image (student photo, faculty photo, etc.)
     * POST /files/image/upload
     * 
     * @param file - Image file
     * @param type - "students", "faculty", "officers", "recruiters", "drives"
     * @param id   - Register number for students, faculty ID or name for others
     */
    @PostMapping("/image/upload")
    public ResponseEntity<Map<String, String>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("type") String type,
            @RequestParam("id") String id) {

        try {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null)
                originalFilename = "photo.jpg";

            // Sanitize the ID for use in path
            String sanitizedId = id.replaceAll("[^a-zA-Z0-9._-]", "_");

            // For students, prefix with reg_
            if ("students".equalsIgnoreCase(type)) {
                sanitizedId = "reg_" + sanitizedId;
            }

            String filePath = fileStorageService.storeImage(file, type.toLowerCase(), sanitizedId, originalFilename);

            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("filePath", filePath);
            response.put("message", "Image uploaded successfully");

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", "Failed to upload image: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Download/serve file (works for both local and S3)
     * GET /files/download?path={filePath}
     */
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam("path") String filePath) {

        try {
            byte[] data = fileStorageService.loadFile(filePath);
            ByteArrayResource resource = new ByteArrayResource(data);

            // Extract filename from path
            String filename = filePath.substring(filePath.lastIndexOf("/") + 1);

            // Determine content type from extension
            MediaType contentType = getContentType(filename);

            return ResponseEntity.ok()
                    .contentType(contentType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Serve image inline (for displaying in browser/frontend)
     * GET /files/image?path={filePath}
     */
    @GetMapping("/image")
    public ResponseEntity<Resource> serveImage(@RequestParam("path") String filePath) {

        try {
            byte[] data = fileStorageService.loadFile(filePath);
            ByteArrayResource resource = new ByteArrayResource(data);

            String filename = filePath.substring(filePath.lastIndexOf("/") + 1);
            MediaType contentType = getContentType(filename);

            return ResponseEntity.ok()
                    .contentType(contentType)
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=86400") // Cache for 1 day
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete file
     * DELETE /files?path={filePath}
     */
    @DeleteMapping
    public ResponseEntity<Map<String, String>> deleteFile(@RequestParam("path") String filePath) {

        try {
            fileStorageService.deleteFile(filePath);

            Map<String, String> response = new HashMap<>();
            response.put("success", "true");
            response.put("message", "File deleted successfully");

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("success", "false");
            error.put("message", "Failed to delete file: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Check if file exists
     * GET /files/exists?path={filePath}
     */
    @GetMapping("/exists")
    public ResponseEntity<Map<String, Boolean>> fileExists(@RequestParam("path") String filePath) {

        boolean exists = fileStorageService.fileExists(filePath);

        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);

        return ResponseEntity.ok(response);
    }

    // ==================== HELPER METHODS ====================

    private MediaType getContentType(String filename) {
        String lower = filename.toLowerCase();
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg"))
            return MediaType.IMAGE_JPEG;
        if (lower.endsWith(".png"))
            return MediaType.IMAGE_PNG;
        if (lower.endsWith(".gif"))
            return MediaType.IMAGE_GIF;
        if (lower.endsWith(".webp"))
            return MediaType.valueOf("image/webp");
        if (lower.endsWith(".pdf"))
            return MediaType.APPLICATION_PDF;
        if (lower.endsWith(".mp4"))
            return MediaType.valueOf("video/mp4");
        if (lower.endsWith(".mp3"))
            return MediaType.valueOf("audio/mpeg");
        if (lower.endsWith(".wav"))
            return MediaType.valueOf("audio/wav");
        return MediaType.APPLICATION_OCTET_STREAM;
    }
}
