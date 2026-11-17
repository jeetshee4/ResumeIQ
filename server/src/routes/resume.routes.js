const express = require("express")

const resumeRouter = express.Router();
const upload = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware")
const validatePdf = require("../middlewares/pdfValidation.middleware");

const {
    uploadResume,
    analyzeResume,
    getHistory
} = require("../controllers/resume.controller")

// Resume Routes

// Upload Resume

resumeRouter.post("/upload",authMiddleware, upload.single("resume"), validatePdf ,uploadResume)

resumeRouter.post("/analyze", analyzeResume);

resumeRouter.get("/history", getHistory);


module.exports = resumeRouter;