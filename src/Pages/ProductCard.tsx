import { FiHeart, FiArrowUpRight } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { useWishlist } from "../context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(product.id);

  return (
    <article className="group">
      {/* Image */}
      <div className="relative h-[320px] overflow-hidden bg-light sm:h-[360px] lg:h-[390px]">
        <Link to={`/shop/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 rounded-xl"
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
          onClick={() => toggleWishlist(product)}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition ${
            liked
              ? "bg-primary text-light"
              : "bg-white/90 text-dark hover:bg-primary hover:text-light"
          }`}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart
            size={14}
            className={liked ? "fill-current text-light" : "text-current"}
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