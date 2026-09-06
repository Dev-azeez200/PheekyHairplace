import { FiSliders } from "react-icons/fi";

interface ShopToolbarProps {
  count: number;
  sort: string;
  setSort: (value: string) => void;
  openFilters: () => void;
}

const ShopToolbar = ({
  count,
  sort,
  setSort,
  openFilters,
}: ShopToolbarProps) => {
  return (
    <div className="mb-7 flex items-center justify-between border-y border-[#E6D9D0] py-4">
      <span className="text-[10px] uppercase tracking-[0.15em] text-dark">
        {count} pieces
      </span>

      <div className="flex items-center gap-4">
        <button
          onClick={openFilters}
          className="flex items-center gap-2 rounded-full border border-[#D8C9BD] px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-dark transition hover:border-primary hover:bg-primary hover:text-white"
        >
          <FiSliders size={13} />
          Filters
        </button>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-transparent text-[10px] uppercase tracking-[0.15em] outline-none"
        >
          <option value="featured">Sort by: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
};

export default ShopToolbar;
