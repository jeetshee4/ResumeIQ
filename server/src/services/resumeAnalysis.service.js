const ai = require("../config/gemini")

const analyzeResumeWithAI = async (resumeText) => {

  const prompt = `
   You are an expert resume reviewer and ATS optimization specialist.

   Analyze the following resume carefully

   RESUME:
   ${resumeText}

   Provide your analysis in the following JSON structure:

   {
      "summary":"Brief professional summary of the candidate",
      "overallScore": 0,
      "skills":{
        "technical":[],
        "soft":[]
      
      },

      "strengths": [],
      "weaknesses": [],
      "missingKeywords":[],
      "improvements": []
   
   
   
   }
  
   Rules:
   - overallScore must be an integer between 0 and 100.
   - Be honest and constructive.
   - Identify keywords relevant to the candidate's apparent career profile.
   - Do not invent qualifications or experience.
   - Return ONLY valid JSON.
   - Do not use markdown code fences
 `;



  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt
  })

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  try {

    return JSON.parse(response.text);
  }
  catch (error) {
    console.error("Gemini returned invalid JSON:", response.text);

    throw new Error("AI returned an invalid analysis format");
  }


}

module.exports = analyzeResumeWithAI;

