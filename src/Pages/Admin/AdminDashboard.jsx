import axios from "axios";
import { useEffect, useState } from "react";
import { IoCartOutline, IoPeopleOutline, IoCubeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAdminActivities } from "../../Utils/AdminActivites";

export default function AdminDashboard() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        setActivities(getAdminActivities());
    }, []);

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_API_URL + "/api/products")
                .then((res) => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [isLoading]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

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
    }, [navigate]);

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            axios
                .get(import.meta.env.VITE_API_URL + "/api/orders", {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    setOrders(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [isLoading, navigate]);

    return (
        <div className="w-full text-text animate-fadeIn">

            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Overview of your store performance
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Orders" value={orders.length} icon={<IoCartOutline />} />
                <StatCard title="Products" value={products.length} icon={<IoCubeOutline />} />
                <StatCard title="Users" value={users.length} icon={<IoPeopleOutline />} />
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-secondary/20 shadow-md p-6
                                hover:shadow-lg transition-all">
                    <h2 className="text-lg font-semibold mb-5">Quick Actions</h2>

                    <div className="flex flex-col gap-3">
                        <DashboardLink to="/admin/orders" label="View Orders" />
                        <DashboardLink to="/admin/products" label="Manage Products" />
                        <DashboardLink to="/admin/add-product" label="Add New Product" />
                        <DashboardLink to="/admin/users" label="Manage Users" />
                    </div>
                </div>

                {/* Activity */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-secondary/20 shadow-md p-6
                                hover:shadow-lg transition-all">
                    <h2 className="text-lg font-semibold mb-5">Recent Activity</h2>

                    {activities.length === 0 ? (
                        <p className="text-sm text-gray-400">No recent activity</p>
                    ) : (
                        <ul className="space-y-4">
                            {activities.map((item, index) => (
                                <ActivityItem
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    time={new Date(item.time).toLocaleString()}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}


/* ======================
   Components
====================== */

function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white rounded-2xl border border-secondary/20 p-6
                        shadow-md hover:shadow-xl
                        transition-all duration-300 hover:-translate-y-1
                        flex items-center justify-between group">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-3xl font-bold mt-1">{value}</p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-accent/15
                            flex items-center justify-center
                            text-accent text-2xl
                            group-hover:scale-110 transition">
                {icon}
            </div>
        </div>
    );
}

function DashboardLink({ to, label }) {
    return (
        <Link
            to={to}
            className="px-4 py-3 rounded-xl border border-secondary/20
                       bg-white hover:bg-accent hover:text-white
                       hover:-translate-y-[1px] hover:shadow-md
                       transition-all font-medium text-sm"
        >
            {label}
        </Link>
    );
}

function ActivityItem({ title, description, time }) {
    return (
        <li className="flex items-start justify-between gap-4
                       p-3 rounded-xl hover:bg-black/5 transition">
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
                {time}
            </span>
        </li>
    );
}
