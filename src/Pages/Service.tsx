import { FiArrowRight } from "react-icons/fi";
import assets from "../assets/assets";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";

const services = [
  {
    image: assets.wig1,
    category: "Hair Installation",
    title: "Lace Frontal Install",
    price: "25,000",
    duration: "180 mins",
  },
  {
    image: assets.wig2,
    category: "Salon Experience",
    title: "Traditional Sew-In",

    price: "18,000",
    duration: "150 mins",
  },
  {
    image: assets.wig3,
    category: "Wig Services",
    title: "Closure Install",
    price: "20,000",
    duration: "120 mins",
  },
];

const nailServices = [
  {
    id: 1,
    name: "Manicure",
    image: assets.Manicure,
    description:
      "A complete nail care treatment to keep your hands and nails clean, healthy, and beautifully polished.",
  },
  {
    id: 2,
    name: "Pedicure",
    image: assets.Pedicure,
    description:
      "A complete foot care treatment to keep your feet and toenails clean, healthy, refreshed, and beautifully polished.",
  },
  {
    id: 3,
    name: "Classic Nail Care",
    image: assets.nails3,
    description:
      "A complete nail care treatment to keep your nails clean, healthy, neatly shaped, and beautifully polished.",
  },

  {
    id: 4,
    name: "Gel Pedicure",
    image: assets.nails2,
    description:
      "A relaxing pedicure finished with durable gel polish for a flawless, long-lasting look.",
  },
];

const Services = () => {
  return (
    <>
      <section className="flex h-[450px] items-center justify-center bg-accent px-6">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <span className="uppercase tracking-[0.35em] text-xs text-primary">
            The Menu
          </span>

          <h2 className="mt-3 text-5xl md:text-6xl leading-none">
            Artistry in Every Strand
          </h2>

          <p className="mt-5 max-w-2xl text-dark leading-8">
            Discover premium hair services tailored to your unique beauty. Every
            appointment is crafted with luxury, precision and attention to
            detail.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-24">
        <div className="lg:px-10 px-6">
          <div className="">
            <h3 className="text-3xl italic">Hair Installation</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden transition-all duration-500 group"
              >
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <span className="uppercase tracking-[0.25em] text-[11px] text-primary">
                    {service.category}
                  </span>

                  <h3 className="mt-2 text-3xl">{service.title}</h3>

                  <div className="border-t border-gray-200 mt-8 pt-5 flex justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-dark">
                        Investment
                      </p>

                      <p className="font-semibold mt-1 flex items-center">
                        <TbCurrencyNaira />
                        {service.price}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-dark">
                        Duration
                      </p>

                      <p className="font-semibold mt-1">{service.duration}</p>
                    </div>
                  </div>

                  <Link
                    to="/login"
                    className="w-full h-12 text-light uppercase tracking-[0.2em] text-xs hover:text-accent justify-center mt-10 inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 px-8 py-3 rounded-md font-medium shadow-lg"
                  >
                    Book Now
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-24">
        <div className="lg:px-10 px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl italic">Wig Customization</h2>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm grid lg:grid-cols-2">
            <div className="overflow-hidden">
              <img
                src={assets.woman}
                alt="Custom Wig"
                className="h-[350px] lg:h-full w-full object-cover transition duration-700 hover:scale-110"
              />
            </div>

            <div className="flex flex-col justify-center px-8 lg:px-14 py-10">
              <span className="uppercase tracking-[0.3em] text-[11px] text-primary font-medium">
                Premium Service
              </span>

              <h3 className="mt-3 text-4xl leading-tight">
                Full Wig Construction & Customization
              </h3>

              <p className="mt-6 text-gray-600 leading-8 max-w-md">
                Our signature service. We build your wig from scratch using
                premium bundles, followed by bleaching, plucking, styling and
                precision customization to perfectly match your desired look.
              </p>

              <div className="flex gap-16 mt-10">
                <div>
                  <p className="uppercase text-[10px] tracking-[0.25em] text-gray-400">
                    Price
                  </p>

                  <h4 className="mt-2 text-xl font-semibold flex items-center">
                    <TbCurrencyNaira />
                    150,000
                  </h4>
                </div>
              </div>

              <button className="w-full h-12  text-light uppercase tracking-[0.2em] text-xs  hover:text-accent justify-center mt-10 inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 t px-8 py-3 rounded-md font-medium shadow-lg">
                Request Custom Order
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light px-6 py-20 md:px-8 lg:px-10">
        <div>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#C9A227]">
              Our Services
            </span>
            primary
            <h2 className="mt-3 text-4xl leading-tight text-gray-black md:text-5xl lg:text-6xl">
              Nails & Beauty
            </h2>
            <p className="mt-5 text-sm leading-7 text-dark/60 md:text-base">
              Treat yourself to beautifully crafted nails and professional care
              designed to leave you feeling confident and refreshed.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {nailServices.map((service) => (
              <div
                key={service.id}
                className="group overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-50 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-black/0" /> */}
                </div>

                <div className="flex flex-col justify-between p-4">
                  <div>
                    <h3 className="text-2xl text-dark">{service.name}</h3>

                    <p className="mt-2 text-sm leading-4 text-dark">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    to={`/booking?service=${encodeURIComponent(service.name)}`}
                    className="w-full h-12  text-light uppercase tracking-[0.2em] text-xs  hover:text-accent justify-center mt-10 inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 t px-8 py-3 rounded-md font-medium shadow-lg"
                  >
                    Book Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-24">
        <div className="lg:px-10 px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl italic">Bridal Styling</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h3
                className="text-5xl leading-tight"
                // style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                The Bridal Experience
              </h3>

              <p className="mt-6 text-dark leading-7 max-w-lg">
                Your wedding deserves perfection. We create elegant bridal
                hairstyles and luxury wig installations that stay flawless from
                your first photograph to your last dance.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Full Bridal Consultation",
                  "Luxury Wig Installation",
                  "Veil & Accessory Styling",
                  "On-Location Service Available",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <FiCheckCircle className="text-[#C9A227]" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
                  Investment
                </p>

                <h4 className="mt-2 text-5xl flex items-center">
                  From <TbCurrencyNaira />
                  250,000
                </h4>

                <button className="w-full h-12  text-light uppercase tracking-[0.2em] text-xs  hover:text-accent justify-center mt-10 inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 t px-8 py-3 rounded-md font-medium shadow-lg">
                  Enquire Now
                  <FiArrowRight />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 h-[650px]">
              <div className="row-span-2 overflow-hidden rounded-xl">
                <img
                  src={assets.wig1}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 hover:scale-110"
                />
              </div>

              <div className="overflow-hidden rounded-xl">
                <img
                  src={assets.wig2}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 hover:scale-110"
                />
              </div>

              <div className="overflow-hidden rounded-xl">
                <img
                  src={assets.wig3}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 hover:scale-110"
                />
              </div>

              <div className="col-span-2 overflow-hidden rounded-xl h-[220px]">
                <img
                  src={assets.woam}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
