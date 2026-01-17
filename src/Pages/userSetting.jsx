import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Mediaupload from "../Utils/mediaupload";
import toast from "react-hot-toast";

export default function UserSettingPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null); // FILE
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
            headers: { Authorization: "Bearer " + token }
        })
        .then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setUser(response.data);
        })
        .catch(() => {
            localStorage.removeItem("token");
            navigate("/login");
        });

    }, []); // ✅ FIXED

    async function updateUserData(e) {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            image: user?.image
        };

        if (image) {
            const link = await Mediaupload(image); // now receives FILE
            data.image = link;
        }

        await axios.put(
            import.meta.env.VITE_API_URL + "/api/users/me",
            data,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        );

        toast.success("Profile updated successfully");
        navigate("/");
    }

    async function updatePassword(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        await axios.put(
            import.meta.env.VITE_API_URL + "/api/users/me/password",
            { password },
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        );

        toast.success("Password updated");
        setPassword("");
        setConfirmPassword("");
    }

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // ✅ store FILE, not URL
        }
    }

    return (
        <div className="w-full min-h-screen bg-[url('/up.jpg')] bg-cover bg-center flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-accent">
                        Account Settings
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Customize your profile and secure your account
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* LEFT */}
                    <form onSubmit={updateUserData} className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Profile Information
                        </h2>

                        {/* Avatar */}
                        <div className="flex justify-center mb-6">
                            <label className="relative group cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />

                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-accent shadow-lg">
                                    <img
                                        src={
                                            image
                                                ? URL.createObjectURL(image)
                                                : user?.image || "/avatar-placeholder.png"
                                        }
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center 
                                                opacity-0 group-hover:opacity-100 transition">
                                    <AiOutlineCamera className="text-white text-2xl" />
                                </div>
                            </label>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-accent"
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-accent"
                            />

                            <button
                                type="submit"
                                className="w-full mt-6 bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90"
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>

                    {/* RIGHT */}
                    <form onSubmit={updatePassword} className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Change Password
                        </h2>

                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-accent"
                            />

                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-accent"
                            />

                            <button
                                type="submit"
                                className="w-full mt-6 bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-black"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
