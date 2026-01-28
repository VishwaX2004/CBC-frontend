import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleUp } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(location.state || []);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const getTotal = () =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    async function purchaseCart() {
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (!address.trim() || !phone.trim()) {
            toast.error("Please fill all required fields");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place an order");
            navigate("/login");
            return;
        }

        try {
            const items = cart.map((item) => ({
                productID: item.productID,
                quantity: item.quantity,
            }));

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/orders`,
                {
                    address,
                    customerName: name || null,
                    phone,
                    items,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Order placed successfully 🎉");
            navigate("/orders");
        } catch (err) {
            console.error(err);
            toast.error(
                err?.response?.data?.message || "Failed to place order"
            );
        }
    }

    return (
        <div className="w-full min-h-screen bg-primary px-4 py-10 flex justify-center">
            <div className="w-full max-w-5xl flex flex-col gap-8">

                {/* CART */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-semibold text-text mb-4">
                        Your Cart
                    </h1>

                    {cart.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            Your cart is empty
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row gap-4 items-center border rounded-xl p-4 hover:shadow-md transition"
                                >
                                    {/* IMAGE */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-28 h-28 object-cover rounded-lg"
                                    />

                                    {/* INFO */}
                                    <div className="flex-1 w-full">
                                        <h2 className="font-semibold text-text text-lg">
                                            {item.name}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            {item.productID}
                                        </p>

                                        <div className="flex items-center gap-3 mt-3">
                                            <FaRegCircleUp
                                                className="text-2xl cursor-pointer hover:text-accent"
                                                onClick={() => {
                                                    const updated = [...cart];
                                                    updated[index].quantity += 1;
                                                    setCart(updated);
                                                }}
                                            />
                                            <span className="font-bold text-text">
                                                {item.quantity}
                                            </span>
                                            <FaRegCircleUp
                                                className="rotate-180 text-2xl cursor-pointer hover:text-accent"
                                                onClick={() => {
                                                    const updated = [...cart];
                                                    if (updated[index].quantity > 1) {
                                                        updated[index].quantity -= 1;
                                                        setCart(updated);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* PRICE */}
                                    <div className="text-right min-w-[140px]">
                                        {item.labelledPrice > item.price && (
                                            <p className="text-sm line-through text-gray-400">
                                                LKR {item.labelledPrice.toFixed(2)}
                                            </p>
                                        )}
                                        <p className="text-xl font-bold text-accent">
                                            LKR {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* REMOVE */}
                                    <button
                                        className="text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 transition"
                                        onClick={() => {
                                            setCart(cart.filter((_, i) => i !== index));
                                            toast.success("Item removed");
                                        }}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* CUSTOMER DETAILS */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                    <h2 className="text-xl font-semibold text-text mb-4">
                        Customer Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text">
                                Full Name
                            </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-12 rounded-xl border px-4 focus:ring-2 focus:ring-accent outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-text">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-12 rounded-xl border px-4 focus:ring-2 focus:ring-accent outline-none"
                                placeholder="07X XXXXXXX"
                            />
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-sm font-medium text-text">
                                Shipping Address *
                            </label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="min-h-[120px] rounded-xl border px-4 py-3 focus:ring-2 focus:ring-accent outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* TOTAL & ORDER */}
                <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xl font-bold text-text">
                        Total:
                        <span className="text-accent ml-2">
                            LKR {getTotal().toFixed(2)}
                        </span>
                    </p>

                    <button
                        onClick={purchaseCart}
                        className="w-full sm:w-auto px-10 py-4 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
