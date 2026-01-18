import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { ProductPage } from "./ProductPage";
import ProductOverView from "./Admin/productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import { HomePageComponent } from "../components/homePageComponent";
import Footer from "../components/footer";
import UserSettingPage from "./userSetting";
import { AboutUsPage } from "./aboutus";
import { ContactUS } from "./contactus";
import { PageNotFound } from "./pagenotfound";

export default function HomePage() {

    return (

        <div className="w-full h-full bg-primary">
            
            <Header/>

            <Routes path="/">
                <Route path="/" element={<HomePageComponent/>} />
                <Route path="/products" element={<ProductPage/>}/>
                <Route path="/about" element={<AboutUsPage/>} />
                <Route path="/contact" element={<ContactUS/>} />
                <Route path="/*" element={<PageNotFound/>} />
                <Route path="/overview/:id" element={<ProductOverView/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
                <Route path="/settings" element={<UserSettingPage/>}/>
                
            </Routes>

            <Footer/>

        </div>


    )


}