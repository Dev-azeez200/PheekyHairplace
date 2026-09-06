import { FiHeart, FiEye, FiShoppingBag } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const liked = isInWishlist(product.id);

  return (
    <article className="group relative rounded bg-white p-2 transition-all duration-300 hover:-translate-y-1 lg:p-1.5">
      {/* Image */}
      <div className="relative h-90 overflow-hidden bg-[#f0e3d8] sm:h-90 lg:h-100">
        <Link to={`/shop/${product.id}`} className="block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full rounded object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Featured */}
        {product.featured && (
          <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#57473e]">
            Featured
          </span>
        )}

        {/* Product actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
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

          <button
            type="button"
            onClick={() => {
              addToCart(product);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1400);
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
              added
                ? "bg-primary text-light"
                : "bg-white/90 text-dark hover:bg-primary hover:text-light"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <FiShoppingBag size={15} />
          </button>

          <Link
            to={`/shop/${product.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-dark backdrop-blur transition hover:bg-primary hover:text-light"
            aria-label={`View ${product.name}`}
          >
            <FiEye size={15} />
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="px-2.5 pb-3 pt-3">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#a28673]">
              Virgin hair collection
            </p>

            <Link
              to={`/shop/${product.id}`}
              className="mt-1 block font-serif text-lg leading-tight text-[#211912] transition hover:opacity-60"
            >
              {product.name}
            </Link>

            <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#57473e]">
              {product.length}" · {product.category}
            </p>
          </div>

          <span className="flex shrink-0 items-center whitespace-nowrap text-sm font-semibold text-[#211912]">
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