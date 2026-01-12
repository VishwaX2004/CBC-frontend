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
            const items = [];

            for (let i = 0; i < cart.length; i++) {
                items.push({
                    productID: cart[i].productID,
                    quantity: cart[i].quantity
                });
            }

            await axios.post(
                import.meta.env.VITE_API_URL + "/api/orders",
                {
                    address: address,
                    customerName : name == "" ? null : name,
                    items: items
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

            if (err.response && err.response.status == 400) {
                toast.error(err.response.data.message);
            }
        }
    }

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex justify-center py-6 sm:py-10 px-3 sm:px-4">

            <div className="w-full max-w-[900px] flex flex-col gap-6">

                {/* CART ITEMS */}
                {cart.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition flex flex-col sm:flex-row items-center relative overflow-hidden"
                        >

                            {/* Remove Button */}
                            <button
                                className="absolute top-3 right-3 sm:top-5 sm:right-5 text-red-500 rounded-full p-3 hover:bg-red-500 hover:text-white transition lg:mb-3"
                                onClick={() => {
                                    const newcart = [...cart];
                                    newcart[index].quantity -= item.quantity;
                                    const updatedCart = newcart.filter(
                                        (cartItem) => cartItem.quantity > 0
                                    );
                                    setCart(updatedCart);
                                    toast.success("Item removed from cart");
                                }}
                            >
                                <FaRegTrashAlt className="text-2xl lg:mb-3" />
                            </button>

                            {/* Product Image */}
                            <img
                                className="h-[140px] sm:h-[170px] w-full sm:w-[170px] object-cover"
                                src={item.image}
                                alt=""
                            />

                            {/* Product Info */}
                            <div className="flex-1 px-4 sm:px-6 py-3 sm:py-0 flex flex-col justify-center gap-1 text-text">
                                <h1 className="text-lg sm:text-xl font-semibold leading-snug">
                                    {item.name}
                                </h1>
                                <span className="text-sm text-gray-500 tracking-wide">
                                    {item.productID}
                                </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="w-full sm:w-[110px] h-[70px] sm:h-full flex sm:flex-col justify-center items-center gap-6 sm:gap-3 bg-secondary/20">
                                <FaRegCircleUp
                                    className="text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        const newcart = [...cart];
                                        newcart[index].quantity += 1;
                                        setCart(newcart);
                                    }}
                                />
                                <span className="text-xl font-bold text-text">
                                    {item.quantity}
                                </span>
                                <FaRegCircleUp
                                    className="rotate-180 text-4xl cursor-pointer hover:text-accent transition"
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
                            <div className="w-full sm:w-[200px] h-auto sm:h-full flex lg:flex-col mb-5 lg:mb-0 mt-2 lg:mt-0 flex-row lg:gap-2 gap-3 pe-3 justify-center items-end px-4 sm:pr-6 py-3 sm:pt-[20px]">
                                {item.labelledPrice > item.price && (
                                    <span className="text-base sm:text-lg text-text line-through font-medium">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-xl sm:text-2xl font-bold text-accent">
                                    LKR {item.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* CUSTOMER DETAILS */}
                <div className="w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-6">

                    <h2 className="text-xl sm:text-2xl font-semibold text-text border-b pb-3">
                        Customer Details
                    </h2>

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full h-[50px] rounded-xl border border-text/30 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-text">
                            Shipping Address
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="House No, Street, City"
                            className="w-full min-h-[120px] rounded-xl border border-text/30 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>

                </div>



                {/* TOTAL & ORDER */}
                <div className="w-full bg-white rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <span className="text-xl sm:text-2xl font-bold text-text">
                        Total :
                        <span className="text-accent ml-2">
                            LKR {GetTotal().toFixed(2)}
                        </span>
                    </span>

                    <button
                        onClick={PurchaseCart}
                        className="w-full md:w-auto px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition"
                    >
                        Order Now
                    </button>

                </div>

            </div>
        </div>
    );
}
