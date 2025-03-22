import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

// Configure Cloudinary with environment variables
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
)

/**
 * Uploads a local file to Cloudinary and deletes it from the backend server after upload.
 * @param {string} localFilePath - The path of the file stored on the backend server.
 * @returns {Promise<object|null>} - Cloudinary response if successful, or null if no file is provided.
 */
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null; // Return null if no file path is provided

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto" // Automatically detect file type (image, video, etc.)
            }
        );
        console.log("File uploaded on cloudinary sucessfully.", response.url);
        return response; // Return Cloudinary response (contains URL, public_id, etc.)
    } catch (error) {
        // If upload fails, delete the temporary file from the backend server
        fs.unlinkSync(localFilePath);
        return error;
    }
}

/**
 * ========================== SUMMARY  ================================
 * 1️⃣ When a user uploads a file on a website, the file first reaches the backend server.
 * 2️⃣ Multer is used to handle this upload, temporarily storing the file in a folder on the server.
 * 3️⃣ After receiving the file, the backend uploads it to Cloudinary.
 * 4️⃣ The upload is done in two steps: first to the backend server, then from the server to Cloudinary.
 *     - This is because Multer processes file uploads before the backend can interact with them.
 * 5️⃣ Once the upload to Cloudinary is successful, we no longer need the file on the backend, so we delete it.
 * 6️⃣ If the upload to Cloudinary fails, the file still gets deleted from the backend to avoid unnecessary storage.
 * 7️⃣ `fs.unlinkSync()` is used instead of `fs.unlink()` because:
 *     - It ensures the file is deleted **before** the function proceeds.
 *     - It's useful in this case since we don’t want to leave temp files hanging around.
 * 8️⃣ If a process is still using the file, `unlinkSync()` removes its reference, and the file is deleted once the process stops.
 * ========================================================================
 */

export {uploadOnCloudinary};