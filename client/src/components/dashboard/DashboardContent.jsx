import {
  Upload,
  TrendingUp,
  FileCheck,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";

function DashboardContent() {
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

        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">
          <Upload size={18} />
          Upload Resume
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Resumes</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">12</h3>
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
              <h3 className="text-3xl font-bold text-gray-800 mt-2">78%</h3>
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
              <h3 className="text-3xl font-bold text-gray-800 mt-2">8</h3>
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

          <button className="bg-white text-blue-600 px-5 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-50 transition">
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Recent Analyses
          </h3>

          <button className="text-blue-600 text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {[
            {
              name: "Software Developer Resume",
              score: 85,
              date: "Today",
            },
            {
              name: "Frontend Developer Resume",
              score: 72,
              date: "Yesterday",
            },
            {
              name: "Backend Developer Resume",
              score: 68,
              date: "2 days ago",
            },
          ].map((resume, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                  <FileTextIcon />
                </div>

                <div>
                  <h4 className="font-medium text-gray-800">
                    {resume.name}
                  </h4>

                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={14} />
                    {resume.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold ${
                    resume.score >= 80
                      ? "text-green-600"
                      : resume.score >= 70
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {resume.score}%
                </span>

                <button className="text-gray-400 hover:text-blue-600 transition">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Small reusable icon component
function FileTextIcon() {
  return <FileCheck size={20} />;
}

export default DashboardContent;