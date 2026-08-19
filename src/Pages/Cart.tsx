import { Link } from "react-router-dom";
import { FiArrowLeft, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-light text-gray-black">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-10">
        <Link
          to="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-dark/60"
        >
          <FiArrowLeft size={16} />
          Back to Shop
        </Link>

        <h1
          className="text-4xl font-semibold"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="mt-12 rounded-xl border border-[#E3DDD8] bg-white p-10 text-center">
            <FiShoppingBag size={40} className="mx-auto text-primary" />
            <p className="mt-6 text-xl font-medium">Your cart is empty.</p>
            <p className="mt-2 text-sm text-[#7C6D65]">
              Add items from our shop to see them here.
            </p>
            <Link
              to="/shop"
              className="mt-10 inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 text-white px-8 py-3 rounded-md font-medium shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.7fr_0.8fr]">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray bg-light p-4 sm:p-6"
                >
                  <div className="flex gap-5">
                    {/* Product Image */}
                    <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-light sm:h-36 sm:w-32">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {item.category && (
                            <p className="text-[10px] uppercase tracking-[0.2em] text-dark">
                              {item.category}
                            </p>
                          )}

                          <h2 className="mt-1 text-lg font-semibold text-gray-black">
                            {item.name}
                          </h2>

                          {item.description && (
                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-dark/60">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E3DDD8] text-[#7C6D65] transition  hover:text-light hover:bg-primary"
                          aria-label={`Remove ${item.name}`}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>

                      {/* Price + Quantity */}
                      <div className="mt-4 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs text-dark">
                            Quantity: {item.quantity}
                          </p>

                          <p className="mt-1 flex items-center text-base font-semibold text-dark">
                            <TbCurrencyNaira />
                            {item.price.toLocaleString()}
                          </p>
                        </div>

                        <p className="text-sm font-medium text-dark">
                          Subtotal:{" "}
                          <span className="text-dark">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#E3DDD8] bg-light p-6 h-65">
              <h2 className="text-2xl font-semibold">Order Summary</h2>
              <div className="mt-8 space-y-4 text-sm text-dark">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span className="flex items-center   text-dark">
                    <TbCurrencyNaira />
                    {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={clearCart}
                className="mt-10 w-full justify-center inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 text-white px-8 py-3 rounded-md font-medium shadow-lg"
              >
                Proceed
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
