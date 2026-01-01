import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function Adminproductpage() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((res) => {
                setProducts(res.data);
            });
    }, []);

    return (
        <div className="w-full min-h-screen bg-primary p-6 text-text">

            <Link to="/admin/add-product" className="fixed bottom-[50px] right-[50px] text-5xl text-accent hover:scale-110 transition">
                <FiPlusCircle className="hover:text-accent " />
            </Link>

            <div className="overflow-x-auto rounded-xl shadow-md bg-white">
                <table className="w-full border-collapse">
                    <thead className="bg-secondary/30 text-text">
                        <tr className="text-sm uppercase tracking-wide">
                            <th className="p-4">Image</th>
                            <th className="p-4">Product ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Labelled Price</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">stock</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((item) => (
                            <tr
                                key={item.productID}
                                className="border-b hover:bg-primary/60 transition"
                            >
                                <td className="p-4 flex justify-center">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-14 h-14 rounded-lg object-cover border"
                                    />
                                </td>

                                <td className="p-4 text-sm">{item.productID}</td>
                                <td className="p-4 font-medium">{item.name}</td>
                                <td className="p-4 font-semibold">${item.price}</td>
                                <td className="p-4 text-gray-500 text-center">
                                    ${item.labelledPrice}
                                </td>
                                <td className="p-4">{item.category}</td>
                                <td className="p-4 text-gray-500 text-center">
                                    {item.stock}
                                </td>

                                <td className="p-4">
                                    <div className="flex justify-center gap-5 text-lg">
                                        <FaRegTrashAlt
                                            className="cursor-pointer text-gray-500 hover:text-red-600 transition"
                                            title="Delete"
                                        />
                                        <FaRegEdit
                                            className="cursor-pointer text-gray-500 hover:text-accent transition"
                                            title="Edit"
                                            onClick={
                                                () => {
                                                    navigate("/admin/update-product", {
                                                        state: item
                                                    })
                                                }
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No products available
                    </div>
                )}
            </div>
        </div>
    );
}
