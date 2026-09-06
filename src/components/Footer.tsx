import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-light-gray text-black bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Brand */}
          <div>
            <h2 className="text-5xl font-light leading-none">
              PHEEKY
              <br />
              HAIR PLACE
            </h2>

            <p className="mt-6 text-gray-600 leading-7 text-sm max-w-xs">
              Redefining beauty through luxury hair styling, premium wigs,
              flawless installations, and world-class craftsmanship.
            </p>

            <div className="flex items-center gap-5 mt-8 text-lg">
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <FaXTwitter />
              </a>

              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                <FiMail />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold">
              Collections
            </h3>

            <ul className="mt-6 space-y-4 text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition">
                  Luxury Wigs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Ready-to-Wear
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Hair Extensions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Hair Care
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold">
              Services
            </h3>

            <ul className="mt-6 space-y-4 text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition">
                  Wig Installation
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Bridal Styling
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Hair Treatment
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-black transition">
                  Consultations
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold">
              Visit Us
            </h3>

            <div className="mt-6 space-y-4 text-gray-600 leading-7">
              <p>
                Ogbomoso,
                <br />
                Oyo State, Nigeria
              </p>

              <p>+234 XXX XXX XXXX</p>

              <p>hello@pheekyhairplace.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 border-t border-gray-300 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 PHEEKY HAIR PLACE. BEAUTY IN EVERY STRAND.</p>

          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-black transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
