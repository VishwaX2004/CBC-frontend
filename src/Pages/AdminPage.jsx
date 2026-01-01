import { Link, Route, Routes } from "react-router-dom";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsBoxes } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import Adminproductpage from "./Admin/Adminproductpage";
import Adminaddnewproduct from "./Admin/Adminaddnewproduct";
import UpdateProductPage from "./Admin/adminUpdateProduct";

export default function AdminPage() {
  return (
    <div className="w-full h-full bg-primary flex p-4 gap-4">
      {/* Sidebar */}
      <aside className="w-[280px] bg-primary rounded-2xl shadow-lg border border-black/10 flex flex-col">
        {/* Header */}
        <div className="flex flex-row w-full h-[70px] bg-accent items-center border-white rounded-2xl">
          <img src="/logo.png" alt="" className="h-[70px] ml-4" />{" "}
          <span className="text-white text-xl font-bold ml-4 ">
            Admin Panel
          </span>{" "}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
          <SidebarLink
            to="/admin/"
            icon={<IoBarChartOutline />}
            label="Dashboard"
          />

          <SidebarLink
            to="/admin/oders"
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

        {/* Footer */}
        <div className="px-4 py-4 border-t border-black/10 text-xs text-gray-500 text-center">
          © 2026 Crystal Admin
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-primary rounded-2xl border-2 border-accent shadow-md overflow-hidden">
        <div className="w-full h-full overflow-y-auto p-6">
          <Routes path="/">
            <Route
              path="/"
              element={
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              }
            />

            <Route path="/products" element={<Adminproductpage />} />

            <Route
              path="/oders"
              element={
                <h1 className="text-2xl font-semibold">Manage Orders</h1>
              }
            />

            <Route path="/add-product" element={<Adminaddnewproduct />} />

            <Route path="/update-product" element={<UpdateProductPage/>}>
              Update Product
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

/* UI-Only Sidebar Link */
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
