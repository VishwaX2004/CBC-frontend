import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="w-full bg-accent text-white px-2 sm:px-4 md:px-10 h-[70px] sm:h-[80px] md:h-[100px]">
                <div className="w-full h-full flex items-center relative">

                    {/* Mobile Menu Icon */}
                    <button
                        className="md:hidden text-3xl absolute left-2"
                        onClick={() => setMenuOpen(true)}
                    >
                        <IoMenu />
                    </button>

                    {/* Logo */}
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="
                            h-full object-contain
                            w-[70px] sm:w-[85px] md:w-[110px]
                            absolute
                            left-1/2 -translate-x-1/2
                            md:left-0 md:translate-x-0
                        "
                    />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex w-full h-full items-center justify-center gap-10 text-lg font-bold">
                        <Link className="hover:opacity-80 transition" to="/">Home</Link>
                        <Link className="hover:opacity-80 transition" to="/products">Products</Link>
                        <Link className="hover:opacity-80 transition" to="/about">About</Link>
                        <Link className="hover:opacity-80 transition" to="/contact">Contact</Link>
                    </div>

                    {/* Cart Icon */}
                    <Link
                        to="/cart"
                        className="h-full absolute right-2 flex items-center justify-center text-3xl md:text-4xl hover:scale-110 transition"
                    >
                        <IoCartOutline />
                    </Link>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-[260px] bg-primary text-accent z-[200] transform ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300`}
            >
                <div className="flex items-center justify-between px-4 h-[70px] border-b border-white/20">
                    <span className="font-bold text-lg text-accent">Menu</span>
                    <button
                        className="text-3xl"
                        onClick={() => setMenuOpen(false)}
                    >
                        <IoClose />
                    </button>
                </div>

                <nav className="flex flex-col gap-6 px-6 py-8 text-lg font-semibold lg:text-white text-text">
                    <Link onClick={() => setMenuOpen(false)} to="/" className="hover:text-accent lg:hover:text-white">Home</Link>
                    <Link onClick={() => setMenuOpen(false)} to="/products"  className="hover:text-accent lg:hover:text-white">Products</Link>
                    <Link onClick={() => setMenuOpen(false)} to="/about"  className="hover:text-accent lg:hover:text-white">About</Link>
                    <Link onClick={() => setMenuOpen(false)} to="/contact"  className="hover:text-accent lg:hover:text-white">Contact</Link>
                    <Link
                        onClick={() => setMenuOpen(false)}
                        to="/cart"
                        className="flex items-center gap-2 mt-4"
                    >
                        <div className=" hover:text-accent lg:hover:text-white flex flex-row gap-3" > 
                            <IoCartOutline className="text-2xl "/> 
                            <p>Cart</p>
                            </div>
                       
                    </Link>
                </nav>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[150]"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </>
    );
}
