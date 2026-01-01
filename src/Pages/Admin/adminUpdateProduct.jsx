import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Mediaupload from "../../Utils/mediaupload";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
    const location = useLocation()
    const [productID, setProductID] = useState(location.state.productID);
    const [name, setName] = useState(location.state.name);
    const [altNames, setAltNames] = useState(location.state.altNames.join(","));
    const [description, setDescription] = useState(location.state.description);
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(location.state.price);
    const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
    const [category, setCategory] = useState(location.state.category);
    const [stock, setStock] = useState(location.state.stock);
    
    // 1. Add loading state to handle upload time
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    async function updateprodduct() {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // 2. Basic Validation: prevent submitting empty required fields
        if(!name || !price || !category || !stock) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(true); // Disable button

        try {
            // Upload images first
            const promises = [];
            for (let i = 0; i < images.length; i++) {
                promises[i] = Mediaupload(images[i]);
            }
            
            // Wait for all images to upload
            let urls = await Promise.all(promises);

            if(urls.length == 0){
                urls = location.state.image
            }

            // Handle Alternative Names (prevent empty string in array)
            const AlternativeNames = altNames ? altNames.split(",") : [];

            // 3. CONVERT STRINGS TO NUMBERS
            const product = {
                productID: productID,
                name: name,
                altNames: AlternativeNames,
                description: description,
                images: urls,
                price: parseFloat(price),         // Fix: Convert to Float
                labelledPrice: parseFloat(labelledPrice), // Fix: Convert to Float
                category: category,
                stock: parseInt(stock),           // Fix: Convert to Integer
            };

            await axios.put(
                import.meta.env.VITE_API_URL + "/api/products/"+productID,
                product,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            toast.success("Product Updated Successful");
            navigate("/admin/products");

        } catch (error) {
            // 4. Detailed Error Logging
            console.error("Full Error Object:", error);
            
            // Check if it's a backend validation error
            if (error.response && error.response.data) {
                console.log("Server Error Response:", error.response.data);
                toast.error(error.response.data.message || "Server Rejected Request");
            } else {
                toast.error("An Error Occurred. Check Console.");
            }
        } finally {
            setIsLoading(false); // Re-enable button
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-amber-500 via-amber-400 to-orange-400 flex justify-center items-start py-10 px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-4">

                <h2 className="text-2xl font-bold text-gray-900 text-center mb-6 tracking-tight">
                    Update Product
                </h2>

                <div className="space-y-4">

                    <div>
                        <label className="block mb-1 text-gray-700 font-medium text-sm">
                            Product ID
                        </label>
                        <input
                            disabled
                            value={productID}
                            onChange={(e) => setProductID(e.target.value)}
                            placeholder="Enter Product ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-medium text-sm">
                            Product Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Product Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-medium text-sm">
                            Alternative Names
                        </label>
                        <input
                            value={altNames}
                            onChange={(e) => setAltNames(e.target.value)}
                            placeholder="Comma separated names"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-medium text-sm">
                            Product Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 resize-none text-sm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-medium text-sm">
                            Product Images
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setImages(Array.from(e.target.files))}
                            className="w-full text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="px-4 py-2 border rounded-xl text-sm"
                        />
                        <input
                            type="number"
                            value={labelledPrice}
                            onChange={(e) => setLabelledPrice(e.target.value)}
                            placeholder="Labelled Price"
                            className="px-4 py-2 border rounded-xl text-sm"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl text-sm"
                    >
                        <option value="">Select Category</option>
                        <option value="Cream">Cream</option>
                        <option value="Lotion">Lotion</option>
                        <option value="Soap">Soap</option>
                        <option value="Oil">Oil</option>
                    </select>

                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Stock Quantity"
                        className="w-full px-4 py-2 border rounded-xl text-sm"
                    />

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            onClick={updateprodduct}
                            disabled={isLoading} // Disable button while loading
                            className={`px-8 py-3 transition text-white rounded-xl font-medium ${isLoading ? 'bg-amber-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'}`}
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                        <button
                            onClick={() => navigate("/admin/products")}
                            className="px-8 py-3 bg-red-500 hover:bg-red-600 transition text-white rounded-xl font-medium"
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}