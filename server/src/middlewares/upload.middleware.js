const multer = require('multer');

// 1. Configure Storage

const storage = multer.diskStorage({
    destination: (req , file, cb) =>{
        cb(null , "uploads" );
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