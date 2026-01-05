import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { AddtoCart, LoadCart } from "../../Utils/cart";

export default function ProductOverView() {
    const params = useParams();
    const [status, setStatus] = useState("Loading");
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
            .then((res) => {
                setProduct(res.data);
                setStatus("success");
            })
            .catch(() => {
                toast.error("Failed to fetch Products");
                setStatus("error");
            });
    }, []);

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary text-text px-4 md:px-10 py-8 overflow-hidden">

            {status === "Loading" && <Loader />}

            {status === "success" && (
                <div className="max-w-[1200px] mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10 flex flex-col lg:flex-row gap-10 overflow-hidden">

                    {/* Image Section */}
                    <div className="lg:w-1/2 w-full flex justify-center items-start overflow-hidden items-center object-cover">
                        <div className="w-full max-w-[500px] rounded-2xl overflow-hidden shadow-lg items-center justify-center flex">
                            <ImageSlider images={product.images} />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 w-full flex flex-col gap-5 overflow-hidden">

                        {/* Product ID */}
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                            Product Code · {product.productID}
                        </span>

                        {/* Product Name */}
                        <h1 className="text-2xl md:text-3xl font-bold leading-tight text-text break-words">
                            {product.name}
                            {product.altNames.map((name, index) => (
                                <span
                                    key={index}
                                    className="block text-base font-normal text-gray-500 mt-1"
                                >
                                    {name}
                                </span>
                            ))}
                        </h1>

                        {/* Category */}
                        <div>
                            <span className="inline-block px-5 py-1 text-s tracking-wide rounded-full bg-secondary text-text font-bold">
                                {product.category}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-gray-600 text-justify break-words">
                            {product.description}
                        </p>

                        {/* Price */}
                        {product.labelledPrice > product.price ? (
                            <div className="flex items-center gap-4 mt-1 flex-wrap">
                                <p className="text-m text-accent line-through font-medium">
                                    LKR {product.labelledPrice.toFixed(2)}
                                </p>
                                <p className="text-2xl text-text font-extrabold">
                                    LKR {product.price.toFixed(2)}
                                </p>
                            </div>
                        ) : (
                            <p className="text-2xl text-accent font-extrabold mt-1">
                                LKR {product.price.toFixed(2)}
                            </p>
                        )}

                        {/* Divider */}
                        <div className="w-full h-px bg-gray-200 my-2"></div>

                        {/* Action Buttons */}
                        <div className="w-full flex gap-3 mt-3">
                            <button onClick={() => {
                                AddtoCart(product, 1)
                                toast.success("Added to Cart Successfully")
                            }} className="flex-1 h-[46px] rounded-2xl bg-accent text-white font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                                Add to Cart
                            </button>
                            <button onClick={()=>{
                                console.log(LoadCart())
                            }} className="flex-1 h-[46px] rounded-2xl border-2 border-accent text-accent font-semibold tracking-wide hover:bg-accent hover:text-white hover:scale-[1.02] transition-all">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {status === "error" && (
                <h1 className="text-center text-red-500 font-semibold mt-10">
                    Failed to load Products
                </h1>
            )}
        </div>
    );
}
