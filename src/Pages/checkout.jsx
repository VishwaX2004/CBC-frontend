import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUp } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
    const location = useLocation();
    const [cart, setCart] = useState(location.state || []);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();

    function GetTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    async function PurchaseCart() {
        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("Please Login to Purchase Order");
            navigate("/login");
            return;
        }

        try {
            const items = cart.map((item) => ({
                productID: item.productID,
                quantity: item.quantity
            }));

            await axios.post(
                import.meta.env.VITE_API_URL + "/api/orders",
                {
                    address: address,
                    customerName: name === "" ? null : name,
                    items
                },
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            toast.success("Orders Placed Successfully");
        } catch (err) {
            toast.error("Failed to Place Product");
            console.error(err);

            if (err.response && err.response.status === 400) {
                toast.error(err.response.data.message);
            }
        }
    }

    return (
        <div className="w-full min-h-[calc(100vh-100px)] lg:mt-6 mt-10 bg-primary flex justify-center sm:py-10 px-2 sm:px-4">

            <div className="lg:w-full max-w-[900px] min-w-[390px] mt-15 flex flex-col gap-4 sm:gap-6">

                {/* CART ITEMS */}
                {cart.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition flex flex-col sm:flex-row items-center relative overflow-hidden mt-3 sm:mt-5"
                        >

                            {/* Remove Button */}
                            <button
                                className="absolute top-1.5 right-1.5 sm:top-5 sm:right-5 text-red-500 rounded-full p-1.5 sm:p-3 hover:bg-red-500 hover:text-white transition"
                                onClick={() => {
                                    const newcart = [...cart];
                                    newcart[index].quantity -= item.quantity;
                                    setCart(newcart.filter(i => i.quantity > 0));
                                    toast.success("Item removed from cart");
                                }}
                            >
                                <FaRegTrashAlt className="text-base sm:text-2xl" />
                            </button>

                            {/* Product Image */}
                            <img
                                className="h-[110px] sm:h-[170px] w-full sm:w-[170px] object-cover"
                                src={item.image}
                                alt=""
                            />

                            {/* Product Info */}
                            <div className="flex-1 px-2 sm:px-6 py-2 sm:py-0 flex flex-col justify-center gap-0.5 text-text">
                                <h1 className="text-sm sm:text-xl font-semibold leading-snug">
                                    {item.name}
                                </h1>
                                <span className="text-[11px] sm:text-sm text-gray-500 tracking-wide">
                                    {item.productID}
                                </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="w-full sm:w-[110px] h-[56px] sm:h-full flex sm:flex-col justify-center items-center gap-3 sm:gap-3 bg-secondary/20">
                                <FaRegCircleUp
                                    className="text-2xl sm:text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        const newcart = [...cart];
                                        newcart[index].quantity += 1;
                                        setCart(newcart);
                                    }}
                                />
                                <span className="text-base sm:text-xl font-bold text-text">
                                    {item.quantity}
                                </span>
                                <FaRegCircleUp
                                    className="rotate-180 text-2xl sm:text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        const newcart = [...cart];
                                        if (newcart[index].quantity > 1) {
                                            newcart[index].quantity -= 1;
                                        }
                                        setCart(newcart);
                                    }}
                                />
                            </div>

                            {/* Price */}
                            <div className="w-full sm:w-[200px] flex lg:flex-col mb-3 sm:mb-0 mt-1 sm:mt-0 gap-1.5 sm:gap-3 pe-2 sm:pe-6 justify-center items-end px-2 sm:px-4 py-2 sm:pt-[20px]">
                                {item.labelledPrice > item.price && (
                                    <span className="text-xs sm:text-lg text-text line-through font-medium">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-base sm:text-2xl font-bold text-accent">
                                    LKR {item.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* CUSTOMER DETAILS */}
                <div className="w-full bg-white rounded-xl lg:mt-1 mt-3 sm:rounded-2xl shadow-lg p-4 sm:p-8 flex flex-col gap-5 sm:gap-6">

                    <h2 className="text-lg sm:text-2xl font-semibold text-text border-b pb-2 sm:pb-3">
                        Customer Details
                    </h2>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-[44px] sm:h-[50px] rounded-xl border border-text/30 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text">
                            Shipping Address
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full min-h-[90px] sm:min-h-[120px] rounded-xl border border-text/30 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>

                {/* TOTAL & ORDER */}
                <div className="w-full mt-2 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 lg:mb-5 mb-10">

                    <span className="text-base sm:text-2xl font-bold text-text">
                        Total :
                        <span className="text-accent ml-2">
                            LKR {GetTotal().toFixed(2)}
                        </span>
                    </span>

                    <button
                        onClick={PurchaseCart}
                        className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-accent text-white font-semibold hover:scale-105 transition"
                    >
                        Order Now
                    </button>
                </div>

            </div>
        </div>
    );
}
