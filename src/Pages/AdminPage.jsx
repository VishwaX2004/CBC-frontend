import { Route, Routes } from "react-router-dom";

export default function AdminPage() {

    return (

        <div className="w-full h-full bg-primary flex p-2">

            <div className="w-[300px] h-full bg-primary"></div>

            <div className="w-[calc(100%-300px)] h-full bg-primary rounded-[20px] border-[2px] border-accent">
                <Routes path="/">

                    <Route path="/" element={<h1>Admin Dashboard</h1>} />

                    <Route path="/products" element={<h1>Manage Products</h1>} />

                    <Route path="/oders" element={<h1>Manage Orders</h1>} />

                </Routes>
            </div>

        </div>

    )
}