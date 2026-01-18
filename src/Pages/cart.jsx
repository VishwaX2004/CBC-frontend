import { FaRegCircleUp } from "react-icons/fa6";
import { AddtoCart, GetTotal, LoadCart } from "../Utils/cart";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function CartPage() {
    const [cart, setCart] = useState(LoadCart());

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex justify-center py-6 sm:py-10 px-2 sm:px-4 lg:mt-20 mt-15">

            <div className="lg:w-full min-w-[360px] max-w-[800px] flex flex-col gap-4 sm:gap-6">

                {/* CART ITEMS */}
                {cart.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full bg-white rounded-xl sm:rounded-2xl lg:mt-3 mt-5 sm:mt-5 shadow-md hover:shadow-lg transition flex flex-col sm:flex-row items-center relative overflow-hidden"
                        >

                            {/* Remove Button */}
                            <button
                                className="absolute top-2 right-2 sm:top-5 sm:right-5 text-red-500 rounded-full p-2 sm:p-3 hover:bg-red-500 hover:text-white transition"
                                onClick={() => {
                                    AddtoCart(item, -item.quantity);
                                    setCart(LoadCart());
                                    toast.success("Item removed from cart");
                                }}
                            >
                                <FaRegTrashAlt className="text-lg sm:text-2xl" />
                            </button>

                            {/* Product Image */}
                            <img
                                className="h-[120px] sm:h-[170px] w-full sm:w-[140px] object-cover"
                                src={item.image}
                                alt=""
                            />

                            {/* Product Info */}
                            <div className="flex-1 px-3 sm:px-6 py-2 sm:py-0 flex flex-col justify-center gap-0.5 sm:gap-1 text-text">
                                <h1 className="text-base sm:text-xl font-semibold leading-snug">
                                    {item.name}
                                </h1>
                                <span className="text-xs sm:text-sm text-gray-500 tracking-wide">
                                    {item.productID}
                                </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="w-full sm:w-[110px] h-[60px] sm:h-full flex sm:flex-col justify-center items-center gap-4 sm:gap-3 bg-secondary/20">
                                <FaRegCircleUp
                                    className="text-3xl sm:text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        AddtoCart(item, 1);
                                        setCart(LoadCart());
                                    }}
                                />
                                <span className="text-lg sm:text-xl font-bold text-text">
                                    {item.quantity}
                                </span>
                                <FaRegCircleUp
                                    className="rotate-180 text-3xl sm:text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        AddtoCart(item, -1);
                                        setCart(LoadCart());
                                    }}
                                />
                            </div>

                            {/* Price */}
                            <div className="w-full sm:w-[200px] flex lg:flex-col mb-4 sm:mb-0 mt-1 sm:mt-0 gap-2 sm:gap-3 pe-2 sm:pe-6 justify-center items-end px-3 sm:px-4 py-2 sm:pt-[20px]">
                                {item.labelledPrice > item.price && (
                                    <span className="text-sm sm:text-lg text-text line-through font-medium">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-lg sm:text-2xl font-bold text-accent">
                                    LKR {item.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* TOTAL & CHECKOUT */}
                <div className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">

                    <span className="text-lg sm:text-2xl font-bold text-text">
                        Total :
                        <span className="text-accent ml-2">
                            LKR {GetTotal().toFixed(2)}
                        </span>
                    </span>

                    <Link
                        to="/checkout"
                        state={cart}
                        className="w-full md:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-accent text-white text-sm sm:text-lg font-semibold tracking-wide hover:opacity-90 hover:scale-[1.03] transition text-center"
                    >
                        Proceed to Checkout
                    </Link>
                </div>

            </div>
        </div>
    );
}
