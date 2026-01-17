import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { ProductPage } from "./ProductPage";
import ProductOverView from "./Admin/productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import { HomePageComponent } from "../components/homePageComponent";
import Footer from "../components/footer";
import UserSettingPage from "./userSetting";

export default function HomePage() {

    return (

        <div className="w-full h-full bg-primary">
            
            <Header/>

            <Routes path="/">
                <Route path="/" element={<HomePageComponent/>} />
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/about" element={<h1 className="text-text">About Us</h1>} />
                <Route path="/contact" element={<h1 className="text-text">Contact Us</h1>} />
                <Route path="/*" element={<h1 className="text-text">Page Not Founds</h1>} />
                <Route path="/overview/:id" element={<ProductOverView />} />
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/settings" element={<UserSettingPage/>}/>
                
            </Routes>

            <Footer/>

        </div>


    )


}