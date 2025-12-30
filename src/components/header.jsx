export default function Header(){
    return(

        <header className="w-full bg-accent h-[60px] text-white px-[20px]">

            <div className="w-full h-full flex relative">
                 <img src="/logo.png" alt="" className="h-full w-[80px]  object-cover absolute left-0"/>

                <div className="w-full h-full flex items-center justify-center gap-[40px] text-lg font-bold">
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </div>

            </div>
           

        </header>


    )
}