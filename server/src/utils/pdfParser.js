// we extract the PDFParse class

const { PDFParse } = require("pdf-parse");

const fs = require("fs/promises");

const extractPdfText = async (filePath)=>{
   
    let parser;

    try {
       

        // Read PDF file

        const data = await fs.readFile(filePath);

        // Initialize PDF parser

        parser = new PDFParse({
            
            data: new Uint8Array(data)
            

        });

        // Extract text

        const result = await parser.getText();

        return result.text;

    }


    finally {

         if(parser) {

            await parser.destroy();
         }



    };
    



}


module.exports = extractPdfText;