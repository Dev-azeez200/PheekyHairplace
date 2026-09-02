import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-rosco">Wishlist</h1>
        <p className="mt-2 text-gray-500">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-xl border border-gray-200 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rosco">
            <FiShoppingBag className="text-2xl text-white" />
          </div>

          <h2 className="mt-5 text-xl lg:text-2xl md:text-2xl font-medium text-gray-900">
            Your wishlist is empty
          </h2>

          <p className="mt-3 text-black text-xl lg:text-2xl">
            Save products you love to find them here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {wishlist.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col  overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-gray-300 hover:shadow-sm sm:flex-row sm:items-center"
            >
              <div className="flex h-50 w-full shrink-0 items-center justify-center bg-white sm:h-48 sm:w-48 lg:w-52">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 sm:min-h-[180px] sm:py-6">
                <div>
                  <h2 className="text-xl font-medium leading-snug text-gray-900">
                    {product.name}
                  </h2>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="text-xl font-semibold text-gray-900">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 sm:hidden">
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-black transition hover:border-red-400 hover:text-red-500"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => addToCart(product)}
                    className="flex  items-center justify-center gap-2 rounded-lg bg-rosco px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <FiShoppingBag />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="hidden items-center gap-6 px-6 sm:flex">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-base font-medium text-rosco transition hover:text-red-500 hover:border px-4 py-2 rounded-lg"
                >
                  Remove
                </button>

                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-2 rounded-lg bg-rosco px-4 py-2 text-base font-semibold text-white shadow-md transition duration-300 hover:opacity-90 hover:shadow-lg"
                >
                  <FiShoppingBag />
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
