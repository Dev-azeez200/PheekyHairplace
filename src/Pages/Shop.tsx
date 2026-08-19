import { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import ShopFilters from "./ShopFilters";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import ShopToolbar from "./ShopToolbar";

const ITEMS_PER_PAGE = 6;

const Shop = () => {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");
  const [length, setLength] = useState("");
  const [color, setColor] = useState("");

  const [price, setPrice] = useState(3000);

  const [sort, setSort] = useState("featured");

  const [page, setPage] = useState(1);

  const [mobileFilters, setMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.color.toLowerCase().includes(query),
      );
    }

    if (category) {
      result = result.filter((product) => product.category === category);
    }

    if (length) {
      result = result.filter((product) => product.length === length);
    }

    if (color) {
      result = result.filter((product) => product.color === color);
    }

    result = result.filter((product) => product.price <= price);

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [search, category, length, color, price, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setLength("");
    setColor("");
    setPrice(3000);
    setSort("featured");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-light text-gray-black">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-10 lg:px-14">
        <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-primary">
          Curated Collection
        </p>

        <h1 className="mt-3 text-5xl leading-none md:text-6xl lg:text-7xl">
          The Art of Hair
        </h1>

        <p className="mt-5 max-w-2xl text-xs leading-6 text-gray-black/80 md:text-sm">
          Discover our curated collection of premium wigs, hair units, and
          signature styles designed for effortless elegance and timeless beauty.
        </p>

        {/* Search */}
        <div className="relative mt-8 max-w-sm">
          <FiSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search our collection..."
            className="h-10 w-full border border-gray bg-white pl-9 pr-9 text-xs outline-none transition focus:border-dark"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <FiX size={13} />
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl gap-10 px-6 pb-20 md:px-10 lg:px-14">
        {/* Desktop Filters */}
        <ShopFilters
          category={category}
          setCategory={(value) => {
            setCategory(value);
            setPage(1);
          }}
          length={length}
          setLength={(value) => {
            setLength(value);
            setPage(1);
          }}
          color={color}
          setColor={(value) => {
            setColor(value);
            setPage(1);
          }}
          price={price}
          setPrice={(value) => {
            setPrice(value);
            setPage(1);
          }}
          resetFilters={resetFilters}
        />

        {/* Products */}
        <div className="min-w-0 flex-1">
          <ShopToolbar
            count={filteredProducts.length}
            sort={sort}
            setSort={(value) => {
              setSort(value);
              setPage(1);
            }}
            openFilters={() => setMobileFilters(true)}
          />

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState resetFilters={resetFilters} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="h-6 px-2 text-xs disabled:opacity-30"
              >
                <IoIosArrowBack />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`h-8 w-8 text-xs ${
                      page === number
                        ? "bg-primary text-light rounded-full"
                        : "text-dark"
                    }`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="h-6 px-2 text-xs disabled:opacity-30"
              >
                <IoIosArrowForward />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Mobile Filters */}
      {mobileFilters && (
        <MobileFilterPanel
          category={category}
          setCategory={setCategory}
          length={length}
          setLength={setLength}
          color={color}
          setColor={setColor}
          price={price}
          setPrice={setPrice}
          resetFilters={resetFilters}
          close={() => setMobileFilters(false)}
        />
      )}
    </main>
  );
};

export default Shop;

const EmptyState = ({ resetFilters }: { resetFilters: () => void }) => {
  return (
    <div className="flex min-h-87.5 flex-col items-center justify-center text-center">
      <p className="text-3xl">Nothing found</p>

      <p className="mt-3 max-w-sm text-xs leading-6 text-secondary">
        We couldn't find any pieces matching your current filters. Try adjusting
        your search or filters.
      </p>

      <button
        onClick={resetFilters}
        className="mt-6 border border-dark px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition hover:bg-dark hover:text-white"
      >
        Clear Filters
      </button>
    </div>
  );
};

interface MobileFilterPanelProps {
  category: string;
  setCategory: (value: string) => void;

