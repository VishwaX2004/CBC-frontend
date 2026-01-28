import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";
import UserOrderDetailsModal from "../components/UserOrderinfomodel";


export default function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isModalOpen, setModelOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) return;

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get(`${import.meta.env.VITE_API_URL}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [isLoading, navigate]);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary p-6 sm:p-4 text-text lg:mt-20 mt-10">
            <UserOrderDetailsModal
                isModalOpen={isModalOpen}
                closeModal={() => setModelOpen(false)}
                selectedOrder={selectedOrder}
                refresh={() => setLoading(true)}
            />

            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 lg:mt-5 mt-10">
                <h1 className="text-2xl font-bold text-text mb-2">My Orders</h1>
                <span className="inline-flex items-center rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
                    {orders.length} Orders
                </span>
            </div>

            {isLoading ? (
                <Loader />
            ) : orders.length === 0 ? (
                <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                    <p className="text-lg font-medium text-gray-400">
                        You haven’t placed any orders yet
                    </p>
                </div>
            ) : (
                <>
                    {/* ===== Desktop Table ===== */}
                    <div className="hidden lg:block overflow-x-auto rounded-2xl bg-white shadow-sm">
                        <table className="w-full border-collapse">
                            <thead className="bg-secondary/30 text-text">
                                <tr className="text-sm uppercase tracking-wide">
                                    <th className="p-5 text-left">Order ID</th>
                                    <th className="p-5 text-center">Items</th>
                                    <th className="p-5 text-right">Total</th>
                                    <th className="p-5 text-center">Status</th>
                                    <th className="p-5 text-center">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order.orderID}
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setModelOpen(true);
                                        }}
                                        className="cursor-pointer border-b last:border-none hover:bg-primary/40 transition"
                                    >
                                        <td className="p-5 font-medium">
                                            {order.orderID}
                                        </td>

                                        <td className="p-5 text-center">
                                            {order.items?.length || 0}
                                        </td>

                                        <td className="p-5 text-right font-semibold">
                                            LKR {order.total.toFixed(2)}
                                        </td>

                                        <td className="p-5 text-center">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold
                                                ${
                                                    order.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : order.status === "Completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>

                                        <td className="p-5 text-center text-sm">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ===== Mobile Cards ===== */}
                    <div className="lg:hidden space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.orderID}
                                onClick={() => {
                                    setSelectedOrder(order);
                                    setModelOpen(true);
                                }}
                                className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="font-semibold text-text">
                                        {order.orderID}
                                    </h2>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold
                                        ${
                                            order.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : order.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                <div className="text-sm text-gray-500 space-y-1">
                                    <p>
                                        <span className="font-medium text-text">
                                            Items:
                                        </span>{" "}
                                        {order.items?.length || 0}
                                    </p>
                                    <p>
                                        <span className="font-medium text-text">
                                            Total:
                                        </span>{" "}
                                        LKR {order.total.toFixed(2)}
                                    </p>
                                    <p>
                                        <span className="font-medium text-text">
                                            Date:
                                        </span>{" "}
                                        {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
