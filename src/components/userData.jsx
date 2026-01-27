// ================= UserData.jsx =================
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function UserData({ mobile = false, dropdownClassName = "" }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  // 🔹 Fetch logged-in user
  const fetchUser = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
      });
  }, []);

  // 🔹 Initial fetch + listen for profile updates
  useEffect(() => {
    fetchUser();
    window.addEventListener("user-updated", fetchUser);
    return () => window.removeEventListener("user-updated", fetchUser);
  }, [fetchUser]);

  return (
    <div
      className={`flex items-center ${mobile ? "flex-col w-full" : "mr-[80px] md:mr-12 lg:mr-24"}`}
    >
      {/* 🔴 Logout Confirmation Modal */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-[160] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
            <p className="text-gray-700 text-center font-medium mb-6">
              Are you really sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="px-5 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔄 Loader */}
      {loading && (
        <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}

      {/* 👤 User Pill */}
      {!loading && user && (
        <div
          className={`group relative flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition ${
            mobile ? "w-full mt-4" : ""
          }`}
        >
          <img
            src={user.image ? `${user.image}?t=${Date.now()}` : "/default-avatar.png"}
            alt="User Avatar"
            className="w-11 h-11 rounded-full border object-cover border-gray-300"
          />

          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap mr-5">
            {user.firstName}
          </span>

          <IoChevronDown className="text-gray-500 text-sm transition group-hover:rotate-180" />

          {/* ⬇ Dropdown */}
          <div
            className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[150] ${dropdownClassName}`}
          >
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Account Settings
            </Link>
            <Link
              to="/orders"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Orders
            </Link>
            <div className="h-px bg-gray-200 my-1" />
            <button
              onClick={() => setIsLogoutConfirmOpen(true)}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* 🔐 Login Button */}
      {!loading && !user && (
        <Link
          to="/login"
          className={`px-5 py-2 rounded-full font-semibold bg-white text-accent hover:bg-accent hover:text-white transition ${
            mobile ? "w-full mt-4 text-center" : ""
          }`}
        >
          Login
        </Link>
      )}
    </div>
  );
}
