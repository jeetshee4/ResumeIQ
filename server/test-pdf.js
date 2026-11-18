const extractPdfText = require("./src/utils/pdfParser");

const testParser = async () => {
    try {
        const text = await extractPdfText(
            "./uploads/test.pdf"
        );

        console.log("Extracted PDF Text:");
        console.log(text);
    }
    catch (error) {
        console.error("PDF parsing failed:", error);
    }
};

testParser();