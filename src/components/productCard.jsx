import { Link } from "react-router-dom";

export default function ProductCard(props) {
    const product = props.product;

    return (
        <div className="w-[360px] h-[500px] bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden m-3 flex flex-col group hover:-translate-y-1">

            {/* Image */}
            <div className="relative w-full h-[250px] overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={product.images[0]}
                    alt=""
                />

                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 p-5 flex-1">

                {/* Name */}
                <h1 className="text-xl font-semibold text-text leading-snug line-clamp-2">
                    {product.name}
                </h1>

                {/* Price */}
                {product.labelledPrice > product.price ? (
                    <div className="flex items-end gap-2">
                        <p className="text-base text-gray-400 line-through font-medium">
                            LKR {product.labelledPrice.toFixed(2)}
                        </p>
                        <p className="text-2xl text-accent font-bold">
                            LKR {product.price.toFixed(2)}
                        </p>
                    </div>
                ) : (
                    <p className="text-2xl text-accent font-bold">
                        LKR {product.price.toFixed(2)}
                    </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-text mt-1">
                    <span className="font-medium tracking-wide">
                        {product.productID}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary/60 text-text font-medium">
                        {product.category}
                    </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-200 my-2" />

                {/* CTA */}
                <Link
                    to={"/overview/" + product.productID}
                    className="mt-auto w-full text-center py-3 rounded-xl border border-accent text-accent font-semibold tracking-wide text-base
                               hover:bg-accent hover:text-white transition-all duration-300"
                >
                    View Product
                </Link>
            </div>
        </div>
    );
}
