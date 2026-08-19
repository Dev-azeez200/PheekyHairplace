import { useState } from "react";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

import assets from "../assets/assets";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8f8f7] text-[#222]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden lg:block">
          <img
            src={assets.woman}
            alt="Luxury hair"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/25" />

          <div className="absolute bottom-12 left-12 z-10 text-white">
            <h1 className="font-serif text-5xl leading-[0.9] tracking-wide md:text-6xl">
              PHEEKY
              <br />
              HAIR PLACE
            </h1>

            <p className="mt-5 text-xs font-medium uppercase tracking-[0.35em]">
              Beautiful Hair, Beautiful You
            </p>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-[430px]">
            <div className="mb-8">
              <h2 className="font-serif text-3xl tracking-wide text-dark text-center">
                Welcome Back
              </h2>

              <p className="mt-2 text-[13px] text-dark text-center">
                Enter your credentials to access your luxury experience.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-medium text-gray-600"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="alade@.com"
                  className="h-10 w-full rounded-sm border-0 bg-white px-3 text-xs outline-none transition focus:border-black"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[12px] font-medium text-dark"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-10 w-full  border-0 rounded-sm bg-white px-3 pr-10 text-xs outline-none transition focus:border-black"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark transition hover:text-black"
                  >
                    {showPassword ? (
                      <FiEyeOff size={15} />
                    ) : (
                      <FiEye size={15} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-gray-300 accent-primary "
                  />

                  <span className="text-[12px] text-dark">Remember me</span>
                </label>

                <button
                  type="button"
                  className="text-[12px] font-medium text-dark transition hover:text-red-500"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="group flex h-11 w-full items-center justify-center  mt-10  gap-3 bg-primary hover:bg-secondary   px-8 py-3 rounded-md shadow-lg text-[11px] font-semibold tracking-[0.15em] text-white transition duration-300 "
              >
                SIGN IN
                <FiArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>

            <p className="mt-8 text-center text-[10px] text-dark">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-semibold text-black hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