  length: string;
  setLength: (value: string) => void;

  color: string;
  setColor: (value: string) => void;

  price: number;
  setPrice: (value: number) => void;

  resetFilters: () => void;
  close: () => void;
}

const MobileFilterPanel = ({
  category,
  setCategory,
  length,
  setLength,
  color,
  setColor,
  price,
  setPrice,
  resetFilters,
  close,
}: MobileFilterPanelProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 lg:hidden">
      <div className="absolute bottom-0 left-0 max-h-[90vh] w-full overflow-y-auto bg-light p-6">
        <div className="mb-8 flex items-center justify-between">
          <h2
            className="text-3xl"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Filters
          </h2>

          <button onClick={close}>
            <FiX size={20} />
          </button>
        </div>

        <ShopFiltersMobileContent
          category={category}
          setCategory={setCategory}
          length={length}
          setLength={setLength}
          color={color}
          setColor={setColor}
          price={price}
          setPrice={setPrice}
        />

        <div className="mt-8 flex gap-3">
          <button
            onClick={resetFilters}
            className="flex-1 border border-dark py-3 text-[10px] uppercase tracking-[0.2em]"
          >
            Reset
          </button>

          <button
            onClick={close}
            className="flex-1 bg-dark py-3 text-[10px] uppercase tracking-[0.2em] text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

/* Mobile filter content */

const ShopFiltersMobileContent = ({
  category,
  setCategory,
  length,
  setLength,
  color,
  setColor,
  price,
  setPrice,
}: Omit<MobileFilterPanelProps, "resetFilters" | "close">) => {
  const categories = [
    "Bone Straight",
    "Body Wave",
    "Deep Wave",
    "Curly",
    "Bob",
    "Pixie",
  ];

  const lengths = ["10", "12", "14", "16", "18", "20", "22", "24", "26", "28"];

  const colors = [
    { name: "Black", value: "Black", className: "bg-black" },
    { name: "Brown", value: "Brown", className: "bg-[#6B4937]" },
    { name: "Honey", value: "Honey", className: "bg-[#C9973E]" },
    { name: "Blonde", value: "Blonde", className: "bg-[#E3D5B8]" },
    { name: "Ash", value: "Ash", className: "bg-[#B8B5AF]" },
  ];

  return (
    <div>
      <h3 className="mb-4 text-[9px] uppercase tracking-[0.25em]">
        Categories
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(category === item ? "" : item)}
            className={`border px-3 py-3 text-left text-xs ${
              category === item
                ? "border-[#2D2420] bg-[#2D2420] text-white"
                : "border-[#E0D9D4]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <h3 className="mb-4 mt-8 text-[9px] uppercase tracking-[0.25em]">
        Length
      </h3>

      <div className="grid grid-cols-5 gap-2">
        {lengths.map((item) => (
          <button
            key={item}
            onClick={() => setLength(length === item ? "" : item)}
            className={`border py-2 text-xs ${
              length === item
                ? "border-[#2D2420] bg-[#2D2420] text-white"
                : "border-[#E0D9D4]"
            }`}
          >
            {item}"
          </button>
        ))}
      </div>

      <h3 className="mb-4 mt-8 text-[9px] uppercase tracking-[0.25em]">
        Price
      </h3>

      <input
        type="range"
        min="500"
        max="3000"
        step="50"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="w-full accent-[#2D2420]"
      />

      <div className="mt-2 text-xs text-[#7C6D65]">
        Up to <TbCurrencyNaira />
        {price.toLocaleString()}
      </div>

      <h3 className="mb-4 mt-8 text-[9px] uppercase tracking-[0.25em]">
        Color
      </h3>

      <div className="flex gap-3">
        {colors.map((item) => (
          <button
            key={item.value}
            onClick={() => setColor(color === item.value ? "" : item.value)}
            className={`h-8 w-8 rounded-full border p-1 ${
              color === item.value ? "border-[#2D2420]" : "border-transparent"
            }`}
          >
            <span
              className={`block h-full w-full rounded-full ${item.className}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
