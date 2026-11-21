import { User, Mail, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";


function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    const handleRegister = async (e) => {
        e.preventDefault();


        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post("/auth/register", {
                name,
                email,
                password

            })

            console.log(response.data);

            navigate("/login");






        }

        catch (err) {

            setError(

                err.response?.data?.message || "Registration failed. Please try again."

            );



        } finally {
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
                        Create your account
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start your journey towards a better resume.
                    </p>
                </div>

                {/* Registration Form */}
                <form className="space-y-5" onSubmit={handleRegister}>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500 transition">
                            <User size={18} className="text-gray-400 mr-3" />

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

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
                                placeholder="Create a password"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>

                        <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500 transition">
                            <Lock size={18} className="text-gray-400 mr-3" />

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="w-full outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        Create Account
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;