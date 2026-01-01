
import { useState } from "react";
import Mediaupload from "../Utils/mediaupload";


export default function Test() {
    const [file, setFile] = useState(null);

    async function uploadImage() {
        const link = await Mediaupload(file);
        console.log(link);
    }

    return (
        <div className="w-full h-full flex items-center justify-center text-black">
            <input
                type="file"
                onChange={(e) => {
                    setFile(e.target.files[0]);
                }}
            />
            <button
                className="bg-blue-500 text-amber-50 p-2 rounded-2xl"
                onClick={uploadImage}
            >
                Upload Image
            </button>
        </div>
    );
}
