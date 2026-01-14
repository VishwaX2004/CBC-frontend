import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function SendOTP() {
        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        try {
            await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users/send-otp/${email}`
            );
            toast.success("OTP sent to your email");
            setStep("otp");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send OTP");
        }
    }

    async function ChangePassword() {
        if (!otp || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/reset-password/`,
                { email: email.trim(), otp: otp.trim(), newPassword }
            );
            toast.success("Password changed successfully");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP");
        }
    }

    return (
        <div className="min-h-screen w-full bg-[url('/up.jpg')] bg-cover bg-center flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/30 backdrop-blur-xl shadow-2xl p-8 sm:p-10 flex flex-col gap-6 transition-all">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-semibold text-text">
                        Reset Password
                    </h1>
                    <p className="text-sm text-text/70">
                        Securely regain access to your account
                    </p>
                </div>

                {/* EMAIL STEP */}
                {step === "email" && (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 w-full rounded-xl bg-white/80 px-4 text-text placeholder:text-text/40
                                           border border-transparent outline-none
                                           focus:border-accent focus:ring-2 focus:ring-accent/30
                                           transition-all duration-200"
                            />
                        </div>

                        <button
                            onClick={SendOTP}
                            className="h-12 w-full rounded-xl font-medium text-white
                                       bg-gradient-to-r from-accent to-secondary
                                       shadow-lg shadow-accent/30
                                       hover:opacity-90 hover:shadow-xl
                                       active:scale-[0.98]
                                       transition-all duration-200"
                        >
                            Send OTP
                        </button>
                    </div>
                )}

                {/* OTP STEP */}
                {step === "otp" && (
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text">
                                OTP Code
                            </label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="h-12 w-full rounded-xl bg-white/80 px-4 text-text tracking-widest text-center
                                           border border-transparent outline-none
                                           focus:border-accent focus:ring-2 focus:ring-accent/30
                                           transition-all duration-200"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="h-12 w-full rounded-xl bg-white/80 px-4 text-text
                                           border border-transparent outline-none
                                           focus:border-accent focus:ring-2 focus:ring-accent/30
                                           transition-all duration-200"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-12 w-full rounded-xl bg-white/80 px-4 text-text
                                           border border-transparent outline-none
                                           focus:border-accent focus:ring-2 focus:ring-accent/30
                                           transition-all duration-200"
                            />
                        </div>

                        <button
                            onClick={ChangePassword}
                            className="h-12 w-full rounded-xl font-medium text-white
                                       bg-gradient-to-r from-green-500 to-emerald-600
                                       shadow-lg shadow-green-500/30
                                       hover:opacity-90 hover:shadow-xl
                                       active:scale-[0.98]
                                       transition-all duration-200"
                        >
                            Change Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
