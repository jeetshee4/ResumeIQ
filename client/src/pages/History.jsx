
import { useEffect, useState } from "react";
import { FileCheck, Clock, Search } from "lucide-react";
import api from "../services/api";

function History() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/resume/history");

        setResumes(response.data.resumes || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch resume history"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (date) => {
    if (!date) return "Unknown date";

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
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Resume History
        </h2>

        <p className="text-gray-500 mt-2">
          Track all your uploaded resumes and AI analyses.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* History Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            All Resumes
          </h3>

          <span className="text-sm text-gray-500">
            {resumes.length} resumes
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading resume history...
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <FileCheck
              size={48}
              className="mx-auto text-gray-300 mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-700">
              No resumes yet
            </h3>

            <p className="text-gray-500 mt-2">
              Upload and analyze your first resume to see it here.
            </p>
          </div>
        ) : (
          /* Resume List */
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
              >
                {/* Resume Info */}
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                    <FileCheck size={22} />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800">
                      {resume.originalName}
                    </h4>

                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Clock size={14} />
                      {formatDate(resume.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Score and Status */}
                <div className="flex items-center gap-4">
                  {resume.overallScore !== null &&
                  resume.overallScore !== undefined ? (
                    <span
                      className={`font-semibold ${
                        resume.overallScore >= 80
                          ? "text-green-600"
                          : resume.overallScore >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {resume.overallScore}%
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Not analyzed
                    </span>
                  )}

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      resume.status === "analyzed"
                        ? "bg-green-100 text-green-700"
                        : resume.status === "uploaded"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {resume.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
