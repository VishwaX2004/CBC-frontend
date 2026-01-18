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
      await axios.post(import.meta.env.VITE_API_URL + "/api/users/", {
        email,
        password,
        firstName,
        lastName,
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please check your details.");
      console.error("Registration failed:", error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/up.jpg')] bg-cover bg-center flex flex-col md:flex-row">

      {/* LEFT – REGISTER FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-10">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.25)] px-8 sm:px-10 py-10 sm:py-12 transition-all">

          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-2 text-center">
            Create Account
          </h2>
          <p className="text-sm sm:text-base text-text/70 mb-8 text-center">
            Join us for exclusive offers and beauty updates
          </p>

          <form className="space-y-5">

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-text">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full h-11 px-4 rounded-2xl border border-gray-200 bg-white text-text
                  focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-text">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full h-11 px-4 rounded-2xl border border-gray-200 bg-white text-text
                  focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-text">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-4 rounded-2xl border border-gray-200 bg-white text-text
                placeholder:text-gray-400 focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <label className="text-sm font-medium text-text">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 pr-12 rounded-2xl border border-gray-200 bg-white text-text
                focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-accent transition"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-text">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-2xl border border-gray-200 bg-white text-text
                focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="button"
              onClick={handleRegister}
              className="w-full h-11 rounded-2xl bg-accent text-white font-medium
              hover:bg-secondary hover:text-text transition-all duration-300 shadow-lg"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text/70">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">
              Login
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-text/50">
            © {new Date().getFullYear()} Crystal Beauty Clear
          </p>
        </div>
      </div>

      {/* RIGHT – BRAND VISUAL */}
      <div className="hidden md:flex w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-16 text-white text-center">
          <img
            src="/logo.png"
            alt="CBC Logo"
            className="w-48 mb-4 drop-shadow-[0_10px_30px_rgba(255,255,255,0.25)]"
          />
          <div className="w-20 h-[3px] bg-accent rounded-full mb-4"></div>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">
            Beauty that feels <br /> naturally yours
          </h1>
          <p className="text-lg text-white/85 max-w-lg sm:max-w-xl">
            Discover premium cosmetic products inspired by purity and elegance.
            Shop confidently, glow effortlessly, and celebrate your natural beauty
            with <span className="text-secondary font-medium">Crystal Beauty Clear</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
