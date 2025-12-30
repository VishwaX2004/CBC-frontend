import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import AdminPage from "./AdminPage";

export default function HomePage() {

    return (

        <div className="w-full h-full bg-primary">
            
            <Header/>

            <Routes path="/">
                <Route path="/" element={<h1 className="text-text">Welcome to Home Page</h1>} />
                <Route path="/products" element={<h1 className="text-text">Our Products</h1>} />
                <Route path="/about" element={<h1 className="text-text">About Us</h1>} />
                <Route path="/contact" element={<h1 className="text-text">Contact Us</h1>} />
                <Route path="/*" element={<h1 className="text-text">Page Not Found</h1>} />
            </Routes>


        </div>


    )


}