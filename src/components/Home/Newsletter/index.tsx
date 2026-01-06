import { useState } from "react";
import { getImagePrefix } from "../../../utils/util";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const isProd = process.env.NODE_ENV === "production";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <section className="relative py-20">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div
          className={`rounded-3xl overflow-hidden ${
            isProd ? "bg-newsletter-bg-2" : "bg-newsletter-bg"
          } bg-cover bg-center`}
        >
          {/* Glass Card */}
          <div className="backdrop-blur-xl bg-black/40 py-20 px-6 md:px-16 lg:px-32 text-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Newsletter
            </h3>

            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10">
              Subscribe to our newsletter for exclusive discounts, promotions,
              and the latest updates delivered straight to your inbox.
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto"
            >
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="
                    w-full py-5 pl-8 pr-24
                    text-base md:text-lg
                    rounded-full
                    text-black
                    focus:outline-none
                    focus:ring-4
                    focus:ring-indigo-400/50
                  "
                />

                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="
                    absolute right-2
                    flex items-center justify-center
                    h-14 w-14 md:h-16 md:w-16
                    rounded-full
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    hover:from-indigo-500 hover:to-purple-500
                    transition-all duration-300
                    shadow-lg hover:scale-105
                    focus:outline-none focus:ring-4 focus:ring-white/40
                  "
                >
                  <img
                    src={`${getImagePrefix()}images/newsletter/send.svg`}
                    alt="send"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </form>

            {/* Helper Text */}
            <p className="text-sm text-white/60 mt-6">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
