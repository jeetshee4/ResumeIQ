const express = require("express")

const resumeRouter = express.Router();

// Resume Routes

// Upload Resume

resumeRouter.post("/upload",(req, res)=>{
    res.send("Upload Resume Route")
})

resumeRouter.post("/analyze", (req, res) => {
    res.send("Analyze Resume Route");
});

resumeRouter.get("/history", (req, res) => {
    res.send("Resume History Route");
});


module.exports = resumeRouter;