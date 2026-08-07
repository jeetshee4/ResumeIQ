const express = require("express")

const resumeRouter = express.Router();

const {
    uploadResume,
    analyzeResume,
    getHistory
} = require("../controllers/resume.controller")

// Resume Routes

// Upload Resume

resumeRouter.post("/upload", uploadResume)

resumeRouter.post("/analyze", analyzeResume);

resumeRouter.get("/history", getHistory);


module.exports = resumeRouter;