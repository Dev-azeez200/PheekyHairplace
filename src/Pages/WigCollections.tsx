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
          <p className="uppercase tracking-[5px] text-primary text-xl">
            Luxury Hair Collection
          </p>
          <h1 className="mt-4 font-serif text-4xl text-gray-black md:text-5xl">
            Find Your Signature Wig
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
              className="group overflow-hidden rounded-xl border border-transparent bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/20"
            >
              <div className="overflow-hidden">
                <img
                  src={wig.image}
                  alt={wig.name}
                  className="h-87.5 w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="font-serif text-lg text-gray-black">
                  {wig.name}
                </h3>

                <p className="mt-2 text-sm text-dark">{wig.category}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="flex items-center justify-center font-semibold">
                    <TbCurrencyNaira />
                    {wig.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => navigate(`/shop?product=${wig.id}`)}
                    aria-label={`View ${wig.name} in shop`}
                    className="w-10 h-10 flex justify-center items-center rounded-full border border-gray-300 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                  >
                    <FaPlus />
                  </button>
                </div>
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
