
const cloudinary = require("../config/cloudinary");
const fs = require("fs");


const uploadResume = async (req, res) => {
    // res.send("Upload Resume")

    try {

        if (!req.file) {
            return res.status(400).json({

                message: "Please upload a resume"
            });
        }


        // Upload PDF to Cloudinary

        const result = await cloudinary.uploader.upload(req.file.path , {
            resource_type: "raw",
            type: "authenticated",
            folder: "resumeiq/resumes"
        });


        // sending file details
        return res.status(200).json({
            message: "Resume uploaded successfully",
            file: {
                originalName: req.file.originalname,
                publicId: result.public_id,
                format: result.format,
                size: req.file.size
            }
        })
    }
    catch(error){
        console.error("Upload error:", error);

        return res.status(500).json({
            message: "Resume upload failed"
        });
    } 
    finally {
        // Delete temporary local file
        if (req.file) {
            await fs.promises.unlink(req.file.path).catch((err) => {
                console.error("Temporary file cleanup failed:", err);
            });
        }
    }



}

const analyzeResume = (req, res) => {
    res.send("Analyze Resume")
}

const getHistory = (req, res) => {
    res.send("Get History")
}

module.exports = {
    uploadResume,
    analyzeResume,
    getHistory
};