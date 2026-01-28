// ================= Header.jsx =================
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import UserData from "./userData";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full bg-accent text-white px-4 md:px-10 h-[72px] md:h-[90px] shadow-md fixed top-0 left-0 z-[100]">
        <div className="w-full h-full flex items-center relative">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl absolute left-4 z-[120] hover:scale-110 transition"
            onClick={() => setMenuOpen(true)}
          >
            <IoMenu />
          </button>

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo"
            className="h-full object-contain w-[80px] md:w-[110px] absolute left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 z-[110]"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex w-full h-full items-center justify-center gap-12 text-lg font-semibold ml-20">
            {["/", "/products", "/about", "/contact" ,"/orders"].map((path, i) => {
              const name = ["Home", "Products", "About", "Contact","Orders"][i];
              return (
                <Link key={i} className="relative group" to={path}>
                  {name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* Desktop User Pill */}
          <div className="hidden md:flex z-[110]">
            <UserData />
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="absolute right-4 flex items-center justify-center text-3xl md:text-4xl hover:scale-110 transition z-[120]"
          >
            <IoCartOutline />
          </Link>
        </div>
      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`fixed inset-0 md:hidden z-[110] pointer-events-none`}>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-2/3 bg-white shadow-xl transform transition-transform duration-300 z-[130] pointer-events-auto
            ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between w-full px-5 h-[72px] border-b">
            <span className="font-bold text-lg text-accent">Menu</span>
            <button
              className="text-3xl hover:rotate-90 transition p-2 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              <IoClose />
            </button>
          </div>

          {/* Mobile User Pill */}
          <div className="w-full px-6 py-6 border-b flex justify-center relative z-[140]">
            <div className="w-full max-w-[220px] relative">
              <UserData
                mobile
                dropdownClassName="absolute right-0 top-full mt-2 w-56 md:static md:mt-0 z-[150]"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-6 w-full px-6 py-6 text-lg font-medium items-center pointer-events-auto z-[140]">
            {["/", "/products", "/about", "/contact"].map((path, i) => {
              const name = ["Home", "Products", "About", "Contact"][i];
              return (
                <Link
                  key={i}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-accent transition w-full text-center"
                >
                  {name}
                </Link>
              );
            })}

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 mt-6 text-accent font-semibold p-2 rounded-lg"
            >
              <IoCartOutline className="text-2xl" />
              Cart
            </Link>
          </nav>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-[120] pointer-events-auto"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
}
