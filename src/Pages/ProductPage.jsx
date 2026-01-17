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
    <div className="w-full min-h-[calc(100vh-100px)] bg-gray-50 px-4 sm:px-6 md:px-8 pt-[100px] pb-5">
      {/* ================= SEARCH BAR ================= */}
      <div className="w-full flex justify-center mb-6 ">
        <div className="relative w-full max-w-md flex justify-center">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
          <input
            type="text"
            className="w-full lg:w-full sm:w-[400px] max-w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ================= LOADER / EMPTY / PRODUCT GRID ================= */}
      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No products found.
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          <div className="w-full flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {products.map((item) => (
              <div
                key={item._id}
                className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] flex justify-center"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
