import { Mail, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";








function LoginForm() {

    const { checkAuth } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        try {

            setLoading(true);

            const response = await api.post("/auth/login", {

                email,
                password
            })

            console.log(response.data);

            await checkAuth();
            navigate("/dashboard");






        }
        catch (err) {
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );


        }
        finally {
            setLoading(false);
        }


    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-blue-100 text-blue-600 p-3 rounded-xl mb-4">
                        <Sparkles size={24} />
                    </div>

                    <h1 className="text-3xl font-bold text-blue-600">
                        ResumeIQ
                    </h1>

                    <h2 className="text-xl font-semibold text-gray-800 mt-4">
                        Welcome back!
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Login to continue analyzing your resume.
                    </p>
                </div>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleLogin}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500 transition">
                            <Mail size={18} className="text-gray-400 mr-3" />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500 transition">
                            <Lock size={18} className="text-gray-400 mr-3" />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in.. " : "Login"}
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                </form>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;