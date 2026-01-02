import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi"; 
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";


export function ProductDeleteConfirm(props) {

    const productID = props.productID

    const close = props.close

    const refresh = props.refresh

    function Deleteproduct(){

        const token = localStorage.getItem("token")

            axios.delete(import.meta.env.VITE_API_URL + "/api/products/" + productID,{
                headers:{
                    Authorization : "Bearer " + token
                }
            })
            .then((res)=>{
                    console.log(res.data)
                    close();
                    toast.success("Product Deleted Successfully")
                    refresh()
            }).catch(
                (err)=>{
                    toast.error("Failed to Delete Product")
                }
            )

    }

    return (<div className="fixed left-0 top-0 w-full h-[100vh] bg-[#00000050] z-[100] flex justify-center items-center">

        <div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">

            <button onClick={close} className="absolute right-[-45px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border-red-600 hover:bg-white hover:text-red-700">
                X
            </button>

            <p className="text-xl font-semibold">Are you sure you want to delete the product with Product ID : {productID}?</p>
            <div className="flex gap-[40px]">
                <button className="w-[70px] bg-red-600 p-[5px] text-white hover:bg-transparent hover:bg-accent  rounded-2xl" onClick={Deleteproduct}>Yes</button>
                <button className="w-[70px] bg-blue-600 p-[5px] text-white hover:bg-transparent hover:bg-accent  rounded-2xl" onClick={close}>Cancel</button>
            </div>

        </div>

    </div>)
}


export default function Adminproductpage() {

    const [products, setProducts] = useState([]);

    const [isDeteleConfirmVisibale, setIsDeleteConfirmvisibale] = useState(false)

    const [producToDelete,setProductToDelete] = useState(null)

    const [isLoading,setLoading] = useState(true)

    const navigate = useNavigate()



    useEffect(() => {

        if(isLoading){
             axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            });
        }

    }, [isLoading]);

    return (

        <div className="w-full min-h-screen bg-primary p-6 text-text">

            {
                isDeteleConfirmVisibale && <ProductDeleteConfirm refresh={()=>{setLoading(true)}} productID={producToDelete} close ={()=>{setIsDeleteConfirmvisibale(false)}}  />
            }

            <Link to="/admin/add-product" className="fixed bottom-[50px] right-[50px] text-5xl text-accent hover:scale-110 transition">
                <FiPlusCircle className="hover:text-accent " />
            </Link>

            <div className="overflow-x-auto rounded-xl shadow-md bg-white">
               {isLoading? <Loader/> : <table className="w-full border-collapse">
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
                                            onClick={
                                                () => {
                                                    setProductToDelete(item.productID)
                                                    setIsDeleteConfirmvisibale(true)
                                                }
                                            }
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
                </table>}

                {products.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        No products available
                    </div>
                )}
            </div>
        </div>
    );
}
