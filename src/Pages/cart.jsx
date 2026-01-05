import { FaRegCircleUp } from "react-icons/fa6"
import { AddtoCart, GetTotal, LoadCart } from "../Utils/cart"
import { FaRegTrashAlt } from "react-icons/fa"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function CartPage() {

    const [cart,setCart] = useState(LoadCart())

    return (

        <div className="w-full h-[calc(100vh-100px)] flex flex-col pt-[25px] items-center">

            <div className="w-[600px] flex flex-col gap-4">

                {
                    cart.map(
                        (item,index)=>{

                            return(
                                
                                <div key={index} className="w-full h-[150px] bg-amber-50 flex relative items-center">

                                    <button className=" absolute text-red-500 right-[-50px] items-center text-2xl rounded-full aspect-square hover:bg-red-600 hover:text-white"><FaRegTrashAlt onClick={
                                                ()=>{
                                                    AddtoCart(item,-item.quantity)
                                                   setCart(LoadCart())
                                                }
                                            } /></button>

                                    <img className="h-full object-cover aspect-square" src={item.image} alt="" />

                                    <div className="w-[250px] h-full text-text flex flex-col">
                                            <h1>{item.name}</h1>
                                            <span>{item.productID}</span>
                                    </div>

                                    <div className="w-[100px] h-full flex-col flex justify-center items-center ">

                                            <FaRegCircleUp  className="text-3xl" onClick={
                                                ()=>{
                                                    AddtoCart(item,1)
                                                    setCart(LoadCart())
                                                }
                                            }/>

                                            <span className="font-semibold">{item.quantity}</span>

                                             <FaRegCircleUp className=" rotate-180 text-3xl" onClick={
                                                ()=>{
                                                    AddtoCart(item,-1)
                                                    setCart(LoadCart())
                                                }
                                            } />

                                    </div>

                                    <div className="w-[180px] h-full flex flex-col">

                                        {
                                            item.labelledPrice > item.price &&
                                            <span className="text-accent text w-full text-lg text-right pr-[10px] line-through">LKR {item.labelledPrice}</span>
                                        }

                                            <span>{item.price}</span>

                                    </div>


                                </div>

                            )

                        }
                    )
                }

                <div className="w-full h-[150px] bg-amber-50 flex justify-center items-center relative">

                    <Link to="/checkout" className="absolute left-0 bg-accent text-2xl pr-[10px]">Proceed to checkout</Link>

                    <div className="flex h-[100px]">

                       <span className="text-right text-accent">Total : LKR {GetTotal().toFixed(2)}</span>

                    </div>


                </div>


            </div>

        </div>

    )

}