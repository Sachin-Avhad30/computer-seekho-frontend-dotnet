import React from "react";

import heroImage from "../../assets/hero.png";

const Hero = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-sky-50 overflow-hidden">
        <div className="flex items-center gap-6 whitespace-nowrap px-4 py-2 animate-scroll-text min-w-max">
          <span className="text-sm font-semibold">
            Admissions Open for PreCAT, 15 Days Crash Course for CDAC's C-CAT
            2026. Course starts from 15th December 2025. Available in Online &
            Offline mode. Contact us on 90294 35311.
          </span>

          <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 transition shrink-0">
            Register
          </button>
        </div>
      </div>

      {/* Centered Hero Image (60% width) */}
      <div className="w-full flex justify-center py-6">
        <img src={heroImage} alt="hero" className="w-[60%] object-contain" />
      </div>
    </div>
  );
};

export default Hero;
