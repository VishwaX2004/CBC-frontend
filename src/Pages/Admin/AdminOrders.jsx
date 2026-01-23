import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderDetailsModal from "../../components/orderInfoModel";
import { logAdminActivity } from "../../Utils/AdminActivites";

export default function AdmiOrderPage() {

    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isModalOpen, setModelOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {

            const token = localStorage.getItem("token");

            if (token == null) {
                navigate("/login");
                return;
            }

            axios.get(
                import.meta.env.VITE_API_URL + "/api/orders",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            )
                .then((res) => {
                    setOrders(res.data);
                     logAdminActivity("Viewed orders", `${res.data.length} orders loaded`);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [isLoading, navigate]);

    return (
        <div className="w-full min-h-screen bg-primary p-6 text-text">

            <OrderDetailsModal
                isModalOpen={isModalOpen}
                closeModal={() => setModelOpen(false)}
                selectedOrder={selectedOrder}
                refresh={() => setLoading(true)}
            />


            <div className="overflow-x-auto rounded-xl shadow-md bg-white">

                <div className="flex items-center gap-4 border-b border-secondary/10 px-6 py-4">
                    <h1 className="text-lg font-semibold text-text">Orders</h1>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                        {orders.length} Orders
                    </span>
                </div>

                {isLoading ? (
                    <Loader />
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="bg-secondary/30 text-text">
                            <tr className="text-sm uppercase tracking-wide">
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Number of Items</th>
                                <th className="p-4">Customer Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Address</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((item) => (
                                <tr
                                    key={item.orderID}
                                    className="border-b hover:bg-primary/60 transition cursor-pointer"
                                    onClick={() => {
                                        setSelectedOrder(item);
                                        setModelOpen(true);
                                    }}
                                >
                                    <td className="p-4 text-sm">{item.orderID}</td>
                                    <td className="p-4 font-medium">
                                        {item.items ? item.items.length : 0}
                                    </td>
                                    <td className="p-4 font-semibold">{item.customerName}</td>
                                    <td className="p-4 font-semibold">{item.email}</td>
                                    <td className="p-4 font-semibold">{item.phone}</td>
                                    <td className="p-4 font-semibold">{item.address}</td>
                                    <td className="p-4 font-semibold">
                                        LKR {Number(item.total).toFixed(2)}
                                    </td>
                                    <td className="p-4 font-semibold">{item.status}</td>
                                    <td className="p-4 font-semibold">
                                        {item.date
                                            ? new Date(item.date).toLocaleDateString()
                                            : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {!isLoading && orders.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No products available
                    </div>
                )}
            </div>
        </div>
    );
}
