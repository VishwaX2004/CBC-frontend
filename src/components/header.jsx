import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full bg-accent text-white px-4 md:px-10 h-[72px] md:h-[90px] shadow-md top-0 left-0 z-50 fixed">
        <div className="w-full h-full flex items-center relative">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl absolute left-4 z-50 hover:scale-110 transition"
            onClick={() => setMenuOpen(true)}
          >
            <IoMenu />
          </button>

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo"
            className="h-full object-contain w-[80px] md:w-[110px] absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 z-50"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex w-full h-full items-center justify-center gap-12 text-lg font-semibold">
            {["/", "/products", "/about", "/contact"].map((path, i) => {
              const name = ["Home", "Products", "About", "Contact"][i];
              return (
                <Link key={i} className="relative group" to={path}>
                  {name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* Desktop User Pill */}
          <div className="hidden md:flex z-50">
            <UserData />
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="absolute right-4 flex items-center justify-center text-3xl md:text-4xl hover:scale-110 transition z-50"
          >
            <IoCartOutline />
          </Link>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-800 z-50 transform
          ${menuOpen ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 shadow-xl`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 h-[72px] border-b">
          <span className="font-bold text-lg text-accent">Menu</span>
          <button
            className="text-3xl hover:rotate-90 transition z-50"
            onClick={() => setMenuOpen(false)}
          >
            <IoClose />
          </button>
        </div>

        {/* Mobile User Pill */}
        <div className="md:hidden px-6 py-6 border-b">
          <UserData mobile />
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col gap-6 px-6 py-6 text-lg font-medium">
          {["/", "/products", "/about", "/contact"].map((path, i) => {
            const name = ["Home", "Products", "About", "Contact"][i];
            return (
              <Link
                key={i}
                onClick={() => setMenuOpen(false)}
                to={path}
                className="hover:text-accent transition"
              >
                {name}
              </Link>
            );
          })}

          <Link
            onClick={() => setMenuOpen(false)}
            to="/cart"
            className="flex items-center gap-3 mt-6 text-accent font-semibold"
          >
            <IoCartOutline className="text-2xl" />
            Cart
          </Link>
        </nav>
      </div>

      {/* ================= OVERLAY ================= */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
