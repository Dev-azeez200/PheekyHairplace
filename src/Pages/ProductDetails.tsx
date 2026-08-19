import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiHeart, FiShoppingBag } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import { products } from "../data/products";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { BiPlus } from "react-icons/bi";
import { FaMinus } from "react-icons/fa6";
import ProductRating from "./ProductRating";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [currentRating, setCurrentRating] = useState(product?.rating ?? 0);
  const [currentReviews, setCurrentReviews] = useState(product?.reviews ?? 0);
  const [hasRated, setHasRated] = useState(false);

  const handleRate = (value: number) => {
    const totalScore = currentRating * currentReviews;
    const updatedReviews = currentReviews + 1;
    const updatedRating = Number(
      ((totalScore + value) / updatedReviews).toFixed(1),
    );

    setCurrentRating(updatedRating);
    setCurrentReviews(updatedReviews);
    setHasRated(true);
  };

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl">Product Not Found</h1>

          <Link
            to="/shop"
            className="mt-5 inline-block border border-dark px-6 py-3 text-xs"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-light">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-14">
        <Link to="/shop" className="mb-8 flex items-center gap-2 text-xs dark">
          <FiArrowLeft size={14} />
          Back to collection
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="aspect-4/5 overflow-hidden bg-light">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full  object-cover rounded-xl"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-[9px] uppercase tracking-[0.3em] text-primary">
              {product.category}
            </p>

            <h1 className="mt-3 text-5xl">{product.name}</h1>

            <p className="mt-4 text-xl flex  items-center ">
              <TbCurrencyNaira />
              {product.price.toLocaleString()}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="text-dark">
                {currentRating} · {currentReviews} reviews
              </span>
            </div>

            <ProductRating
              productId={product.id}
              rating={currentRating}
              reviews={currentReviews}
              onRate={handleRate}
            />

            {hasRated && (
              <p className="mt-2 text-xs text-dark/60">
                Thank you for rating! The rating and review count have been
                updated.
              </p>
            )}

            <p className="mt-7 max-w-lg text-sm leading-7 text-dark">
              {product.description}
            </p>

            {/* Info */}
            <div className="mt-8 grid grid-cols-2 border-y border-gray py-5">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-dark">
                  Length
                </span>

                <p className="mt-2 text-sm">{product.length}"</p>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-dark">
                  Color
                </span>

                <p className="mt-2 text-sm">{product.color}</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 items-center border border-gray">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 hover:bg-primary h-full border border-light shadow hover:text-light hover:font-bold text-center flex justify-center items-center"
                >
                  <FaMinus />
                </button>

                <span className="w-8 text-center text-sm font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 hover:bg-primary h-full border border-light shadow hover:text-light hover:font-bold text-center flex justify-center items-center"
                >
                  <BiPlus />
                </button>
              </div>

              <button
                onClick={() => setLiked(!liked)}
                className="flex h-12 w-12 items-center justify-center border border-light shadow hover:text-light hover:font-bold hover:bg-primary"
              >
                <FiHeart size={17} className={liked ? "fill-light" : ""} />
              </button>
            </div>

            {/* Add to cart */}
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  description: product.description,
                  quantity,
                })
              }
              className="mt-10 inline-flex items-center text-center justify-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 text-white px-8 py-3 rounded-md font-medium shadow-lg"
            >
              <FiShoppingBag size={16} />
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
