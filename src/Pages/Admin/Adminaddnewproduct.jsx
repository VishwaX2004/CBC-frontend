import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mediaupload from "../../Utils/mediaupload";
import toast from "react-hot-toast";
import axios from "axios";

export default function Adminaddnewproduct() {
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function addprodduct() {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        if (!name || !price || !category || !stock) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(true);

        try {
            const promises = [];
            for (let i = 0; i < images.length; i++) {
                promises[i] = Mediaupload(images[i]);
            }

            const urls = await Promise.all(promises);
            const AlternativeNames = altNames ? altNames.split(",") : [];

            const product = {
                productID: productID,
                name: name,
                altNames: AlternativeNames,
                description: description,
                images: urls,
                price: parseFloat(price),
                labelledPrice: parseFloat(labelledPrice),
                category: category,
                stock: parseInt(stock),
            };

            await axios.post(
                import.meta.env.VITE_API_URL + "/api/products",
                product,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            toast.success("Product Add Successful");
            navigate("/admin/products");
        } catch (error) {
            console.error("Full Error Object:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Server Rejected Request");
            } else {
                toast.error("An Error Occurred. Check Console.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-amber-500 via-amber-400 to-orange-400 flex justify-center items-start py-10 px-4 rounded-3xl">
            <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-10">

                <h2 className="text-3xl font-bold text-text text-center mb-8">
                    Add New Product
                </h2>

                <div className="space-y-5">

                    {/* Product ID */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Product ID
                        </label>
                        <input
                            value={productID}
                            onChange={(e) => setProductID(e.target.value)}
                            placeholder="PRD-001"
                            className="w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Product Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Crystal Glow Cream"
                            className="w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>

                    {/* Alternative Names */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Alternative Names
                        </label>
                        <input
                            value={altNames}
                            onChange={(e) => setAltNames(e.target.value)}
                            placeholder="Glow Cream, Beauty Cream"
                            className="w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-2.5 rounded-xl border bg-white resize-none text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-text mb-1">
                            Product Images
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setImages(Array.from(e.target.files))}
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary file:text-text hover:file:bg-accent hover:file:text-white transition"
                        />
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                        <input
                            type="number"
                            value={labelledPrice}
                            onChange={(e) => setLabelledPrice(e.target.value)}
                            placeholder="Labelled Price"
                            className="px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-accent outline-none"
                        />
                    </div>

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border bg-white text-sm focus:ring-2 focus:ring-accent outline-none"
                    >
                        <option value="">Select Category</option>
                        <option value="Cream">Cream</option>
                        <option value="Lotion">Lotion</option>
                        <option value="Soap">Soap</option>
                        <option value="Oil">Oil</option>
                        <option value="Skin-Care">Skin Care</option>
                        <option value="Hair-care">Hair Care</option>
                        <option value="Makeup">Makeup</option>
                    </select>

                    {/* Stock */}
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Stock Quantity"
                        className="w-full px-4 py-2.5 rounded-xl border text-sm focus:ring-2 focus:ring-accent outline-none"
                    />

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-6">
                        <button
                            onClick={addprodduct}
                            disabled={isLoading}
                            className={`px-10 py-3 rounded-xl font-semibold transition ${
                                isLoading
                                    ? "bg-secondary text-text cursor-not-allowed"
                                    : "bg-accent text-white hover:opacity-90"
                            }`}
                        >
                            {isLoading ? "Uploading..." : "Submit"}
                        </button>

                        <button
                            onClick={() => navigate("/admin/products")}
                            className="px-10 py-3 rounded-xl font-semibold border border-text text-text hover:bg-text hover:text-white transition"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
