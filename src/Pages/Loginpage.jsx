import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function Loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            axios.post(import.meta.env.VITE_API_URL + "/api/users/google-login", {
                token: response.access_token
            }).then((res) => {
                localStorage.setItem("token", res.data.token);
                toast.success("Login successful!");

                const user = res.data.user;

                if(user.role == "admin"){
                    navigate("/admin");
                }else{
                    navigate("/");
                }
            }).catch((err) => {
                toast.error("Google login failed.");
                console.error(err);
            });
        }
    });

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/login",
                { email, password }
            );

            localStorage.setItem("token", response.data.token);
            toast.success("Login successful!");

            const user = response.data.user;
            navigate(user.role === "admin" ? "/admin" : "/");
        } catch (error) {
            toast.error("Login failed. Please check your credentials.");
            console.error(error);
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/up.jpg')] bg-cover bg-center flex">
            {/* LEFT */}
            <div className="hidden md:flex w-1/2 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
                <div className="relative z-10 flex flex-col items-center justify-center text-white px-24 text-center">
                    <img src="/logo.png" alt="CBC Logo" className="w-48 mb-4" />
                    <h1 className="text-4xl font-semibold mb-4">
                        Beauty that feels <br /> naturally yours
                    </h1>
                    <p className="text-lg text-white/80">
                        Discover premium cosmetic products with{" "}
                        <span className="text-secondary font-medium">
                            Crystal Beauty Clear
                        </span>
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-[430px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-12">
                    <h2 className="text-2xl font-semibold mb-1">
                        Sign in to your account
                    </h2>
                    <p className="text-sm text-text/70 mb-6">
                        Access your orders and wishlist
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                placeholder="example@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-11 px-4 rounded-xl border"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-11 px-4 pr-12 rounded-xl border"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-11 rounded-xl bg-accent text-white font-medium"
                        >
                            Login
                        </button>

                        {/* Google */}
                        <button
                            type="button"
                            onClick={googleLogin}
                            className="w-full h-11 rounded-xl bg-accent text-white font-medium"
                        >
                            Continue with Google
                        </button>
                    </form>

                    <div className="flex justify-end mt-4 text-sm">
                        <Link to="/forget-password" className="text-accent">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        New to CBC?{" "}
                        <Link to="/register" className="text-accent font-medium">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
