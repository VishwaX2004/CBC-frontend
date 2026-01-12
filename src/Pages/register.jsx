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
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/",
                {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
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
        <div className="w-full h-screen bg-[url('/up.jpg')] bg-cover bg-center bg-no-repeat flex">

            {/* LEFT – REGISTER FORM */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                <div className="w-[430px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-12">

                    <h2 className="text-2xl font-semibold text-text mb-1">
                        Register
                    </h2>
                    <p className="text-sm text-text/70 mb-6">
                        Access your orders, wishlist, and exclusive offers
                    </p>

                    <form onSubmit={handleRegister} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-white border border-gray-200 text-text
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40
                                focus:border-accent transition"
                                required
                            />
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                autoComplete="given-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-white border border-gray-200 text-text
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40
                                focus:border-accent transition"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-white border border-gray-200 text-text
                                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40
                                focus:border-accent transition"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-11 px-4 pr-12 rounded-xl bg-white border border-gray-200
                                    text-text placeholder-gray-400 focus:outline-none focus:ring-2
                                    focus:ring-accent/40 focus:border-accent transition"
                                    required
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer
                                    text-gray-500 hover:text-accent transition"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-text mb-1">
                                Confirm Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-white border border-gray-200
                                text-text placeholder-gray-400 focus:outline-none focus:ring-2
                                focus:ring-accent/40 focus:border-accent transition"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            className="w-full h-11 rounded-xl bg-accent text-white font-medium tracking-wide
                            hover:bg-secondary hover:text-text transition-all duration-300 shadow-lg mt-2"
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-text/80">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-accent font-medium hover:underline underline-offset-4"
                        >
                            Login
                        </Link>
                    </div>

                    <p className="text-xs text-text/60 mt-6 text-center">
                        © {new Date().getFullYear()} Crystal Beauty Clear
                    </p>
                </div>
            </div>

            {/* RIGHT – BRAND SECTION */}
            <div className="hidden md:flex w-1/2 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-24 text-white text-center">
                    <img
                        src="/logo.png"
                        alt="CBC Logo"
                        className="w-48 mb-4 drop-shadow-[0_10px_30px_rgba(255,255,255,0.25)]"
                    />
                    <div className="w-20 h-[3px] bg-accent rounded-full mb-4"></div>
                    <h1 className="text-4xl font-semibold mb-4">
                        Beauty that feels <br /> naturally yours
                    </h1>
                    <p className="text-lg text-white/85 max-w-xl">
                        Discover premium cosmetic products inspired by purity and elegance.
                        Shop confidently, glow effortlessly, and celebrate your natural beauty
                        with <span className="text-secondary font-medium">Crystal Beauty Clear</span>.
                    </p>
                </div>
            </div>

        </div>
    );
}
