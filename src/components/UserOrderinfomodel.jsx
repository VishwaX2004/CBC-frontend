import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UserOrderDetailsModal({
    isModalOpen,
    closeModal,
    selectedOrder,
    refresh
}) {
    const [showConfirm, setShowConfirm] = useState(false);

    if (!isModalOpen || !selectedOrder) return null;

    const canCancel = selectedOrder.status === "Pending";

    const handleCancelOrder = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/orders/${selectedOrder.orderID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Order cancelled successfully");
            refresh();
            closeModal();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to cancel order");
        }
    };

    return (
        <>
            {/* MAIN MODAL */}
            <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-6">
                <div
                    className="
                        w-full max-w-3xl
                        max-h-full
                        bg-primary rounded-3xl shadow-2xl
                        p-6 relative
                        overflow-y-auto
                        [-ms-overflow-style:none]
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                    "
                >
                    {/* Close */}
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow
                        flex items-center justify-center hover:bg-accent hover:text-white transition"
                    >
                        ✕
                    </button>

                    {/* Header */}
                    <div className="border-b border-secondary/40 pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-text">Order Details</h2>
                        <p className="text-sm text-text/70 mt-1">
                            Order ID:{" "}
                            <span className="font-semibold">
                                {selectedOrder.orderID}
                            </span>
                        </p>
                    </div>

                    {/* Info */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {[
                            ["Customer", selectedOrder.customerName],
                            ["Email", selectedOrder.email],
                            ["Phone", selectedOrder.phone],
                            ["Address", selectedOrder.address],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="bg-white rounded-xl p-4 shadow-sm"
                            >
                                <p className="text-xs font-semibold text-text/60 uppercase mb-1">
                                    {label}
                                </p>
                                <p className="font-medium text-text break-words">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-text mb-3">
                            Ordered Items
                        </h3>

                        <div className="space-y-3">
                            {selectedOrder.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-14 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">
                                        <p className="font-semibold text-text">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-text/60">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-bold text-text">
                                        LKR {(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-secondary/40 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        {/* Status */}
                        <div>
                            <p className="text-xs font-semibold text-text/60 uppercase mb-2">
                                Order Status
                            </p>
                            <span
                                className={`inline-block rounded-full px-4 py-1 text-sm font-semibold
                                ${selectedOrder.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : selectedOrder.status === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {selectedOrder.status}
                            </span>
                        </div>

                        {/* Total */}
                        <div className="bg-white rounded-xl p-4 shadow-sm text-right min-w-[160px]">
                            <p className="text-xs text-text/60 uppercase">
                                Total
                            </p>
                            <p className="text-xl font-bold text-text">
                                LKR {selectedOrder.total.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    {/* Cancel Button */}
                    {canCancel && (
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-semibold
                                hover:bg-red-700 transition"
                            >
                                Cancel Order
                            </button>
                        </div>
                    )}

                    {/* Date */}
                    <p className="text-xs text-text/60 mt-6 text-right">
                        Ordered on{" "}
                        {new Date(selectedOrder.date).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* CONFIRMATION MODAL */}
            {showConfirm && (
                <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center px-4">
                    <div className="bg-primary rounded-2xl p-6 w-full max-w-md text-center shadow-2xl">

                        <h3 className="text-xl font-bold text-text mb-3">
                            Cancel Order?
                        </h3>

                        <p className="text-sm text-text/70 mb-6">
                            Are you sure you want to cancel order{" "}
                            <span className="font-semibold">
                                {selectedOrder.orderID}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-center gap-6">
                            <button
                                onClick={handleCancelOrder}
                                className="bg-red-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-red-700 transition"
                            >
                                Yes, Cancel
                            </button>

                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-300 px-5 py-2 rounded-xl font-semibold hover:bg-gray-400 transition"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
