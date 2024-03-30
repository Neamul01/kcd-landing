import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="bg-[url('/kcdbd_2024.webp')] bg-cover bg-no-repeat bg-center h-[1000px] -mt-[130px] ">
      <div className="h-full bg-gradient-to-t from-black/75 to-black/70 flex items-center justify-start px-2">
        <div className="w-sectionLayout mx-auto">
          <div className="flex flex-col mb-8 gap-9">
            <h2 className="text-[65px] text-secondary font-semibold leading-tight tracking-wide">
              Dhaka Welcomes the <br /> Future of Tech <br /> KCD 2024!
            </h2>
            <p className="font-semibold text-[25px] text-white">
              11th May, Brac Centre Inn.
            </p>
          </div>
          {/* <p className="text-[35px] uppercase font-semibold text-secondary ">
            TODAY..
          </p> */}
          <div className="mt-16">
            <Link
              href={"#buy-ticket"}
              className="text-white bg-primary px-8 py-4 rounded-lg "
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
