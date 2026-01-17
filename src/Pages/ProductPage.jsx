import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";
import { FaSearch } from "react-icons/fa";

export function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch all products
    useEffect(() => {
        if (isLoading) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/products/`)
                .then((res) => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to Load Products");
                    setLoading(false);
                });
        }
    }, [isLoading]);

    // Debounce search
    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (searchQuery === "") {
                setLoading(true); // reload all products
            } else {
                try {
                    const searchResult = await axios.get(
                        `${import.meta.env.VITE_API_URL}/api/products/search?query=${encodeURIComponent(searchQuery)}`
                    );
                    setProducts(searchResult.data);
                } catch (err) {
                    toast.error("Failed to Load Products");
                }
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary px-4 py-6">

            {/* Search Bar */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center mb-6 gap-4">
                <div className="flex items-center w-full md:w-1/2">
                    <FaSearch className="mr-3 text-xl text-gray-600" />
                    <input
                        type="text"
                        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Loader */}
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full flex flex-wrap justify-center gap-6 bg-primary">
                    {products.map((item) => (
                        <ProductCard key={item._id} product={item} />
                    ))}
                </div>
            )}
        </div>
    );
}