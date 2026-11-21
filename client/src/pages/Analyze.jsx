import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { UploadCloud, FileText, X, CheckCircle2 } from "lucide-react";

import api from "../services/api";



function Analyze() {

  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);



  const handleAnalyze = async () => {
    if (!uploadResult?.resumeId)
      return;

    try {

      setAnalyzing(true);

      setError("");

      const response = await api.post("/resume/analyze", {
        resumeId: uploadResult.resumeId,
      });

      setAnalysisResult(response.data.analysis);

      console.log("Analysis Result:", response.data.analysis);





    }
    catch (err) {

      setError(
        err.response?.data?.message || "Resume analysis failed"

      )

    }
    finally {
      setAnalyzing(false);
    }
  }



  const handleUpload = async () => {
    console.log("Button clicked")
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);


    try {

      setUploading(true);
      setError("");

      setUploadResult(null);

      const response = await api.post("/resume/upload", formData);

      setUploadResult(response.data);

      console.log("Upload Response:", response.data);




    }
    catch (err) {
      setError(err.response?.data?.message || "Resume upload failed")

    }
    finally {
      setUploading(false)
    }
  }






  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      setFile(null);
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      setFile(null);
      return;
    }
    setError("");
    setFile(selectedFile);




  }

  const removeFile = () => {
    setFile(null);
    setError("");

  }



  return (
    <div className="flex min-h-screen bg-gray-950 text-white">

      <Sidebar />
      <main className="flex-1 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-3">
              Analyze Your Resume
            </h1>

            <p className="text-gray-400">
              Upload your resume and get AI-powered insights to improve
              your chances of landing your dream job.
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Upload Resume
              </h2>

              <p className="text-sm text-gray-400">
                Upload your resume in PDF format.
              </p>
            </div>

            {!file ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-indigo-500 rounded-2xl p-12 cursor-pointer transition-all duration-200 bg-gray-950/50 hover:bg-indigo-500/5">

                <div className="p-4 bg-indigo-500/10 rounded-full mb-4">
                  <UploadCloud size={32} className="text-indigo-400" />
                </div>

                <p className="text-lg font-medium mb-2">
                  Click to upload your resume
                </p>

                <p className="text-sm text-gray-500">
                  PDF only · Maximum 5 MB
                </p>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-5 bg-gray-950 border border-gray-800 rounded-xl">

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-lg">
                    <FileText className="text-indigo-400" size={24} />
                  </div>

                  <div>
                    <p className="font-medium text-white break-all">
                      {file.name}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={removeFile}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-sm mt-4">
                {error}
              </p>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
            >
              <CheckCircle2 size={20} />
              {uploading ? "Uploading Resume..." : "Analyze Resume"}
            </button>

            {uploadResult && (
              <>
                <div className="mt-5 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <p className="text-green-400 font-medium">
                    Resume uploaded successfully!
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    File: {uploadResult.file.originalName}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Extracted {uploadResult.file.extractedTextLength || 0} characters
                    from your resume.
                  </p>
                </div>

                {/* AI Analysis Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold bg-purple-600 hover:bg-purple-500 disabled:opacity-50 transition-all"
                >
                  {analyzing ? "Analyzing Resume..." : "Generate AI Analysis"}
                </button>
              </>
            )}

          </div>
          {analysisResult && (
            <div className="mt-8 space-y-6">

              {/* ATS Score */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-xl font-semibold mb-6">
                  Resume Analysis Results
                </h2>

                <div className="flex items-center gap-6">
                  <div className="w-28 h-28 rounded-full border-8 border-indigo-500 flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {analysisResult.overallScore}
                    </span>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Overall ATS Score
                    </p>

                    <h3 className="text-2xl font-bold mt-1">
                      {analysisResult.overallScore >= 80
                        ? "Excellent Resume!"
                        : analysisResult.overallScore >= 60
                          ? "Good Resume"
                          : "Needs Improvement"}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Your resume has been evaluated by AI.
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Professional Summary
                </h2>

                <p className="text-gray-300 leading-7">
                  {analysisResult.summary}
                </p>
              </div>

              {/* Skills Analysis */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-5">
                  Skills Analysis
                </h2>

                {/* Technical Skills */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-indigo-400 mb-3">
                    Technical Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {analysisResult.skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h3 className="text-sm font-medium text-purple-400 mb-3">
                    Soft Skills
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {analysisResult.skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>


              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Strengths */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-green-400 mb-5">
                    Strengths
                  </h2>

                  <div className="space-y-3">
                    {analysisResult.strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-green-500/5 border border-green-500/10"
                      >
                        <p className="text-gray-300 leading-6">
                          {strength}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-amber-400 mb-5">
                    Areas to Improve
                  </h2>

                  <div className="space-y-3">
                    {analysisResult.weaknesses.map((weakness, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10"
                      >
                        <p className="text-gray-300 leading-6">
                          {weakness}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Missing Keywords */}

          {analysisResult && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Missing Keywords
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              These keywords may help improve your resume's ATS compatibility.
            </p>

            <div className="flex flex-wrap gap-2">
              {analysisResult.missingKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          )}

          {/* Improvement Suggestions */}
          {analysisResult && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-5">
              AI Improvement Recommendations
            </h2>

            <div className="space-y-4">
              {analysisResult.improvements.map((improvement, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-gray-950 border border-gray-800"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>

                  <p className="text-gray-300 leading-6 pt-1">
                    {improvement}
                  </p>
                </div>
              ))}
            </div>
          </div>
          )}




        </div>
      </main>



    </div>



  )
}

export default Analyze;