import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const product = props.product;

    return (
        <div className="w-[300px] h-[500px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden m-3 flex flex-col mt-4">

            {/* Image */}
            <div className="w-full h-[250px] overflow-hidden object-cover">
                <img
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    src={product.images[0]}
                    alt=""
                />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 p-4 flex-1">

                {/* Name */}
                <h1 className="text-lg font-bold text-text leading-tight">
                    {product.name}
                </h1>

                {/* Price */}
                {product.labelledPrice > product.price ? (
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-400 line-through font-medium">
                            LKR {product.labelledPrice.toFixed(2)}
                        </p>
                        <p className="text-lg text-accent font-bold">
                            LKR {product.price.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className="text-lg text-accent font-bold">
                        LKR {product.price.toFixed(2)}
                    </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-text mt-1">
                    <span className="font-medium">{product.productID}</span>
                    <span className="px-3 py-1 rounded-full bg-secondary text-text font-medium">
                        {product.category}
                    </span>
                </div>

                {/* CTA */}
                <Link
                    to={"/overview/" + product.productID}
                    className="mt-auto w-full text-center py-2 rounded-xl border border-accent text-accent font-semibold hover:bg-accent hover:text-white transition"
                >
                    View Product
                </Link>
            </div>
        </div>
    );
}
