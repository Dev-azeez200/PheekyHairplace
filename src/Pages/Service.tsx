import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import assets from "../assets/assets";
import { FiCheckCircle } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import BookServiceModal from "./Modals/BookServiceModal";
import { useNailServices } from "../data/services";

const installationServices = [
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

const Services = () => {
  const nailServices = useNailServices();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>();

  const openBooking = (service: string) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-accent">
        <img
          src={assets.woman}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#241E1A]/75 via-[#241E1A]/30 to-[#241E1A]/60 md:hidden" />
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div className="relative z-10 max-w-2xl">
            <span className="mb-4 inline-flex items-center rounded-full border border-primary px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-light backdrop-blur-sm">
              Our Services
            </span>

            <h2 className="font-serif text-[48px] italic leading-[0.98] tracking-[-0.03em] text-light sm:text-[58px] md:text-[64px] lg:text-[68px] lg:text-white">
              YOUR HAIR.
              <br />
              <span className="italic font-light">YOUR STYLE.</span>
              <br />
              <span className="font-serif italic text-primary">
                YOUR MOMENT.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-[15px] leading-5 text-light md:text-[14px] lg:text-white">
              From everyday elegance to statement looks, our hairstyling
              services are designed around your individuality, style and
              occasion. Tailored across intimate private suites in Lagos and
              London.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-7">
              <button
                type="button"
                onClick={() => openBooking("Hair Styling")}
                className="inline-flex items-center justify-center rounded-xl border border-primary px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-light transition-all duration-300 hover:bg-[#E2C45C]"
              >
                Book an appointment
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-[#DED3CA] pt-7 sm:gap-12">
              <div>
                <h3 className="font-serif text-2xl text-light">4.5k+</h3>
                <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-light">
                  Crowns perfected
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-white">100%</h3>
                <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-white">
                  Scalp gentle
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-white">2 Suites</h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white">
                  Lagos & London
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[470px] md:block lg:ml-auto">
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={assets.woman}
                alt="Luxury hairstyling"
                className="h-[420px] w-full object-cover md:h-[500px]"
              />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#F8F1EB]/95 px-4 py-4 backdrop-blur-sm">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8B6B43]">
                    Atelier care
                  </p>
                  <p className="mt-1 font-serif text-sm text-[#302822]">
                    Your signature style, perfected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFF8F4] py-24">
        <div className="lg:px-10 px-6">
          <div className="">
            <h3 className="text-3xl italic">Hair Installation</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            {installationServices.map((service) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded bg-white p-2 transition-all duration-300 hover:-translate-y-1 lg:p-1.5"
              >
                <div className="relative overflow-hidden bg-[#f0e3d8]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-90 w-full rounded object-cover transition duration-700 ease-out group-hover:scale-105 lg:h-100"
                  />
                </div>

                <div className="px-2.5 pb-3 pt-3">
                  <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#a28673]">
                    {service.category}
                  </span>

                  <h3 className="mt-1 font-serif text-lg leading-tight text-[#211912]">
                    {service.title}
                  </h3>

                  <div className="mt-4 flex justify-between gap-3 border-t border-[#211912]/10 pt-3">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#a28673]">
                        Investment
                      </p>

                      <p className="mt-1 flex items-center text-sm font-semibold text-[#211912]">
                        <TbCurrencyNaira />
                        {service.price}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#a28673]">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#211912]">
                        {service.duration}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBooking(service.title)}
                    className="mt-5 inline-flex h-11 w-full items-center justify-center gap-3 rounded-md bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-light shadow-lg transition-all duration-300 hover:bg-secondary hover:text-accent"
                  >
                    Book Now
                    <FiArrowRight />
                  </button>
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

              <button
                type="button"
                onClick={() =>
                  openBooking("Full Wig Construction & Customization")
                }
                className="w-full h-12  text-light uppercase tracking-[0.2em] text-xs  hover:text-accent justify-center mt-10 inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 t px-8 py-3 rounded-md font-medium shadow-lg"
              >
                Request Custom Order
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary px-6 py-20 md:px-8 lg:px-10">
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

                  <button
                    type="button"
                    onClick={() => openBooking(service.name)}
                    className="w-full h-12  text-light uppercase tracking-[0.2em] text-xs  hover:text-accent justify-center mt-10 inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 t px-8 py-3 rounded-md font-medium shadow-lg"
                  >
                    Book Service
                  </button>
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
                className="text-2xl lg:text-4xl md:text-3xl leading-tight"
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

                <button
                  type="button"
                  onClick={() => openBooking("Bridal Styling Package")}
                  className="w-full h-12  text-light uppercase tracking-[0.2em] text-xs  hover:text-accent justify-center mt-10 inline-flex items-center gap-3 bg-primary hover:bg-secondary transition-all duration-300 t px-8 py-3 rounded-md font-medium shadow-lg"
                >
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

      <BookServiceModal
        isOpen={isBookingOpen}
        initialService={selectedService}
        onClose={() => setIsBookingOpen(false)}
        onSubmit={() => undefined}
      />
    </>
  );
};

export default Services;
