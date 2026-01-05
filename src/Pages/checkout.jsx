import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { FaRegCircleUp } from "react-icons/fa6";

export default function CheckoutPage() {

    const location = useLocation();
    const [cart, setCart] = useState(location.state);

    function GetTotal() {

        let total = 0

        cart.forEach(
            (item) => {
                total += item.price * item.quantity
            }
        )

        return total
    }



    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex justify-center py-10 px-4">

            <div className="w-full max-w-[800px] flex flex-col gap-6">

                {/* CART ITEMS */}
                {cart.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full h-[170px] bg-white rounded-2xl shadow-md hover:shadow-lg transition flex items-center relative overflow-hidden"
                        >

                            {/* Remove Button */}
                            <button
                                className="absolute top-5 right-5 text-red-500 rounded-full p-2 hover:bg-red-500 hover:text-white transition"
                                onClick={() => {

                                }}
                            >
                                <FaRegTrashAlt className="text-2xl" />
                            </button>

                            {/* Product Image */}
                            <img
                                className="h-full w-[170px] object-cover"
                                src={item.image}
                                alt=""
                            />

                            {/* Product Info */}
                            <div className="flex-1 px-6 flex flex-col justify-center gap-1 text-text">
                                <h1 className="text-xl font-semibold leading-snug">
                                    {item.name}
                                </h1>
                                <span className="text-sm text-gray-500 tracking-wide">
                                    {item.productID}
                                </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="w-[110px] h-full flex flex-col justify-center items-center gap-2 bg-secondary/20">
                                <FaRegCircleUp
                                    className="text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        const newcart = [...cart]

                                        newcart[index].quantity += 1

                                        setCart(newcart)
                                    }}
                                />
                                <span className="text-xl font-bold text-text">
                                    {item.quantity}
                                </span>
                                <FaRegCircleUp
                                    className="rotate-180 text-4xl cursor-pointer hover:text-accent transition"
                                    onClick={() => {
                                        const newcart = [...cart]

                                        if(newcart[index].quantity>1){
                                            newcart[index].quantity -= 1
                                        }

                                        setCart(newcart)
                                    }}
                                />
                            </div>

                            {/* Price */}
                            <div className="w-[200px] h-full flex flex-col justify-center items-end pr-6 pt-[20px]">
                                {item.labelledPrice > item.price && (
                                    <span className="text-lg text-text line-through font-medium">
                                        LKR {item.labelledPrice.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-2xl font-bold text-accent">
                                    LKR {item.price.toFixed(2)}
                                </span>
                            </div>

                        </div>
                    );
                })}

                {/* TOTAL & CHECKOUT */}
                <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <span className="text-2xl font-bold text-text">
                        Total :
                        <span className="text-accent ml-2">
                            LKR {GetTotal().toFixed(2)}
                        </span>
                    </span>

                    <Link
                        to="/checkout"
                        className="px-10 py-4 rounded-xl bg-accent text-white text-lg font-semibold tracking-wide hover:opacity-90 hover:scale-[1.03] transition"
                    >
                        Order Now
                    </Link>
                </div>

            </div>
        </div>
    );
}
