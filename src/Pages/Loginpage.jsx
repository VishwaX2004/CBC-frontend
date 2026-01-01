import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Loginpage() {
    // 1. Standardized naming conventions (camelCase)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e) {
        // 2. Prevent default form submission (page reload)
        e.preventDefault();

        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/login",
                {
                    email: email,
                    password: password,
                }
            );

            // 3. CRITICAL FIX: Changed 'toeken' to 'token'
            // Ensure your backend actually returns "token" and "user"
            localStorage.setItem("token", response.data.token); 
            
            toast.success("Login successful!");
            
            const user = response.data.user;

            if (user.role === "admin") { // Used strict equality ===
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            console.error("Login failed:", error);
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/up.jpg')] bg-cover bg-center bg-no-repeat flex">
            {/* LEFT – BRAND EXPERIENCE */}
            <div className="hidden md:flex w-1/2 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-24 text-white">
                    <img
                        src="/logo.png"
                        alt="CBC Logo"
                        className="w-48 mb-0 drop-shadow-[0_10px_30px_rgba(255,255,255,0.25)]"
                    />
                    <div className="w-20 h-[3px] bg-accent rounded-full mb-2 items-center justify-center"></div>
                    
                    {/* 4. FIX: Completed broken 'mb-' class to 'mb-4' */}
                    <h1 className="text-4xl font-semibold leading-snug mb-4 text-center">
                        Beauty that feels <br /> naturally yours
                    </h1>
                    
                    {/* 5. FIX: 'mb-35' is not standard Tailwind. Changed to 'mb-10' (or use mb-[140px] if you need huge space) */}
                    <p className="text-lg text-white/85 max-w-xl leading-relaxed text-center mb-10">
                        Discover premium cosmetic products inspired by purity and elegance.
                        Shop confidently, glow effortlessly, and celebrate your natural beauty
                        with <span className="text-secondary font-medium">Crystal Beauty Clear</span>.
                    </p>
                </div>
            </div>

            {/* RIGHT – CUSTOMER LOGIN */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center">
                <div className="w-[420px] min-h-[520px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-12 flex flex-col justify-center">

                    <h2 className="text-2xl font-semibold text-text mb-2">
                        Sign in to your account
                    </h2>
                    <p className="text-sm text-text/70 mb-8">
                        Access your orders, wishlist, and exclusive offers
                    </p>

                    {/* 6. WRAP IN FORM: Allows submitting by pressing 'Enter' key */}
                    <form onSubmit={handleLogin}>
                        <input
                            type="email" // Changed to email for browser validation
                            placeholder="Email address"
                            value={email} // Controlled input needs value
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 px-4 mb-4 rounded-xl bg-white border border-gray-200 text-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                            required
                        />

                        {/* Password Input with Eye Icon */}
                        <div className="relative w-full mb-6">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password} // Controlled input needs value
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl bg-white border border-gray-200 text-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition pr-12"
                                required
                            />
                            <div
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </div>
                        </div>

                        <button
                            type="submit" // Triggers the form onSubmit
                            className="w-full h-11 rounded-xl bg-accent text-white font-medium tracking-wide hover:bg-secondary hover:text-text transition-all duration-300 shadow-lg"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-xs text-text/60 mt-6 text-center">
                        © {new Date().getFullYear()} Crystal Beauty Clear
                    </p>
                </div>
            </div>
        </div>
    );
}