import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Adminproductpage from "./Admin/Adminproductpage";
import Adminaddnewproduct from "./Admin/Adminaddnewproduct";
import UpdateProductPage from "./Admin/adminUpdateProduct";
import AdminOrdersPage from "./Admin/AdminOrders";
import { Loader } from "../components/loader";

export default function AdminPage() {
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to access admin panel");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.data.role !== "admin") {
          toast.error("You do not have access to admin panel");
          navigate("/login");
          return;
        }
        setUserLoaded(true);
      })
      .catch(() => {
        toast.error("Please login to access admin panel");
        navigate("/login");
      });
  }, [navigate]);

  if (!userLoaded) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full bg-primary flex p-4 gap-4">
      {/* Sidebar */}
      <aside className="w-[280px] bg-primary rounded-2xl shadow-lg border border-black/10 flex flex-col">
        <div className="flex items-center h-[70px] bg-accent rounded-2xl">
          <img src="/logo.png" alt="logo" className="h-[60px] ml-4" />
          <span className="text-white text-xl font-bold ml-4">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
          <SidebarLink to="/admin" icon={<IoBarChartOutline />} label="Dashboard" />
          <SidebarLink
            to="/admin/orders"
            icon={<MdOutlineShoppingCartCheckout />}
            label="Orders"
          />
          <SidebarLink
            to="/admin/products"
            icon={<BsBoxes />}
            label="Products"
          />
          <SidebarLink to="/admin/users" icon={<FiUsers />} label="Users" />
        </nav>

        <div className="px-4 py-4 border-t text-xs text-gray-500 text-center">
          © 2026 Crystal Admin
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-primary rounded-2xl border-2 border-accent shadow-md overflow-hidden">
        <div className="w-full h-full overflow-y-auto p-6">
          <Routes>
            <Route
              path="/"
              element={<h1 className="text-2xl font-semibold">Admin Dashboard</h1>}
            />
            <Route path="/products" element={<Adminproductpage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/add-product" element={<Adminaddnewproduct />} />
            <Route path="/update-product" element={<UpdateProductPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

/* Sidebar Link */
function SidebarLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-text
                 hover:bg-accent/15 hover:text-accent transition"
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
