const fs = require('fs/promises');

const validatePdf = async (req , res, next) =>{

    try {
        
        if(!req.file){
            return res.status(400).json({
                message: "Please upload a resume"
            });
        }
            const fileHandle  = await fs.open(req.file.path , "r");

            const buffer = Buffer.alloc(5);


            try {
                await fileHandle.read(buffer , 0 , 5 , 0);
            }

            finally {
                await fileHandle.close();
            }

            const isPdf = buffer.toString() === "%PDF-";

            if(!isPdf){
                await fs.unlink(req.file.path);

                return res.status(400).json({
                    message: "Invalid PDF file"
                });
                
            

        } 
        next();
         




    }  catch (error){
        console.error("PDF validation error", error);

        return res.status(500).json({
            message: "PDF validation failed"
        });
    }
         




}


module.exports = validatePdf;