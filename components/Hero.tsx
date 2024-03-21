import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="bg-[url('/b5.jpg')] bg-cover bg-no-repeat bg-center h-[1000px] -mt-[125px] ">
      <div className="h-full bg-gradient-to-t from-black/75 to-black/70 flex items-center justify-start px-2">
        <div className="w-sectionLayout mx-auto">
          <div className="flex flex-col mb-8">
            <h2 className="text-[65px] text-secondary font-semibold ">
              Dhaka Welcomes the Future of Tech KCD 2024!
            </h2>
            <p className="font-semibold text-[25px] text-white">
              11th May, Brac Centre Inn.
            </p>
          </div>
          {/* <p className="text-[35px] uppercase font-semibold text-secondary ">
            TODAY..
          </p> */}
          <Link
            href={"#buy-ticket"}
            className="text-white bg-primary px-8 py-4 rounded-lg mt-16"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
