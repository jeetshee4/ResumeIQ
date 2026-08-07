

const uploadResume = (req, res)=>{
    res.send("Upload Resume")
}

const analyzeResume = (req, res)=>{
    res.send("Analyze Resume")
}

const getHistory = (req, res)=>{
    res.send("Get History")
}

module.exports= {
    uploadResume,
    analyzeResume,
    getHistory
};