import { FiCheck } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";

interface ShopFiltersProps {
  category: string;
  setCategory: (value: string) => void;

  length: string;
  setLength: (value: string) => void;

  color: string;
  setColor: (value: string) => void;

  price: number;
  setPrice: (value: number) => void;

  resetFilters: () => void;
}

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

const ShopFilters = ({
  category,
  setCategory,
  length,
  setLength,
  color,
  setColor,
  price,
  setPrice,
  resetFilters,
}: ShopFiltersProps) => {
  return (
    <aside className="hidden w-[220px] shrink-0 lg:block">
      {/* Categories */}
      <FilterTitle title="Categories" />

      <div className="space-y-3">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(category === item ? "" : item)}
            className="group flex w-full items-center gap-3 text-left"
          >
            <span
              className={`flex h-3.5 w-3.5 items-center justify-center border ${
                category === item ? "border-light bg-primary" : "border-gray"
              }`}
            >
              {category === item && <FiCheck size={9} className="text-white" />}
            </span>

            <span className="text-xs text-dark hover:text-primary">{item}</span>
          </button>
        ))}
      </div>

      {/* Length */}
      <div className="mt-10">
        <FilterTitle title="Length (inches)" />

        <div className="grid grid-cols-5 gap-1">
          {lengths.map((item) => (
            <button
              key={item}
              onClick={() => setLength(length === item ? "" : item)}
              className={`h-8 border text-[10px] transition ${
                length === item
                  ? "border-light bg-primary text-white"
                  : "border-gray text-dark hover:border-light"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <FilterTitle title="Price Range" />

        <input
          type="range"
          min="500"
          max="3000"
          step="50"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-primary bg-light"
        />

        <div className="mt-2 flex justify-between text-[10px] text-dark">
          <span>
            <TbCurrencyNaira />
            500
          </span>
          <span>
            <TbCurrencyNaira />
            {price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-10">
        <FilterTitle title="Color" />

        <div className="flex flex-wrap gap-2">
          {colors.map((item) => (
            <button
              key={item.value}
              onClick={() => setColor(color === item.value ? "" : item.value)}
              title={item.name}
              className={`relative flex h-7 w-7 items-center justify-center rounded-full border ${
                color === item.value ? "border-primary" : "border-transparent"
              }`}
            >
              <span className={`h-5 w-5 rounded-full ${item.className}`} />
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="mt-10 text-[10px] uppercase tracking-[0.2em] text-dark underline underline-offset-4 hover:text-[#2D2420]"
      >
        Reset Filters
      </button>
    </aside>
  );
};

const FilterTitle = ({ title }: { title: string }) => (
  <h3 className="mb-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-primary">
    {title}
  </h3>
);

export default ShopFilters;
