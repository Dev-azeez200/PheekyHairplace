import assets from "../assets/assets";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { PiStarFourBold } from "react-icons/pi";

const Ourwork = () => {
  const services = [
    {
      number: "01",
      title: "Custom Wig Styling",
      description:
        "Every unit is thoughtfully shaped, customized, and styled to complement your features, lifestyle, and personal aesthetic.",
    },
    {
      number: "02",
      title: "Bridal & Event Hair",
      description:
        "Elegant, timeless styling created for weddings, celebrations, photoshoots, and unforgettable moments.",
    },
    {
      number: "03",
      title: "Expert Hair Installation",
      description:
        "Professional installations designed for a natural finish, secure fit, effortless movement, and lasting confidence.",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We begin by understanding your vision, preferences, hair needs, and the look you want to achieve.",
    },
    {
      number: "02",
      title: "Design & Preparation",
      description:
        "Your hair or wig is carefully prepared, customized, and shaped to create a seamless foundation.",
    },
    {
      number: "03",
      title: "Installation",
      description:
        "Our styling process focuses on precision, comfort, and a natural-looking finish that feels completely yours.",
    },
    {
      number: "04",
      title: "Final Styling",
      description:
        "We perfect every detail and finish your look with professional styling and aftercare guidance.",
    },
  ];

  const gallery = [assets.wig1, assets.wig2, assets.wig3, assets.woam];

  return (
    <>
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat text-white"
        style={{ backgroundImage: `url(${assets.woman})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
        <div className="relative px-6 py-24 md:py-32 lg:px-12 lg:py-40">
          <div className="flex justify-center items-center flex-col">
            <h1 className="mt-6 text-2xl leading-[0.95] md:text-4xl lg:text-5xl">
              Crafted with intention.
              <span className="text-primary">Styled for you.</span>
            </h1>

            <p className="mt-4 text-sm leading-6  text-light md:text-base max-w-2xl text-center">
              From beautifully customized wigs to refined installations and
              event-ready styling, every look we create is designed to make you
              feel confident, polished, and effortlessly beautiful.
            </p>

            <a
              href="#gallery"
              className="mt-10 inline-flex items-center gap-3 bg-primary  transition-all duration-300 text-white px-8 py-3 rounded-md font-medium shadow-lg"
            >
              Explore our work
              <FiArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#f6eee6] text-dark">
        <div className="mx-auto grid  items-center gap-10 px-6 py-12 lg:grid-cols-2 lg:gap-14 lg:px-10  lg:py-16">
          <div className="relative">
            <div className="overflow-hidden rounded-sm">
              <img
                src={assets.woman}
                alt="The Pheeky Experience"
                className="h-[420px] w-full object-cover md:h-[520px]"
              />
            </div>

            <div className="absolute left-5 top-5 bg-white px-4 py-2 rounded-xl">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-dark">
                In Atelier Process
              </p>
            </div>

            <div className="absolute -bottom-5 right-5 w-[190px] bg-white px-5 py-4 shadow-lg md:right-[-20px]">
              <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.2em] text-primary">
                Craft Metrics
              </p>

              <p className="text-[11px] leading-4 text-dark/75">
                4 Hours of Sculpting
                <br />
                Zero tension, 12h humidity barrier lock.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:pl-4">
            <p className="mb-3 text-[12px] uppercase tracking-[0.35em] text-primary">
              The Transformation
            </p>

            <h2 className="font-serif  italic text-5xl leading-[0.95] text-dark md:text-6xl">
              From vision
              <br />
              <span className="italic text-primary">to finished look.</span>
            </h2>

            <div className="mt-8 border-l border-primary pl-5">
              <p className="max-w-lg font-serif text-sm italic leading-6 text-dark/75 md:text-base">
                “Every style begins with understanding what the client wants and
                ends with a look that feels confident, effortless, and uniquely
                theirs.”
              </p>
            </div>

            <div className="mt-7 bg-white/60 px-6 py-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-primary">
                  <PiStarFourBold />
                </span>

                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-dark/60">
                  Case Study: Amara
                </p>
              </div>

              <p className="text-xs leading-5 text-dark/65 md:text-sm">
                Amara’s Wedding Day Transformation — 4 hours of bespoke natural
                hair sculpting, custom pearl vine integration, delicate veil
                anchoring, and all-weather humidity seal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className=" px-6 lg:px-12">
          <div className="flex justify-center items-center flex-col mb-6">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              Signature Services
            </p>

            <h2 className="mt-2 text-2xl leading-tight md:text-3xl lg:text-5xl">
              Where artistry meets expertise.
            </h2>
          </div>

          <div className="divide-y divide-dark/10 border-y border-dark/10">
            {services.map((service) => (
              <div
                key={service.number}
                className="group grid gap-6 py-10 md:grid-cols-[100px_1fr_1fr] md:items-center md:py-12"
              >
                <span className="text-sm tracking-[0.2em] text-primary">
                  {service.number}
                </span>

                <h3 className="text-3xl transition duration-300 group-hover:text-primary md:text-4xl">
                  {service.title}
                </h3>

                <p className="max-w-lg text-sm leading-5 text-dark">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              light
              <p className="text-xs uppercase tracking-[0.35em] text-primary">
                Our Process
              </p>
              <h2 className="mt-4 text-2xl leading-tight md:text-3xl lg:text-5xl">
                From vision to your signature look.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-6 text-dark">
                A thoughtful process allows us to create a result that looks
                beautiful, feels comfortable, and reflects exactly who you are.
              </p>
            </div>

            <div className="space-y-0">
              {process.map((step, index) => (
                <div
                  key={step.number}
                  className="relative flex gap-6 border-b border-[#2D2420]/10 py-8 first:pt-0 last:border-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary text-xs text-primary">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="text-xl font-medium">{step.title}</h3>

                    <p className="mt-2 max-w-xl text-sm leading-7 text-dark">
                      {step.description}
                    </p>
                  </div>

                  {index !== process.length - 1 && (
                    <div className="absolute left-5 top-20 hidden h-8 w-px bg-dark/10 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-secondary py-20 md:py-28">
        <div className=" px-6 lg:px-12">
          <div className="flex flex-col lg:justify-center lg:items-center lg:flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex justify-center items-center flex-col">
              <p className="text-xs uppercase tracking-[0.35em] text-primary">
                Selected Work
              </p>

              <h2 className="mt-4 text-xl leading-tight md:text-5xl lg:text-4xl">
                A closer look at our craft.
              </h2>
            </div>

            <p className="text-sm leading-5 text-dark">
              A collection of transformations created with precision,
              creativity, and a love for beautiful hair.
            </p>
          </div>

          <div className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px] mt-10">
            {gallery.map((src, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden ${
                  index === 0
                    ? "sm:row-span-2 lg:col-span-2 lg:row-span-2"
                    : index === 1
                    ? "lg:col-span-1 lg:row-span-2"
                    : ""
                }`}
              >
                <img
                  src={src}
                  alt={`Pheeky Hair Place transformation ${index + 1}`}
                  className="h-full w-full object-cover rounded-xl transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="absolute bottom-5 left-5 translate-y-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs uppercase tracking-[0.25em] text-white">
                    Signature Work
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-light py-24 md:py-32">
        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full border border-[#2D2420]/5" />
        <div className="pointer-events-none absolute -right-10 top-20 h-44 w-44 rounded-full border border-[#2D2420]/5" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
            {/* Left */}
            <div>
              <div className="flex items-center gap-4">
                <p className="text-[15px] font-medium uppercase tracking-[0.35em] text-primary">
                  Our Standard
                </p>
              </div>

              <h2
                className="mt-6 max-w-xl text-4xl leading-[1.05] text-dark sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Luxury is a feeling we create through{" "}
                <span className="italic text-primary">every detail.</span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-6 text-dark md:text-base">
                From the first consultation to the final touch, every experience
                is thoughtfully designed to make you feel confident,
                comfortable, and beautifully cared for.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Personalized Consultation",
                  text:
                    "A tailored approach designed around your individual style and needs.",
                },
                {
                  number: "02",
                  title: "Professional Installation",
                  text:
                    "Expert techniques and careful execution for a flawless finish.",
                },
                {
                  number: "03",
                  title: "Attention to Detail",
                  text:
                    "Every element is refined with care to create an exceptional result.",
                },
                {
                  number: "04",
                  title: "Premium Styling",
                  text:
                    "Beautiful finishing touches that complete your look with confidence.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="group border border-primary rounded-xl bg-light p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_40px_rgba(45,36,32,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xl tracking-[0.2em] text-[#C9A227]">
                      {item.number}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full b text-[#2D2420] transition-all duration-300  group-hover:bg-primary group-hover:text-white">
                      <FiCheck size={14} />
                    </div>
                  </div>

                  <h3
                    className="mt-8 text-xl text-dark"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-dark">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ourwork;
