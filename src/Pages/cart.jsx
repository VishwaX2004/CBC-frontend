import { FaRegCircleUp } from "react-icons/fa6";
import { AddtoCart, GetTotal, LoadCart } from "../Utils/cart";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function CartPage() {
    const [cart, setCart] = useState(LoadCart());

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
                                className="absolute top-3 right-3 sm:top-5 sm:right-5 text-red-500 rounded-full p-3 hover:bg-red-500 hover:text-white transition"
                                onClick={() => {
                                    AddtoCart(item, -item.quantity);
                                    setCart(LoadCart());
                                    toast.success("Item removed from cart");
                                }}
                            >
                                <FaRegTrashAlt className="text-2xl sm:text-2xl"  />
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
                            <div className="w-full sm:w-[110px] h-[70px] sm:h-full flex sm:flex-col justify-center items-center gap-6 lg:gap-3 bg-secondary/20">
                                <FaRegCircleUp
                                    className="text-4xl sm:text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        AddtoCart(item, 1);
                                        setCart(LoadCart());
                                    }}
                                />
                                <span className="text-xl sm:text-xl font-bold text-text">
                                    {item.quantity}
                                </span>
                                <FaRegCircleUp
                                    className="rotate-180 text-4xl sm:text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        AddtoCart(item, -1);
                                        setCart(LoadCart());
                                    }}
                                />
                            </div>

                            {/* Price */}
                            <div className="w-full sm:w-[200px] h-auto sm:h-full flex lg:flex-col mb-5 lg:mb-0 mt-2 lg:mt-0 flex-row lg:gap-0 gap-3 pe-3 justify-center items-end px-4 sm:pr-6 py-3 sm:pt-[20px] ">
                                {item.labelledPrice > item.price && (
                                    <span className="flex text-base sm:text-lg text-text line-through font-medium justify-center lg:mt-10 flex ">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="flex text-xl sm:text-2xl font-bold text-accent lg:mt-0 ">
                                    LKR {item.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* TOTAL & CHECKOUT */}
                <div className="w-full bg-white rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <span className="text-xl sm:text-2xl font-bold text-text">
                        Total :
                        <span className="text-accent ml-2">
                            LKR {GetTotal().toFixed(2)}
                        </span>
                    </span>

                    <Link
                        to="/checkout"
                        state={cart}
                        className="w-full md:w-auto px-8 sm:px-10 py-4 rounded-xl bg-accent text-white text-base sm:text-lg font-semibold tracking-wide hover:opacity-90 hover:scale-[1.03] transition text-center"
                    >
                        Proceed to Checkout
                    </Link>
                </div>

            </div>
        </div>
    );
}
