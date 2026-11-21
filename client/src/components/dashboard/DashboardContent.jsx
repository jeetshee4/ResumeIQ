import {
  Upload,
  TrendingUp,
  FileCheck,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";


import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../services/api";








function DashboardContent() {


  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const response = await api.get("/resume/history");

      console.log("HISTORY RESPONSE:", response.data);

      setResumes(response.data.resumes || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchHistory();
}, []);

  // Only resumes with completed analysis and valid scores
  const analyzedResumes = resumes.filter(
    (resume) => resume.overallScore !== null && resume.overallScore !== undefined
  );

  // Calculate average score
  const averageScore =
    analyzedResumes.length > 0
      ? Math.round(
        analyzedResumes.reduce(
          (total, resume) => total + resume.overallScore,
          0
        ) / analyzedResumes.length
      )
      : 0;


  // Recent analyzed resumes
  const recentAnalyses = [...analyzedResumes].slice(0, 3);

  // Format date
  const formatDate = (date) => {
    if (!date) return "Recently";

    const resumeDate = new Date(date);
    const today = new Date();

    const diffTime = today - resumeDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return resumeDate.toLocaleDateString();
  };





  return (
    <>
      {/* Welcome Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, Jeet 👋
          </h2>
          <p className="text-gray-500 mt-2">
            Here's what's happening with your resumes.
          </p>
        </div>

        <button onClick={() => navigate("/analyze")} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">
          <Upload size={18} />
          Upload Resume
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Resumes</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {loading ? "..." : resumes.length}
              </h3>
            </div>

            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <FileCheck size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Average Resume Score</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {loading ? "..." : `${averageScore}%`}
              </h3>
            </div>

            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Completed Analyses</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">
                {loading ? "..." : analyzedResumes.length}
              </h3>
            </div>

            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
              <Sparkles size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Upload Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Analyze your resume with AI
            </h3>

            <p className="text-blue-100">
              Get personalized insights, ATS score and improvement suggestions.
            </p>
          </div>

          <button onClick={() => navigate("/analyze")} className="bg-white text-blue-600 px-5 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-50 transition">
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Recent Analyses */}

      <div className="space-y-4">
        {loading ? (
          <p className="text-gray-500 text-center py-6">
            Loading resumes...
          </p>
        ) : recentAnalyses.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No analyses yet. Upload a resume to get started!
          </p>
        ) : (
          recentAnalyses.map((resume) => (
            <div
              key={resume._id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                  <FileTextIcon />
                </div>

                <div>
                  <h4 className="font-medium text-gray-800">
                    {resume.originalName}
                  </h4>

                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={14} />
                    {formatDate(resume.updatedAt || resume.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold ${resume.overallScore >= 80
                      ? "text-green-600"
                      : resume.overallScore >= 70
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                >
                  {resume.overallScore}%
                </span>

                <button
                  onClick={() => navigate("/analyze")}
                  className="text-gray-400 hover:text-blue-600 transition"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

// Small reusable icon component
function FileTextIcon() {
  return <FileCheck size={20} />;
}

export default DashboardContent;