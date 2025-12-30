import { use, useState } from "react";

export default function Test() {

    const [count,setcount]= useState(10)

    return (
        <div className="w-full h-full flex items-center justify-center text-white">

            <div className="w-[500px] h-[500px] bg-red-700 flex items-center justify-center gap-10 rounded-lg">

                <button onClick={

                    () => {
                        console.log("Increasing");
                        setcount(count + 1)
                        console.log(count);
                    }

                } className="w-[100px] bg-accent h-[40px] rounded-lg">

                    +

                </button>

                <span className="text-accent text-5xl ">{count}</span>

                <button  onClick={
                    ()=>{
                        console.log("Decreasing")
                        setcount(count -1)
                        console.log(count);
                    }
                    } className="w-[100px] bg-accent h-[40px] rounded-lg">

                    -

                </button>
            </div>
        </div>
    )
}