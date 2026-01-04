import { Link } from "react-router-dom";

export default function Header(){
    return(

        <header className="w-full bg-accent h-[100px] text-white px-[20px]">

            <div className="w-full h-full flex relative">
                 <img src="/logo.png" alt="" className="h-full w-[110px]  object-cover absolute left-0"/>

                <div className="w-full h-full flex items-center justify-center gap-[40px] text-lg font-bold">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

            </div>
           

        </header>


    )
}