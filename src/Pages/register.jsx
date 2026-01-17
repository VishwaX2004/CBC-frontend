import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();

    async function handleRegister() {

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/",
                {
                    email,
                    password,
                    firstName,
                    lastName
                }
            );

            toast.success("Registration successful!");
            navigate("/login");

        } catch (error) {
            toast.error("Registration failed. Please check your details.");
            console.error("Registration failed:", error);
        }
    }

    return (
        <div className="min-h-screen w-full bg-[url('/up.jpg')] bg-cover bg-center flex">

            {/* LEFT – REGISTER FORM */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.25)] px-8 py-10 md:px-10 md:py-12 transition-all">

                    <h2 className="text-3xl font-semibold text-text tracking-tight mb-1">
                        Create an account
                    </h2>
                    <p className="text-sm text-text/70 mb-8">
                        Join us for exclusive offers and beauty updates
                    </p>

                    <form onSubmit={handleRegister} className="space-y-5">

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full h-11 px-4 rounded-2xl border border-gray-200 bg-white text-text
                                placeholder:text-gray-400 outline-none
                                focus:ring-2 focus:ring-accent/40 focus:border-accent
                                transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-text">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full h-11 px-4 rounded-2xl border border-gray-200 bg-white text-text
                                    focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-text">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full h-11 px-4 rounded-2xl border border-gray-200 bg-white text-text
                                    focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-11 px-4 pr-12 rounded-2xl border border-gray-200 bg-white text-text
                                    focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-4 flex items-center
                                    text-gray-500 hover:text-accent transition"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-text">
                                Confirm password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full h-11 px-4 rounded-2xl border border-gray-200 bg-white text-text
                                focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleRegister}
                            className="w-full h-11 rounded-2xl bg-accent text-white font-medium
                            hover:bg-secondary hover:text-text
                            focus:outline-none focus:ring-2 focus:ring-accent/50
                            transition-all duration-300 shadow-lg"
                        >
                            Create account
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-text/70">
                        Already have an account?{" "}
                        <Link to="/login" className="text-accent font-medium hover:underline text-l font-bold">
                            Login
                        </Link>
                    </p>

                    <p className="mt-8 text-center text-xs text-text/50">
                        © {new Date().getFullYear()} Crystal Beauty Clear
                    </p>
                </div>
            </div>

            {/* RIGHT – BRAND */}
            <div className="hidden md:flex w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
                <div className="relative z-10 flex flex-col justify-center items-center text-center px-20 text-white">
                    <img
                        src="/logo.png"
                        alt="CBC Logo"
                        className="w-44 mb-6 drop-shadow-2xl"
                    />
                    <h1 className="text-4xl font-semibold leading-tight mb-4">
                        Beauty that feels <br /> naturally yours
                    </h1>
                    <p className="text-lg text-white/85 max-w-lg">
                        Premium cosmetics inspired by purity, elegance, and confidence.
                        Discover your glow with{" "}
                        <span className="text-secondary font-medium">
                            Crystal Beauty Clear
                        </span>.
                    </p>
                </div>
            </div>

        </div>
    );
}
