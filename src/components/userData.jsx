import axios from "axios";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function UserData({ mobile = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <div className={`flex items-center ${mobile ? "flex-col w-full" : "mr-[80px] md:mr-12 lg:mr-24"}`}>

      {/* Logout Confirmation Modal */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
            <p className="text-gray-700 mb-4 text-center font-medium">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Yes
              </button>
              <button
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}

      {/* User Pill */}
      {!loading && user && (
        <div
          className={`group relative flex items-center mr-4 gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition ${
            mobile ? "w-full mt-4" : ""
          }`}
        >
          <img
            src={user?.image || "/default-avatar.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap mr-[15px]">
            {user.firstName}
          </span>
          <IoChevronDown className="ml-auto text-gray-500 text-sm transition group-hover:rotate-180" />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Account Settings
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
              Orders
            </button>
            <div className="h-px bg-gray-200 my-1" />
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              onClick={() => setIsLogoutConfirmOpen(true)}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Login Button if no user */}
      {!loading && !user && (
        <Link
          to="/login"
          className={`flex items-center justify-center px-4 py-2 rounded-full font-semibold text-accent bg-white hover:bg-accent-dark transition ${
            mobile ? "w-full mt-4" : ""
          }`}
        >
          Login
        </Link>
      )}
    </div>
  );
}
