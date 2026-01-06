import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function OrderDetailsModal({
    isModalOpen,
    closeModal,
    selectedOrder,
    refresh
}) {
    if (!isModalOpen || !selectedOrder) return null;

    const [status, setStatus] = useState(selectedOrder.status);

    // Sync status if selectedOrder changes
    useEffect(() => {
        setStatus(selectedOrder.status);
    }, [selectedOrder.status]);

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center px-3">
            <div
                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto
                bg-primary rounded-3xl shadow-2xl p-5 sm:p-6 relative
                [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >

                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center
                    bg-white shadow hover:bg-accent hover:text-white transition text-sm"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="mb-5 border-b border-secondary/40 pb-3">
                    <h2 className="text-xl font-bold text-text">
                        Order Details
                    </h2>
                    <p className="text-xs text-text/70 mt-1">
                        Order ID:
                        <span className="font-semibold text-text ml-1">
                            {selectedOrder.orderID}
                        </span>
                    </p>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6">
                    {[
                        ["Customer Name", selectedOrder.customerName],
                        ["Email", selectedOrder.email],
                        ["Phone", selectedOrder.phone],
                        ["Address", selectedOrder.address],
                    ].map(([label, value], i) => (
                        <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                            <p className="text-[11px] font-semibold text-text/60 uppercase mb-1">
                                {label}
                            </p>
                            <p className="font-medium text-text break-words text-sm">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Items */}
                <div className="mb-6">
                    <h3 className="text-base font-semibold text-text mb-3">
                        Ordered Items
                    </h3>

                    <div className="space-y-3">
                        {(selectedOrder.items || []).map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-xl object-cover"
                                />

                                <div className="flex-1">
                                    <p className="font-semibold text-text text-sm">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-text/60">
                                        Qty: {item.quantity}
                                    </p>
                                </div>

                                <p className="font-bold text-text text-sm">
                                    LKR {(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-secondary/40 pt-5 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">

                    {/* Status */}
                    <div>
                        <p className="text-[11px] font-semibold text-text/60 uppercase mb-2">
                            Order Status
                        </p>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="appearance-none cursor-pointer
                                    px-3 py-2 pr-9 rounded-xl text-sm font-semibold
                                    bg-white border border-secondary/40
                                    text-text shadow-sm
                                    hover:border-accent focus:outline-none
                                    focus:ring-2 focus:ring-accent/30 transition"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Cancelled">Shipped</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Cancelled">Refunded</option>
                                </select>

                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text/60 text-xs">
                                    ▼
                                </span>
                            </div>

                            <button
                                onClick={async () => {
                                    try {
                                        const token = localStorage.getItem("token");

                                        await axios.put(
                                            `${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderID}`,
                                            { status },
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            }
                                        );

                                        toast.success("Order status updated");
                                        refresh();
                                        closeModal();
                                    } catch (error) {
                                        console.error(error);
                                        toast.error("Failed to update order status");
                                    }
                                }}
                                disabled={status === selectedOrder.status}
                                className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white
                                shadow hover:opacity-90 transition
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Update
                            </button>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="text-right bg-white rounded-xl p-3 shadow-sm min-w-[160px]">
                        <p className="text-[11px] text-text/60 uppercase">
                            Total
                        </p>
                        <p className="text-xl font-bold text-text mt-1">
                            LKR {selectedOrder.total.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Date */}
                <p className="text-[11px] text-text/60 mt-5 text-right">
                    Ordered on{" "}
                    {new Date(selectedOrder.date).toLocaleString()}
                </p>
            </div>
        </div>
    );
}
