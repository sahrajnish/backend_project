import multer from "multer"; 

// Configure storage settings for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Set the destination folder where files will be temporarily stored on the backend server
        cb(null, './public/temp'); 
    },
    filename: function(req, file, cb) {
        // Save the file with its original name
        cb(null, file.originalname); 
    }
});

// Create an instance of multer with the defined storage configuration
export const upload = multer({
    storage: storage
});

/*
    SUMMARY:

    1️⃣ `req` (request object) is automatically passed to the function. 
       - It contains details about the user making the request.
       - It can be used to verify authentication before uploading files.
       - Even if unused here, it allows customization (e.g., saving files in user-specific folders).

    2️⃣ `file` represents the uploaded file.
       - It contains properties like `originalname`, `mimetype`, `size`, etc.
       - Used in `filename` to retain the original file name.
       - Can help with file validation (e.g., filtering by type or size).

    3️⃣ `cb` (callback function) is used to pass the destination and filename to multer.
       - This is how multer knows where to store the file and what name to use.

    4️⃣ The file is first uploaded to the **backend server** and stored temporarily in `./public/temp`.
       - After that, it can be uploaded to a cloud storage service like **Cloudinary**.
       - Once uploaded to Cloudinary, the temporary file on the backend server can be deleted.

    🔥 Conclusion:
    - This 2-step process ensures files reach the backend server first before being uploaded to the cloud.
    - The local file should be deleted once the cloud upload is successful to save storage space.
*/

