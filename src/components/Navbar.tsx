import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi";
import assets from "../assets/assets";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/shop", name: "Shop" },
    { path: "/services", name: "Services" },
    { path: "/our-work", name: "Our Work" },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 h-[70px] bg-secondary backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <img
          src={assets.Logo}
          alt="Logo"
          className="w-16 shrink-0 object-contain sm:w-20"
        />

        <ul
          className={`flex lg:flex-row flex-col items-center gap-8 text-[15px]
          lg:static absolute left-0 top-[70px] w-full lg:w-auto
          bg-white lg:bg-transparent
          h-[calc(100vh-70px)] lg:h-auto
          p-8 lg:p-0
           transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            will-change-transform
          origin-top   
          ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-[120%] opacity-0 lg:pointer-events-auto lg:translate-y-0 lg:opacity-100"
          }`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `transition-colors duration-200 py-2 ${
                  isActive
                    ? "border-b-2 border-primary text-primary italic"
                    : "text-dark hover:text-primary"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="flex lg:hidden items-center gap-8 pt-8 border-t border-gray-200 w-full justify-center ">
            <button
              className="text-2xl"
              onClick={() => {
                setOpen(false);
                navigate("/login");
              }}
            >
              <FaRegUser />
            </button>

            <button
              className="relative text-2xl"
              onClick={() => {
                setOpen(false);
                navigate("/cart");
              }}
            >
              <FiShoppingBag />
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              className="relative text-2xl"
              onClick={() => {
                setOpen(false);
                navigate("/wishlist");
              }}
            >
              <FaRegHeart />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
          </div>
        </ul>

        <div className="hidden lg:flex items-center gap-5  lg:px-4">
          <button
            className="text-xl hover:text-primary transition"
            onClick={() => navigate("/login")}
          >
            <FaRegUser />
          </button>

          <button
            className="relative text-xl hover:text-primary transition"
            onClick={() => navigate("/cart")}
          >
            <FiShoppingBag />
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                {cart.length}
              </span>
            )}
          </button>

          <button
            className="relative text-xl hover:text-primary transition"
            onClick={() => navigate("/wishlist")}
          >
            <FaRegHeart />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[10px] font-semibold text-white">
                {wishlistCount}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center text-2xl lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <FiMenu
            aria-hidden="true"
            className={`absolute transition-all duration-300 ease-out ${
              open
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <FiX
            aria-hidden="true"
            className={`absolute transition-all duration-300 ease-out ${
              open
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
