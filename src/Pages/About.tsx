import { BsStars } from "react-icons/bs";
import assets from "../assets/assets";

const About = () => {
  const milestones = [
    {
      year: "2020",
      title: "Certified Hair Specialist",
      description:
        "Completed advanced luxury wig installation and customization training.",
    },
    {
      year: "2022",
      title: "Bridal Beauty Expert",
      description:
        "Recognized for premium bridal styling and flawless luxury installations.",
    },
    {
      year: "2024",
      title: "Pheeky Hair Place",
      description:
        "Established a luxury beauty brand dedicated to confidence, elegance and artistry.",
    },
  ];

  const artists = [
    {
      name: "Alade",
      role: "LEAD COLOR SPECIALIST",
      image: assets.woman,
    },
    {
      name: "Alade",
      role: "MASTER CUTTER",
      image: assets.woman,
    },
    {
      name: "Alade",
      role: "EDITORIAL & COUTURE STYLIST",
      image: assets.woman,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${assets.woman})`,
          }}
        />
        {/* <div className="absolute inset-0 bg-black/50" /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

        <div className="relative z-10 flex min-h-[540px] items-center justify-center px-6 py-20 md:min-h-[600px]">
          <div className="mx-auto max-w-3xl text-center text-white">
            <p className="mb-5 text-[15px] uppercase tracking-[0.35em] text-primary">
              The Pheeky Philosophy
            </p>

            <h2 className="text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
              Our Philosophy
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-4 text-white md:text-base md:leading-8">
              At Pheeky Hair Place, we believe every hairstyle should reflect
              your personality and confidence. Through exceptional
              craftsmanship, premium products, and personalized care, we create
              beautiful, lasting looks that make every visit a luxurious and
              memorable experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-light py-14 md:py-20">
        <div className=" mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-light shadow rounded-lg p-8 md:p-10 flex flex-col justify-center min-h-[260px]">
              <div className="mb-5 text-primary text-xl">
                <BsStars />
              </div>

              <h2 className="text-2xl md:text-[25px] text-primary mb-4">
                Our Mission
              </h2>

              <p className="max-w-xl text-[11px] md:text-xs leading-6 text-dark">
                To redefine the standard of luxury hair care by providing an
                unparalleled sensory experience rooted in craftsmanship,
                sustainability, and the relentless pursuit of aesthetic
                perfection. We curate confidence through bespoke artistry.
              </p>
            </div>

            <div className="lg:col-span-2 h-[260px] overflow-hidden rounded-lg">
              <img
                src={assets.woman}
                alt="Luxury hair"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
            <div className="lg:col-span-2 h-[225px] md:h-[260px] overflow-hidden rounded-lg">
              <img
                src={assets.woman}
                alt="Luxury hair care products"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-3 bg-dark rounded-lg px-8 md:px-10 py-10 md:py-12 flex flex-col justify-center min-h-[225px] md:min-h-[260px]">
              <h2 className="text-2xl md:text-[25px] text-primary mb-3">
                Our Vision
              </h2>

              <p className="max-w-2xl text-[11px] md:text-xs leading-5 text-white">
                To become the global benchmark for luxury hair sanctuaries,
                where innovation meets tradition. We envision a future where
                hair care is not just a service, but a ritual of self-love and
                an essential expression of individual identity.
              </p>

              <div className="flex items-center gap-3 mt-6">
                <span className="text-[8px] tracking-[0.25em] text-primary uppercase">
                  Looking Toward 2030
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-24">
        <div className="lg:px-14 px-6">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-full h-full border border-primary rounded-xl" />

              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={assets.wig1}
                  alt="Founder"
                  className="h-[450px] w-full object-cover transition duration-700 hover:scale-110"
                />
              </div>
            </div>

            <div>
              <span className="uppercase tracking-[0.35em] text-xs text-primary">
                Founder & Creative Director
              </span>

              <h2 className="mt-3 text-6xl leading-none">Meet Pheeky</h2>

              <p className="mt-8 text-dark leading-6">
                Every hairstyle begins with a vision. My mission has always been
                to help women feel beautiful, confident and effortlessly elegant
                through exceptional craftsmanship and personalized luxury hair
                services.
              </p>

              <p className="mt-6 text-dark leading-6">
                From flawless wig installations to bridal transformations, every
                client receives a premium experience tailored to their
                individual beauty and lifestyle.
              </p>

              <div className="grid grid-cols-2 gap-10 mt-12 pt-4 border-t border-gray-400">
                <div>
                  <h3 className="text-4xl text-primary font-light">5+</h3>
                  <p className="uppercase text-xs tracking-[0.25em] mt-2 text-dark">
                    Years Experience
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl text-primary font-light">500+</h3>
                  <p className="uppercase text-xs tracking-[0.25em] mt-2 text-dark">
                    Happy Clients
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32 text-center">
            <span className="uppercase tracking-[0.35em] text-xl text-primary">
              Journey
            </span>

            <h2
              className="mt-3 text-xl md:text-3xl lg:text-4xl"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Artistry Recognized
            </h2>

            <div className="relative max-w-4xl mx-auto mt-20">
              <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300 -translate-x-1/2"></div>

              {milestones.map((item, index) => (
                <div
                  key={index}
                  className={`relative mb-16 flex items-center ${
                    index % 2 === 0
                      ? "justify-start text-right"
                      : "justify-end text-left"
                  }`}
                >
                  <div className="w-[45%]">
                    <p className="text-primary text-sm uppercase tracking-[0.2em]">
                      {item.year}
                    </p>

                    <h3
                      className="mt-2 text-2xl"
                      style={{ fontFamily: "Cormorant Garamond, serif" }}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-3 text-gray-600 leading-7 text-sm">
                      {item.description}
                    </p>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black border-4 border-light flex items-center justify-center">
                    <BsStars className="text-primary text-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="px-6 md:px-8 lg:px-10">
          <div>
            <div className="flex justify-center items-center flex-col text-center ">
              <h2
                className="lg:text-4xl  leading-none text-black md:text-3xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                The Collective
              </h2>

              <p className="mt-4 max-w-md text-xs leading-5 text-gray-700 md:text-sm">
                Meet the artisans who define our aesthetic. A hand-picked group
                of specialists dedicated to their craft.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {artists.map((artist) => (
              <div key={artist.name} className="group">
                <div className="relative aspect-[0.82] overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="
                    h-full
                    w-full
                    object-cover
                    grayscale
                    transition-all
                    duration-700
                    ease-out
                    group-hover:scale-105
                    group-hover:grayscale-0
                  "
                  />
                </div>

                <div className="mt-4">
                  <h3
                    className="text-xl leading-none text-dark"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}
                  >
                    {artist.name}
                  </h3>

                  <p className="mt-2 text-[12px] tracking-[0.08em] text-primary uppercase">
                    {artist.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
