
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const extractPdfText = require("../utils/pdfParser")
const Resume = require("../models/resume.model");
const analyzeResumeWithAI = require("../services/resumeAnalysis.service");



const uploadResume = async (req, res) => {
    // res.send("Upload Resume")

    try {

        if (!req.file) {
            return res.status(400).json({

                message: "Please upload a resume"
            });
        }

        const extractedText = await extractPdfText(req.file.path);

        //save it to mongoDB






        // Upload PDF to Cloudinary

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw",
            type: "authenticated",
            folder: "resumeiq/resumes"
        });


        const savedResume = await Resume.create({
            userId: req.session.userId,
            originalName: req.file.originalname,
            cloudinaryPublicId: result.public_id,
            format: result.format,
            size: req.file.size,
            extractedText: extractedText
        })


        // sending file details
        return res.status(200).json({
            message: "Resume uploaded successfully",
            resumeId: savedResume._id,
            file: {
                originalName: savedResume.originalName,
                publicId: savedResume.cloudinaryPublicId,
                format: savedResume.format,
                size: savedResume.size
            }
        });
    }
    catch (error) {
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

const analyzeResume = async (req, res) => {
    try {

        const { resumeId } = req.body;

        if (!resumeId) {
            return res.status(400).json({
                message: "Resume ID is required"
            })
        }



        const resume = await Resume.findOne({
            _id: resumeId,
            userId: req.session.userId
        });


        if (!resume) {

            return res.status(404).json({
                message: "Resume not found"
            });
        }

        if (resume.analysis && resume.status === "analyzed") {
            return res.status(200).json({
                message: "Resume already analyzed",
                resumeId: resume._id,
                analysis: resume.analysis
            });
        }




        const analysis = await analyzeResumeWithAI(resume.extractedText);


        resume.analysis = analysis;
        resume.status = "analyzed";

        await resume.save();

        return res.status(200).json({
            message: "Resume analyzed successfully",
            resumeId: resume._id,
            analysis: resume.analysis
        });





    }
    catch (error) {

        console.error("Resume analysis error:", error.message);

        return res.status(500).json({
            message: "Resume analysis failed",
            error: error.message
        });





    }

}





const getHistory = async (req, res) => {


    try {

        const resumes = await Resume.find({
            userId: req.session.userId

        }).sort({ createdAt: -1 });



        const history = resumes.map((resume) => ({
            _id: resume._id,
            originalName: resume.originalName,
            status: resume.status,
            overallScore: resume.analysis?.overallScore || null,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt

        }));

        return res.status(200).json({
            message: "Resume history fetched successfully",
            resumes: history
        });


    }
    catch (error) {


        console.log("Resume history error:", error.message);

        return res.status(500).json({
            message: "Failed to fetch resume history"
        })
    }



}

module.exports = {
    uploadResume,
    analyzeResume,
    getHistory
};