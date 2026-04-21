/**
 * Image URL Utility
 * Resolves image paths to proper URLs
 * 
 * - Static images (starting with /images/) → served from frontend public folder
 * - S3 images (all other paths) → served via backend /api/files/image?path=
 * - Full URLs (http/https) → used as-is
 */

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

/**
 * Get the proper image URL for display
 * @param {string} path - Image path from DB or static reference
 * @param {string} fallback - Fallback image path (default: default-avatar.png)
 * @returns {string} Full URL to display the image
 */
export const getImageUrl = (path, fallback = '/images/default-avatar.png') => {
    if (!path) return fallback;

    // Full URL (already absolute)
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Static frontend images (served from /public/images/)
    if (path.startsWith('/images/') || path.startsWith('images/')) {
        return path;
    }

    // S3 or storage path → serve via backend API
    return `${API_BASE}/files/image?path=${encodeURIComponent(path)}`;
};

/**
 * Get the proper file download URL
 * @param {string} path - File path from DB
 * @returns {string} Full URL to download the file
 */
export const getFileUrl = (path) => {
    if (!path) return '';

    // Full URL
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Static frontend files
    if (path.startsWith('/')) {
        return path;
    }

    // S3 or storage path → serve via backend API
    return `${API_BASE}/files/download?path=${encodeURIComponent(path)}`;
};

export default { getImageUrl, getFileUrl };
