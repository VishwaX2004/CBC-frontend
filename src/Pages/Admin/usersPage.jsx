import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";

/* =========================
   Block Confirmation Modal
========================= */
export function UserBlockConfirm({ user, close, refresh }) {
    const userEmail = user.email;

    function BlockUser() {
        const token = localStorage.getItem("token");

        axios.put(
            import.meta.env.VITE_API_URL + "/api/users/block/" + userEmail,
            { isBlock: !user.isBlock },
            { headers: { Authorization: "Bearer " + token } }
        )
        .then(() => {
            toast.success("User status updated");
            refresh(userEmail);
            close();
        })
        .catch(() => toast.error("Action failed"));
    }

    return (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center">
            <div className="w-[420px] bg-primary rounded-2xl shadow-xl p-6 relative">
                <button
                    onClick={close}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-red-600 text-white rounded-full font-bold hover:bg-white hover:text-red-600 border border-red-600 transition"
                >
                    ✕
                </button>

                <h2 className="text-lg font-semibold text-center text-text">
                    {user.isBlock ? "Unblock User" : "Block User"}
                </h2>

                <p className="text-sm text-center mt-4 text-gray-600">
                    Are you sure you want to {user.isBlock ? "unblock" : "block"}:
                    <span className="block font-semibold text-text mt-1">
                        {userEmail}
                    </span>
                </p>

                <div className="flex justify-center gap-6 mt-8">
                    <button
                        onClick={BlockUser}
                        className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={close}
                        className="px-6 py-2 bg-secondary text-text rounded-full hover:bg-secondary/80 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

/* =========================
      Admin Users Page
========================= */
export default function AdminUserspage() {
    const [users, setUsers] = useState([]);
    const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        axios
            .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
                headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to fetch users");
                setLoading(false);
            });
    }, []);

    /* 🔥 OPTIMISTIC UI UPDATE */
    function refreshUser(email) {
        setUsers(prev =>
            prev.map(u =>
                u.email === email ? { ...u, isBlock: !u.isBlock } : u
            )
        );
    }

    return (
        <div className="w-full min-h-screen bg-primary p-6 text-text">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold">Users Management</h1>
                    <p className="text-sm text-gray-500">
                        Manage platform users and permissions
                    </p>
                </div>

                <span className="rounded-full bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
                    {users.length} Users
                </span>
            </div>

            {/* Block Modal */}
            {isBlockConfirmVisible && userToBlock && (
                <UserBlockConfirm
                    user={userToBlock}
                    close={() => setIsBlockConfirmVisible(false)}
                    refresh={refreshUser}
                />
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-secondary/20 overflow-x-auto">
                {isLoading ? (
                    <Loader />
                ) : (
                    <table className="w-full">
                        <thead className="bg-secondary/20">
                            <tr className="text-xs uppercase tracking-wide text-text">
                                <th className="px-6 py-4 text-left">User</th>
                                <th className="px-6 py-4 text-left">Name</th>
                                <th className="px-6 py-4 text-center">Role</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-secondary/10">
                            {users.map((user) => (
                                <tr key={user.email} className="hover:bg-primary/40 transition">

                                    {/* User */}
                                    <td className="px-6 py-5 flex items-center gap-4">
                                        <img
                                            src={user.image}
                                            alt={user.firstName}
                                            className={`w-14 h-14 rounded-full object-cover border-2 p-[2px]
                                                ${user.isBlock ? "border-red-500" : "border-green-500"}
                                            `}
                                        />
                                        <div>
                                            <p className="text-sm font-semibold flex items-center gap-1">
                                                {user.email}
                                                {user.isEmailVerified && (
                                                    <MdVerified className="text-blue-500" />
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {user.isBlock ? "Blocked user" : "Active user"}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Name */}
                                    <td className="px-6 py-5 font-medium">
                                        {user.firstName} {user.lastName}
                                    </td>

                                    {/* Role */}
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-text">
                                            {user.role === "admin" && <MdOutlineAdminPanelSettings />}
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${user.isBlock
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"}
                                            `}
                                        >
                                            {user.isBlock ? "Blocked" : "Active"}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-5 text-center">
                                        <button
                                            onClick={() => {
                                                setUserToBlock(user);
                                                setIsBlockConfirmVisible(true);
                                            }}
                                            className={`px-4 py-1 rounded-full text-sm font-medium transition
                                                ${user.isBlock
                                                    ? "bg-green-500 hover:bg-green-600"
                                                    : "bg-red-500 hover:bg-red-600"}
                                                text-white
                                            `}
                                        >
                                            {user.isBlock ? "Unblock" : "Block"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {users.length === 0 && !isLoading && (
                    <div className="text-center py-10 text-gray-400">
                        No users available
                    </div>
                )}
            </div>
        </div>
    );
}
