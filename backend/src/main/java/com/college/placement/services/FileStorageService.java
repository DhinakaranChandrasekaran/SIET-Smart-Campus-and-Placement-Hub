package com.college.placement.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;

/**
 * FileStorageService Interface
 * Abstracts file storage implementation
 * Controllers use this interface - don't know if it's local or cloud
 */
public interface FileStorageService {

    /**
     * Store file for temporary student updates
     * 
     * @param file           The file to store
     * @param registerNumber Student register number
     * @param category       File category (resume, certificate, project, etc.)
     * @return File path (relative)
     */
    String storeTempFile(MultipartFile file, String registerNumber, String category) throws IOException;

    /**
     * Store file for approved student data
     * 
     * @param file           The file to store
     * @param registerNumber Student register number
     * @param category       File category
     * @return File path (relative)
     */
    String storeApprovedFile(MultipartFile file, String registerNumber, String category) throws IOException;

    /**
     * Move file from temp to approved folder
     * 
     * @param tempPath       Temporary file path
     * @param registerNumber Student register number
     * @param category       File category
     * @return New approved file path
     */
    String moveToApproved(String tempPath, String registerNumber, String category) throws IOException;

    /**
     * Delete file
     * 
     * @param filePath File path to delete
     */
    void deleteFile(String filePath) throws IOException;

    /**
     * Delete all temp files for a student
     * 
     * @param registerNumber Student register number
     */
    void deleteTempFiles(String registerNumber) throws IOException;

    /**
     * Get file as byte array
     * 
     * @param filePath File path
     * @return File content as bytes
     */
    byte[] loadFile(String filePath) throws IOException;

    /**
     * Check if file exists
     * 
     * @param filePath File path
     * @return true if exists
     */
    boolean fileExists(String filePath);

    /**
     * Store an image file with custom path
     * Used for student photos, faculty photos, etc.
     * 
     * @param file     - Image file
     * @param type     - "students", "faculty", "officers", "recruiters", "drives"
     * @param id       - Identifier (regNo, faculty name, etc.)
     * @param filename - Original filename
     * @return File path/key
     */
    String storeImage(MultipartFile file, String type, String id, String filename) throws IOException;

    /**
     * Get full file path
     * 
     * @param relativePath Relative file path
     * @return Full path
     */
    Path getFullPath(String relativePath);
}
