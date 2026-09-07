import assets from "../assets/assets";
import { PiStarFourBold } from "react-icons/pi";
import { PiHairDryer } from "react-icons/pi";
import { FiCheckCircle } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GiOppositeHearts } from "react-icons/gi";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import { FaStar } from "react-icons/fa";

type TransformationTileProps = {
  before: string;
  after: string;
  className?: string;
};

const TransformationTile = ({
  before,
  after,
  className = "",
}: TransformationTileProps) => {
  const tileRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShowAfter(false);
        }
      },
      { threshold: 0.55 },
    );
    observer.observe(tile);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = window.setTimeout(() => setShowAfter(true), 2000);
    return () => window.clearTimeout(timeout);
  }, [isVisible]);

  return (
    <div
      ref={tileRef}
      className={`group relative overflow-hidden rounded-xl transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-8 scale-[0.98] opacity-0"
      } ${className}`}
    >
      <img
        src={before}
        alt="Before transformation"
        className={`absolute inset-0 h-full w-full object-cover grayscale brightness-75 transition-opacity duration-700 ${
          showAfter ? "opacity-0" : "opacity-100 group-hover:opacity-0"
        }`}
      />
      <img
        src={after}
        alt="After transformation"
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          showAfter ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
      <span
        className={`pointer-events-none absolute bottom-4 left-4 bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-[2px] text-white transition-opacity duration-300 ${
          showAfter ? "opacity-0" : "opacity-100 group-hover:opacity-0"
        }`}
      >
        Before
      </span>
      <span
        className={`pointer-events-none absolute bottom-4 left-4 bg-primary/90 px-3 py-1 text-xs font-semibold uppercase tracking-[2px] text-white transition-opacity duration-300 ${
          showAfter ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        After
      </span>
    </div>
  );
};

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
  ];

  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();

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

  const testimonials = [
    {
      text:
        "“I was hesitant about investing in a bespoke piece online, but the lace melt is so utterly invisible my own dermatologist couldn't tell where it started. It has transformed my morning routine.”",
      name: "ALADE M.",
      location: "LAGOS, NIGERIA",
    },
    {
      text:
        "“The raw hair quality is unlike anything from commercial boutiques. It behaves identically to my natural hair, responds beautifully to low heat, and smells like pure clean salon care.”",
      name: "VICTORIA K.",
      location: "OGUN, USA",
    },
  ];
  const journalPosts = [
    {
      category: "RITUAL",
      readTime: "5 MIN READ",
      title: "The Art of Effortless Hair",
      description:
        "Why the world's most stylish women are moving away from daily heat tools toward precision-constructed atelier units.",
      image: assets.wig1,
    },
    {
      category: "GUIDE",
      readTime: "7 MIN READ",
      title: "How to Choose Your Perfect Wig",
      description:
        "From skin undertone harmonization to density balancing: our master coiffuers demystify finding your ideal blueprint.",
      image: assets.wig2,
    },
    {
      category: "ARCHITECTURE",
      readTime: "4 MIN READ",
      title: "Closure vs. Frontal: Finding Your Fit",
      description:
        "A technical guide to understanding structural ear-to-ear lace coverage versus compact low-maintenance daily wear.",
      image: assets.wig3,
    },
  ];
  return (
    <>
      <section className="relative min-h-[680px] overflow-hidden bg-dark">
        <img
          src={assets.woman}
          alt="Pheeky Hair Place Model"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24 lg:px-10">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex :items-center rounded-full border border-primary bg-black/30 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-[12px] italic lg:text-[13px] font-medium uppercase tracking-[0.18em] text-light">
                PHEEKY HAIR PLACE
              </span>
            </div>

            <h1 className="font-serif italic text-5xl leading-[1.05] text-light sm:text-6xl lg:text-[64px]">
              Beautiful Hair.
              <br />
              <span className="italic font-light text-primary">
                Beautifully You.
              </span>
            </h1>

            <p className="mt-6 max-w-[500px] italic text-[15px] lg:text-sm leading-6 text-light sm:text-[15px]">
              At PHEEKY HAIR PLACE, we bring together premium human hair wigs
              and exceptional hairstyling to create effortlessly beautiful looks
              designed around you.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center justify-center rounded-xl border-1 border-primary px-7 py-3 text-[10px] uppercase tracking-[0.16em] text-light font-semibold transition-all duration-300 hover:bg-[#E2C45C]">
                Shop Wigs
              </button>

              <button className="inline-flex items-center justify-center border border-white/20 bg-white/10 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black rounded-xl">
                Book a Session
              </button>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary">
                  <span className="text-xs text-secondary">
                    <PiStarFourBold />
                  </span>
                </div>

                <div>
                  <h3 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-light">
                    Premium Hair
                  </h3>
                  <p className="mt-1 text-[10px] text-white/70">
                    Quality Human Hair Wigs
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary">
                  <span className="text-xs text-secondary">
                    <PiHairDryer />
                  </span>
                </div>

                <div>
                  <h3 className="text-[9px] font-semibold uppercase tracking-[0.15em] text-light">
                    Expert Styling
                  </h3>
                  <p className="mt-1 text-[10px] text-white/70">
                    Looks Crafted Just For You
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary">
                  <span className="text-xs text-secondary">
                    <GiOppositeHearts />
                  </span>
                </div>

                <div>
                  <h3 className="text-[9px]  font-semibold uppercase tracking-[0.15em] text-light">
                    Personal Care
                  </h3>
                  <p className="mt-1 text-[10px] text-white/70">
                    A Luxury Experience For You
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF8F4] px-6 py-16 md:px-8 md:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mt-2 font-serif text-3xl leading-none md:text-4xl lg:text-5xl  italic font-light text-primary">
                LUXURY HAIR COLLECTION
              </h2>
              <p className="mt-3 max-w-md text-sm text-dark">
                Discover our latest wigs and signature styles, carefully
                selected to elevate your look and make every moment feel
                effortlessly beautiful
              </p>
            </div>

            <button
              onClick={() => navigate("/wigcollections")}
              className="group inline-flex items-center gap-2 self-start pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#211912] transition-colors hover:text-primary md:self-auto"
            >
              <span>View all new arrivals</span>
              <IoIosArrowRoundForward className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-3 scroll-smooth scrollbar-none md:mt-12 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
            {wigs.map((wig) => (
              <div
                key={wig.id}
                className="group relative min-w-[82%] snap-start bg-white rounded p-2 lg:p-1.5 transition-all duration-300 hover:-translate-y-1 sm:min-w-[54%] md:min-w-[40%] lg:min-w-0"
              >
                <div className="relative overflow-hidden bg-[#f0e3d8]">
                  <img
                    src={wig.image}
                    alt={wig.name}
                    className="h-90 w-full object-cover transition duration-700 rounded  group-hover:scale-105 lg:h-100"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const product = products.find(
                        (item) => item.id === wig.id,
                      );
                      if (product) toggleWishlist(product);
                    }}
                    aria-label={`Add ${wig.name} to wishlist`}
                    className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 transition-colors hover:bg-primary hover:text-white ${
                      isInWishlist(wig.id) ? "text-primary" : "text-[#6f5b50]"
                    }`}
                  >
                    <FiHeart className="text-sm" />
                  </button>
                  <span className="absolute bottom-2 left-2 bg-white px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#57473e] rounded">
                    {wig.type === "100% Human Hair"
                      ? '24" · Bone Straight'
                      : '22" · Loose Wave'}
                  </span>
                </div>

                <div className="px-2.5 pb-3 pt-3">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#a28673]">
                    Virgin hair collection
                  </p>
                  <h3 className="mt-1 font-serif text-lg leading-tight text-[#211912]">
                    {wig.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF1EA] px-6 py-20 md:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
          {/* Left Content */}
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="text-xl italic  font-medium uppercase tracking-[0.3em] text-primary">
                The Pheeky Experience
              </span>
            </div>

            <h2 className="max-w-xl  italic text-4xl leading-[1.1] text-[#211912] sm:text-5xl lg:text-6xl">
              Your Hair.
              <br />
              <span className="italic font-light text-primary">
                Your Transformation.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-dark md:text-base">
              Experience personalized hair care and styling designed to bring
              out your beauty, confidence, and signature style.
            </p>

            <div className="mt-10 space-y-6 md:mt-12">
              {services.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-4 border-b border-[#211912]/10 pb-6"
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/40">
                    <FiCheckCircle className="text-sm text-[#C9A227]" />
                  </div>

                  <div>
                    <h4 className="font-serif text-xl text-dark md:text-2xl">
                      {item.title}
                    </h4>

                    <p className="mt-1 max-w-md text-sm leading-5 text-[#211912] md:text-[15px]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:pl-8">
            <div className="relative overflow-hidden rounded-[2px]">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
                alt="Pheeky Hair Place salon experience"
                className="h-[450px] w-full object-cover lg:h-[550px] rounded"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-8 left-6 flex h-32 w-32 flex-col items-center justify-center  bg-dark/80 rounded-bl-xl rounded-tr-xl border-2 border-light shadow-2xl md:left-0 md:h-40 md:w-40">
              <span className="font-serif text-4xl text-[#E8C98A] md:text-5xl">
                15
              </span>

              <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-light">
                Years
              </span>

              <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-light">
                Of Excellence
              </span>
            </div>

            {/* Decorative Element */}
            {/* <div className="absolute -right-3 -top-3 h-20 w-20 border border-[#C9A227]/40 md:-right-5 md:-top-5 md:h-28 md:w-28" /> */}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-serif italic text-4xl  leading-none text-[#211912] md:text-5xl lg:text-6xl">
              BEAUTY IN THE DETAILS
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-xs leading-5 text-dark md:text-sm">
              The four hallmarks that make every Pheeky Hair Place experience
              beautifully different.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="bg-light p-6 md:p-7">
              <span className="text-[15px] text-primary">I</span>

              <h3 className="mt-5 font-serif italic text-[24px] uppercase text-black">
                Quality
              </h3>

              <p className="mt-2 text-[14px] lg:text-[12px] leading-5 text-dark">
                Premium human hair carefully selected for softness, natural
                movement, and lasting beauty.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-light p-6 md:p-7">
              <span className="text-[15px] text-primary">II</span>

              <h3 className="mt-5 font-serif italic text-[24px] uppercase text-dark">
                Craft
              </h3>

              <p className="mt-2text-[14px] lg:text-[12px] leading-5 text-dark">
                Expertly customized wigs and styling created with precision,
                attention to detail, and artistry.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-light p-6 md:p-7">
              <span className="text-[15px] text-primary">III</span>

              <h3 className="mt-5 font-serif italic text-[24px] uppercase text-dark">
                Confidence
              </h3>

              <p className="mt-2 text-[14px] lg:text-[12px] leading-5 text-dark">
                Every look is designed to complement your beauty and leave you
                feeling confident, elegant, and completely yourself.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-light p-6 md:p-7">
              <span className="text-[15px] text-primary">IV</span>

              <h3 className="mt-5 font-serif italic text-[24px] uppercase text-dark">
                Experience
              </h3>

              <p className="mt-2 text-[14px] lg:text-[12px] leading-5 text-dark">
                From your first consultation to your final look, enjoy a
                personalized experience created with care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-20 px-6 lg:px-12 md:px-8 ">
        <div className="mx-auto">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[5px] text-primary lg:text-4xl text-2xl italic font-semibold">
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

      <section className="bg-[#FAF1EA] px-6 py-16 md:px-10 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-end justify-between md:mb-14">
            <div>
              <h2 className="font-serif italic text-center text-4xl font-normal uppercase tracking-[-0.03em] text-primary md:text-5xl lg:text-[52px]">
                From the Journal
              </h2>
            </div>

            <a
              href="#journal"
              className="hidden border-b border-[#9A8A80] pb-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#17202A] transition-opacity hover:opacity-60 sm:block"
            >
              Read All Entries
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-5 lg:gap-6">
            {journalPosts.map((post, index) => (
              <article key={index} className="group cursor-pointer">
                <div className="mb-3 aspect-[1.65/1] overflow-hidden bg-[#EEE2D8]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-100 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="mb-2 flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.08em] text-dark">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="max-w-[360px] font-serif text-[18px] leading-[1.15] text-dark transition-opacity duration-300 group-hover:opacity-60 md:text-[17px] lg:text-[18px]">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-[390px] text-[12px] leading-[1.65] text-dark md:text-[8px] lg:text-[9px]">
                  {post.description}
                </p>
              </article>
            ))}
          </div>

          {/* Mobile link */}
          <div className="mt-10 sm:hidden">
            <a
              href="#journal"
              className="border-b border-[#9A8A80] pb-1 text-[9px] uppercase tracking-[0.12em] text-[#17202A]"
            >
              Read All Entries
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 md:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="bg-[#fdf0e7] px-5 py-5 md:px-6 md:py-5"
            >
              <div className="mb-2.5 flex gap-0.5 text-[10px] text-primary">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="max-w-[570px] font-serif i text-[14px] italic leading-[1.5] text-dark md:text-[15px]">
                {testimonial.text}
              </p>

              {/* Customer */}
              <div className="mt-3">
                <p className="font-sans text-[13px] font-semibold uppercase tracking-[1.5px] text-dark">
                  {testimonial.name} — {testimonial.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
