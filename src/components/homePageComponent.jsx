import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import { Loader } from "../components/loader";
import { Link } from "react-router-dom";

export function HomePageComponent() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products/")
        .then((res) => {
          setProducts(res.data.slice(0, 6)); // show top 6 products
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load products");
        });
    }
  }, [isLoading]);

  return (
    <main className="w-full bg-primary min-h-screen overflow-x-hidden lg:mt-20 mt-10">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-secondary/50 rounded-full blur-3xl animate-pulse z-0" />
        <div className="absolute top-40 -right-32 w-[420px] h-[420px] bg-accent/30 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
          {/* Hero Text */}
          <div className="space-y-4 sm:space-y-6 animate-[fadeInUp_1s_ease-out] text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/70 text-sm font-semibold">
              Luxury Cosmetics
            </span>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight">
              Glow With <br />
              <span className="text-accent">Confidence & Care</span>
            </h1>

            <p className="text-sm sm:text-base text-text/80 max-w-md mx-auto lg:mx-0">
              Discover premium beauty essentials crafted to enhance your natural
              glow — gentle, effective, and beautifully designed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <Link
                to="/shop"
                className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:scale-105 transition"
              >
                Shop Now
              </Link>

              <Link
                to="/about"
                className="px-6 py-3 rounded-full border border-accent text-accent font-semibold hover:bg-accent hover:text-white transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-[fadeIn_1.2s_ease-out] flex justify-center mt-10 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
              alt="Cosmetic Beauty"
              className="rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-full object-cover hover:scale-[1.02] transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section id="products" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6 text-center">
          Featured Products
        </h2>

        {isLoading ? (
          <div className="flex justify-center mt-10">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {products.map((item) => (
              <div key={item.productID ?? item.id}>
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= ABOUT / WHY CHOOSE US ================= */}
      <section className="bg-white/50 backdrop-blur-lg py-12 px-4 sm:px-6 md:px-12 text-center rounded-2xl mx-2 sm:mx-6 md:mx-16 my-8 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">Why Choose Us?</h2>
        <p className="text-sm sm:text-base text-text/80 max-w-xl mx-auto mb-6">
          We offer high-quality cosmetics that bring out your natural beauty.
          Our products are cruelty-free, dermatologist-tested, and made with
          premium ingredients.
        </p>
        <button className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition duration-300">
          Learn More
        </button>
      </section>
    </main>
  );
}
