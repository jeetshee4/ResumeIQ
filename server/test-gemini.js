require("dotenv").config();


const ai = require("./src/config/gemini");

const testGemini = async () => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: "Say hello to ResumeIQ in one sentence."
        });

        console.log("Gemini response:");
        console.log(response.text);
    }
    catch (error) {
        console.error("Gemini test failed:", error.message);
    }
};

testGemini();