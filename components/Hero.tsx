import React from "react";

function Hero() {
  return (
    <div className="bg-[url('/b5.jpg')] bg-cover bg-no-repeat bg-center h-[1000px] -mt-[125px] ">
      <div className="h-full bg-gradient-to-t from-black/75 to-black/70 flex items-center justify-start">
        <div className="w-sectionLayout mx-auto">
          <div className="flex flex-col mb-8">
            <h2 className="text-[65px] text-secondary font-semibold ">
              KCD Kerala 2024
            </h2>
            <p className="font-semibold text-[25px] text-white">
              3rd Feb, Le Meridien Kochi
            </p>
          </div>
          <p className="text-[35px] uppercase font-semibold text-secondary ">
            TODAY..
          </p>
          <button className="text-white bg-primary px-8 py-4 rounded-lg mt-16">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
