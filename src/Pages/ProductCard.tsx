import { FiHeart, FiArrowUpRight } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group">
      {/* Image */}
      <div className="relative aspect-4/5 overflow-hidden bg-light">
        <Link to={`/shop/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 rounded-xl group-hover:scal-105-rounded-xl"
          />
        </Link>

        {/* Featured */}
        {product.featured && (
          <span className="absolute left-3 top-3 bg-dark px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-white">
            Featured
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur transition  hover:bg-primary hover:text-light hover:font-bold"
          aria-label="Add to wishlist"
        >
          <FiHeart
            size={14}
            className={liked ? "fill-dark hover:fill-light text-dark hover:text-light" : ""}
          />
        </button>

        {/* View */}
        <Link
          to={`/shop/${product.id}`}
          className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-3 items-center justify-center rounded-full hover:bg-primary hover:text-light hover:font-bold bg-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <FiArrowUpRight size={15} />
        </Link>
      </div>

      {/* Details */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/shop/${product.id}`}
              className="font-serif text-lg text-dark transition hover:opacity-60"
            >
              {product.name}
            </Link>

            <p className="mt-1 text-[14px] uppercase tracking-[0.12em] text-dark">
              {product.length}" · {product.category}
            </p>
          </div>

          <span className="whitespace-nowrap text-xl text-text flex items-center">
            <TbCurrencyNaira />{product.price.toLocaleString()}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex text-primary">
            {"★".repeat(Math.floor(product.rating))}
          </div>

          <span className="text-[10px] text-[#8B7C73]">
            ({product.reviews})
          </span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;