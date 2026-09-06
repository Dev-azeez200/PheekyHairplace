import { FaPlus } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

const WigCollections = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const wigs = products.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-light px-6 py-16 md:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="uppercase font-serif italic tracking-[5px] text-primary text-xl">
            Luxury Hair Collection
          </p>
          <h1 className="mt-4 font-serif italic text-3xl text-gray-black md:text-5xl">
            Find Your Signature Wigs
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-black">
            Explore our handcrafted styles, created to make every look feel
            effortlessly yours.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {wigs.map((wig) => (
            <div
              key={wig.id}
              className="group relative rounded bg-white p-2 transition-all duration-300 hover:-translate-y-1 lg:p-1.5"
            >
              <div className="relative overflow-hidden bg-[#f0e3d8]">
                <img
                  src={wig.image}
                  alt={wig.name}
                  className="h-90 w-full rounded object-cover transition duration-700 group-hover:scale-105 lg:h-100"
                />
                <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#57473e]">
                  {wig.length}&quot; · {wig.category}
                </span>
              </div>

              <div className="px-2.5 pb-3 pt-3">
                <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#a28673]">
                  Virgin hair collection
                </p>

                <div className="mt-1 flex items-end justify-between gap-3">
                  <h3 className="font-serif text-lg leading-tight text-[#211912]">
                    {wig.name}
                  </h3>

                  <span className="flex shrink-0 items-center text-sm font-semibold text-[#211912]">
                    <TbCurrencyNaira />
                    {wig.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/shop?product=${wig.id}`)}
                  aria-label={`View ${wig.name} in shop`}
                  className="mt-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#d8c9bd] text-[#6f5b50] transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < products.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount(products.length)}
              className="rounded-md bg-primary px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-secondary"
            >
              View More
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default WigCollections;
