const multer = require('multer');
const fs = require("fs");
const path = require("path");
const os = require("os");


// Create temporary upload directory
const uploadDir = path.join(os.tmpdir(), "resumeiq-uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}




// 1. Configure Storage

const storage = multer.diskStorage({
    destination: (req , file, cb) =>{
        cb(null , uploadDir );
    },

    filename: (req , file, cb)=>{
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
})

// 2. File validation

const fileFilter = (req , file , cb)=>{
     if(file.mimetype === "application/pdf"){
        cb(null , true);

        // means no error and accept the file
     }
     else{
        cb(new Error("Only PDF files are allowed!") ,false);

     }
}


// 3 . Configure Multer 

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


module.exports =  upload;