import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const product = props.product;

    return (
        <div
            className="w-[300px] h-[450px] bg-white rounded-2xl shadow-md 
                       hover:shadow-xl transition-all duration-300 
                       overflow-hidden m-3 flex flex-col group hover:-translate-y-1 mt-10 z-40"
        >
            {/* Image */}
            <div className="relative w-full h-[220px] overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={product.images[0]}
                    alt={product.name}
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 p-4 flex-1">

                {/* Name */}
                <h1 className="text-lg font-semibold text-text leading-snug line-clamp-2">
                    {product.name}
                </h1>

                {/* Price */}
                {product.labelledPrice > product.price ? (
                    <div className="flex items-end gap-2">
                        <p className="text-sm text-gray-400 line-through font-medium">
                            LKR {product.labelledPrice.toFixed(2)}
                        </p>
                        <p className="text-xl text-accent font-bold">
                            LKR {product.price.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className="text-xl text-accent font-bold">
                        LKR {product.price.toFixed(2)}
                    </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-text mt-1">
                    <span className="font-medium tracking-wide truncate max-w-[120px]">
                        {product.productID}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-secondary/60 text-text font-medium whitespace-nowrap">
                        {product.category}
                    </span>
                </div>

                {/* Spacer keeps CTA aligned */}
                <div className="flex-1" />

                {/* CTA */}
                <Link
                    to={"/overview/" + product.productID}
                    className="w-full text-center py-2.5 rounded-xl 
                               border border-accent text-accent 
                               font-semibold tracking-wide text-sm
                               hover:bg-accent hover:text-white 
                               transition-all duration-300"
                >
                    View Product
                </Link>
            </div>
        </div>
    );
}
