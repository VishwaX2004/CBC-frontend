import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { AddtoCart } from "../../Utils/cart";

export default function ProductOverView() {
  const { id } = useParams(); // id = productID
  const [status, setStatus] = useState("Loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    setStatus("Loading");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/id/${id}`)
      .then((res) => {
        if (!res.data) throw new Error("No product found");
        setProduct(res.data);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch Product");
        setStatus("error");
      });
  }, [id]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary text-text px-3 sm:px-5 md:px-10 py-6 sm:py-8 mt-8">
      {status === "Loading" && <Loader />}

      {status === "success" && product && (
        <div className="max-w-[1300px] mx-auto bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[520px] rounded-2xl overflow-hidden shadow-lg">
              <ImageSlider images={product.images ?? []} />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 w-full flex flex-col gap-5">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
              Product Code · {product.productID}
            </span>

            <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold leading-tight break-words">
              {product.name}
              {(product.altNames ?? []).map((name, idx) => (
                <span key={idx} className="block text-base sm:text-base font-normal text-gray-500 mt-1">
                  {name}
                </span>
              ))}
            </h1>

            {product.category && (
              <span className="inline-block px-5 py-1.5 text-sm rounded-full bg-secondary text-text font-bold">
                {product.category}
              </span>
            )}

            <p className="text-sm sm:text-sm leading-relaxed text-gray-600 text-justify break-words">
              {product.description}
            </p>

            {/* Price */}
            {typeof product.price === "number" && (
              <>
                {product.labelledPrice > product.price ? (
                  <div className="flex items-center gap-4 mt-1 flex-wrap">
                    <p className="text-sm text-accent line-through font-medium">
                      LKR {product.labelledPrice.toFixed(2)}
                    </p>
                    <p className="text-2xl sm:text-2xl font-extrabold">
                      LKR {product.price.toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl sm:text-2xl text-accent font-extrabold mt-1">
                    LKR {product.price.toFixed(2)}
                  </p>
                )}
              </>
            )}

            <div className="w-full h-px bg-gray-200 my-3"></div>

            <div className="w-full flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => {
                  AddtoCart(product, 1);
                  toast.success("Added to Cart Successfully");
                }}
                className="flex-1 h-[52px] sm:h-[46px] rounded-2xl bg-accent text-white text-base sm:text-base font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Add to Cart
              </button>

              <Link
                to="/checkout"
                state={[
                  {
                    image: product.images?.[0] ?? "",
                    productID: product.productID ?? "",
                    name: product.name ?? "",
                    price: product.price ?? 0,
                    labelledPrice: product.labelledPrice ?? 0,
                    quantity: 1
                  }
                ]}
                className="flex-1 h-[52px] sm:h-[46px] rounded-2xl border-2 border-accent text-accent text-base sm:text-base font-semibold tracking-wide hover:bg-accent hover:text-white hover:scale-[1.02] transition-all flex items-center justify-center"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <h1 className="text-center text-red-500 font-semibold mt-10">
          Failed to load Product
        </h1>
      )}
    </div>
  );
}
