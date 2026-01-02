import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";

export function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_API_URL + "/api/products/")
                .then((res) => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to Load Products");
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-[calc(100vh-70px)] bg-primary">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full flex flex-row flex-wrap justify-center items-center bg-primary">
                    {products.map((item) => (
                        <ProductCard
                            key={item.productID}
                            product={item}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
