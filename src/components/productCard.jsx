export default function ProductCard(props) {

  const product = props.product

  return (
    <div className="w-[300px] h-[400px] shadow-2xl m-3 flex flex-col">

      <img  className="w-full h-[250px] object-cover" src={product.images[0]} alt="" />

      <h1 className="text-xl text-text font-bold">{product.name}</h1>

      {
        product.labelledPrice>product.price?
        <div className="flex items-center gap-3">

          <p className="text-lg text-text font-semibold line-through">LKR {product.labelledPrice.toFixed(2)}</p>
          <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>

        </div>
        :<p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>

      }

        <p className="text-sm text-text font-semibold">{product.productID}</p>
        <p className="text-sm text-text font-semibold">{product.category}</p>
      
        <button className="w-full h-[30px] border border-accent text-accent hover:bg-accent hover:text-white mt-[5px]" >
          View Product
        </button>

    </div>
  )
}