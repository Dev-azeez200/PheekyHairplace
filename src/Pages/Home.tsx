import { FiArrowRight } from "react-icons/fi";
import { IoFlowerOutline } from "react-icons/io5";
import { BsFlower1 } from "react-icons/bs";
import { BsFlower2 } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import assets from "../assets/assets";
import { FaQuoteLeft } from "react-icons/fa";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { useRef } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

import { useNavigate } from "react-router-dom";

type TransformationTileProps = {
  before: string;
  after: string;
  className?: string;
};

const TransformationTile = ({
  before,
  after,
  className = "",
}: TransformationTileProps) => (
  <div className={`group relative overflow-hidden rounded-xl ${className}`}>
    <img
      src={before}
      alt="Before transformation"
      className="absolute inset-0 h-full w-full object-cover grayscale brightness-75 transition-opacity duration-700 group-hover:opacity-0"
    />
    <img
      src={after}
      alt="After transformation"
      className="h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
    />
    <span className="pointer-events-none absolute bottom-4 left-4 bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-[2px] text-white transition-opacity duration-300 group-hover:opacity-0">
      Before
    </span>
    <span className="pointer-events-none absolute bottom-4 left-4 bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-[2px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      After
    </span>
  </div>
);

const Home = () => {
  const wigs = [
    {
      id: 1,
      image: assets.wig1,
      name: "Elegant Blonde Wave",
      type: "100% Human Hair",
      price: "248.00",
    },
    {
      id: 2,
      image: assets.wig2,
      name: "Silky Straight",
      type: "European Lace Wig",
      price: "390.00",
    },
    {
      id: 3,
      image: assets.wig3,
      name: "Ruby Waves",
      type: "Luxury Lace Front",
      price: "520.00",
    },

    {
      id: 3,
      image: assets.wig3,
      name: "Ruby Waves",
      type: "Luxury Lace Front",
      price: "520.00",
    },
  ];

  const navigate = useNavigate();

  const productScrollRef = useRef<HTMLDivElement>(null);

  const scrollProducts = (direction: "left" | "right") => {
    if (!productScrollRef.current) return;

    productScrollRef.current.scrollBy({
      left: direction === "right" ? 350 : -350,
      behavior: "smooth",
    });
  };

  const services = [
    {
      title: "Precision Custom Cuts",
      text:
        "Tailored styling that complements your face shape and hair texture.",
    },
    {
      title: "Dimensional Balayage",
      text: "Colour blending designed to catch the light in every movement.",
    },
    {
      title: "Wig Customisation",
      text:
        "Personalised lace plucking, bleaching and fitting for natural results.",
    },
  ];

  const gallery = [
    {
      id: 1,
      image: assets.wig1,
      after: assets.woman,
      className: "row-span-2",
    },
    {
      id: 2,
      image: assets.wig2,
      after: assets.woam,
      className: "row-span-1",
    },
    {
      id: 3,
      image: assets.wig3,
      after: assets.woman,
      className: "row-span-1",
    },
    {
      id: 4,
      image: assets.woam,
      after: assets.wig1,
      className: "row-span-2",
    },
    {
      id: 5,
      image: assets.woman,
      after: assets.wig2,
      className: "row-span-1",
    },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-accent">
        <div className="absolute top-5 left-20 w-3 h-3 rounded-full bg-secondary" />
        <div className="absolute top-10 left-[45%] text-secondary text-xl">
          <BsStars />
        </div>

        <div className="absolute bottom-0 left-0 text-accent text-6xl opacity-30">
          <IoFlowerOutline />
        </div>

        <div className="absolute top-5 right-8 text-accent text-5xl opacity-40">
          <BsFlower1 />
        </div>

        <div className="absolute bottom-0 right-0 text-accent text-7xl opacity-30">
          <BsFlower2 />
        </div>

        <div className="mx-auto px-6 lg:px-14 py-15 md:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="uppercase tracking-[3px] text-xs text-primary font-semibold">
                Pheeky Hair Place
              </span>

              <h1 className="mt-6 text-4xl lg:text-5xl font-serif leading-tight text-gray-black">
                Elevate Your Beauty with Luxurious Hair
              </h1>

              <p className="mt-6 text-black leading-6 max-w-lg">
                At <strong className="text-primary">Pheeky Hair Place</strong>,
                we specialize in premium human hair, flawless wig installations,
                custom wig making, hair treatments, and professional styling.
                Every visit is designed to leave you feeling confident,
                beautiful, and unforgettable.
              </p>

              <button className="mt-10 inline-flex items-center gap-3 c transition-all duration-300 text-white px-8 py-3 rounded-md font-medium shadow-lg">
                Book Your Appointment
                <FiArrowRight />
              </button>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 translate-x-4 -translate-y-4 border-4 border-primary rounded-[40px]" />

                <div className="relative w-82.5 h-105 rounded-[40px] overflow-hidden shadow-2xl">
                  <img
                    src={assets.woman}
                    alt="Pheeky Hair Place Model"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -left-6 bottom-8 w-10 h-10 rounded-full bg-secondary" />
                <div className="absolute -right-6 top-10 w-6 h-6 rounded-full bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-20 md:py-24 lg:py-25">
        <div className="mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-xl mx-auto">
            <span className="uppercase tracking-[5px] text-xl text-primary">
              Luxury Hair Collection
            </span>

            <p className="mt-4 text-gray-black text-lm leading-5">
              Sourced from the finest ethically obtained human hair, our wigs
              are meticulously handcrafted to deliver unmatched beauty and
              confidence.
            </p>
          </div>

          <div className="flex justify-end items-end">
            <button
              onClick={() => navigate("/wigcollections")}
              className="group flex items-end justify-end gap-2 border-0 px-4 py-1 text-black transition-all duration-300 hover:rounded-xl hover:border hover:border-[#D4AF37] hover:text-primary"
            >
              <span>Explore</span>
              <IoIosArrowRoundForward className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div
            ref={productScrollRef}
            className="mt-14 lg:mt-16 flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none"
          >
            {wigs.map((wig) => (
              <div
                key={wig.id}
                className="group min-w-[85%] sm:min-w-[55%] md:min-w-[40%] lg:min-w-[31%] snap-start bg-white rounded-xl overflow-hidden shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-2 hover:border-primary/20"
              >
                <div className="overflow-hidden">
                  <img
                    src={wig.image}
                    alt={wig.name}
                    className="h-87.5 w-full object-cover transition duration-700  group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg text-gray-black">
                    {wig.name}
                  </h3>

                  <p className="text-sm text-dark mt-2">{wig.type}</p>

                  <div className="mt-5 flex justify-between items-center">
                    <span className="font-semibold flex justify-center items-center">
                      <TbCurrencyNaira />
                      {wig.price}
                    </span>

                    <button
                      onClick={() => navigate(`/shop?product=${wig.id}`)}
                      className="w-10 h-10 flex justify-center items-center rounded-full border border-gray-300 hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-5 mt-12 md:mt-14">
            <button
              onClick={() => scrollProducts("left")}
              aria-label="Previous products"
              className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
            >
              <FiArrowLeft />
            </button>

            <button
              onClick={() => scrollProducts("right")}
              aria-label="Next products"
              className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
            >
              <FiArrowRight />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mt-24 md:mt-28">
            <div>
              <span className="uppercase flex justify-center items-center tracking-[5px] text-center text-xl lg:text-4xl text-primary">
                Hair Spa Experience
              </span>

              <h2 className="text-xl lg:text-4xl font-serif text-gray-black text-center mt-4 leading-tight">
                Bespoke Services tailored to your transformation.
              </h2>

              <div className="space-y-8 mt-10 md:mt-12">
                {services.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="mt-1">
                      <FiCheckCircle className="text-primary" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-black text-xl lg:text-2xl">
                        {item.title}
                      </h4>

                      <p className="text-black mt-2 text-[17px] lg:text-xl leading-7">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
                alt=""
                className="rounded-xl h-100 object-cover w-full"
              />

              <div className="absolute left-25 -bottom-10  border-2 border-white lg:-left-6 lg:bottom-10 bg-accent rounded-2xl w-36 h-36 shadow-xl flex flex-col justify-center items-center">
                <h3 className="text-5xl font-serif text-[#2b2118]">15</h3>

                <span className="uppercase text-xs tracking-[3px] text-[#2b2118] mt-2">
                  Years
                </span>

                <span className="uppercase text-xs tracking-[3px] text-gray-black">
                  Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-20 px-6 lg:px-12 md:px-8 ">
        <div className="mx-auto">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[5px] text-primary text-xl">
              Transformations
            </p>
          </div>

          <div className="hidden lg:grid grid-cols-3 gap-4 auto-rows-65">
            {/* Left */}
            <TransformationTile
              before={gallery[0].image}
              after={gallery[0].after}
              className="row-span-2"
            />

            {/* Middle */}
            <TransformationTile
              before={gallery[1].image}
              after={gallery[1].after}
            />

            {/* Right Top */}
            <TransformationTile
              before={gallery[2].image}
              after={gallery[2].after}
              className="h-65"
            />

            {/* Middle Bottom */}
            <TransformationTile
              before={gallery[4].image}
              after={gallery[4].after}
            />

            {/* Right Bottom */}
            <TransformationTile
              before={gallery[3].image}
              after={gallery[3].after}
              className="row-span-2"
            />

            <TransformationTile
              before={gallery[3].image}
              after={gallery[3].after}
              className="col-span-2"
            />
          </div>

          {/* Tablet */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-5">
            {gallery.map((item) => (
              <TransformationTile
                key={item.id}
                before={item.image}
                after={item.after}
                className="h-87.5 rounded-3xl"
              />
            ))}
          </div>

          {/* Mobile */}
          <div className="grid md:hidden gap-5">
            {gallery.map((item) => (
              <TransformationTile
                key={item.id}
                before={item.image}
                after={item.after}
                className="h-80 rounded-3xl"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5]">
        {/* Testimonial */}
        <div className="max-w-5xl mx-auto px-6 py-28 text-center">
          <FaQuoteLeft className="mx-auto text-[#C9A227] text-5xl" />

          <p
            className="mt-10 text-lg md:text-xl italic leading-10 text-gray-700 max-w-4xl mx-auto"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            "Pheeky Hair Place doesn't just style your hair—they transform the
            way you feel. Every installation is flawless, every detail is
            intentional, and the confidence you leave with is unmatched."
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <img
              src={assets.wig1}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />

            <div className="text-left">
              <h4 className="font-semibold tracking-wide uppercase text-sm">
                Sarah Williams
              </h4>

              <p className="text-gray-500 text-sm">
                Beauty & Lifestyle Influencer
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
