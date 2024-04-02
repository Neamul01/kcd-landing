"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaSlack, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      {pathname.includes("/dashboard") ? (
        ""
      ) : (
        <div className="bg-black text-white">
          <div className="max-w-sectionLayout mx-auto pt-12 pb-6 flex flex-col md:flex-row justify-between gap-8 px-2">
            <div className="flex flex-col items-center md:items-start justify-center max-w-full md:max-w-[40%]">
              <p className="font-bold border-b-[1px] border-gray-500 mb-4 pb-2">
                About us
              </p>
              <div className="flex flex-col gap-2 text-center md:text-left">
                <p className="text-white/80 text-sm">
                  Join us at KCD Dhaka on May 11th, 2024, for a day of
                  cutting-edge talks and networking. Whether you&apos;re a
                  developer, operations expert, or IT professional, this is your
                  chance to shape the future of cloud-native technology.
                </p>
                <p className="text-white/80 text-sm">
                  Supported by the CNCF, mark your calendars and let&apos;s
                  innovate together in Dhaka, Bangladesh!
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start max-w-full md:max-w-[30%] ">
              <p className="font-bold border-b-[1px] border-gray-500 mb-4 pb-2">
                Contact Us
              </p>
              <div className="flex flex-col items-center md:items-start gap-2 text-white/80 text-sm">
                <p className="font-semibold text-sm underline">
                  <a href="mailto:organizers@kcddhaka.org">
                    organizers@kcddhaka.org
                  </a>
                </p>
                <p className="text-sm underline">
                  <a href="tel:+8801713900465">+8801713900465</a>
                </p>
                <p className="text-center md:text-left">
                  13-23,Road-1, Janata Co. Operative Housing Society (5th
                  Floor), Ring Road, Adabor, Dhaka-1207
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start max-w-full md:max-w-[30%] ">
              <div className="flex flex-col gap-2 h-full justify-between">
                <div className="flex flex-col items-center md:items-start gap-2 text-white/80 text-sm">
                  {/* <p className="font-semibold text-sm text-white underline">
                    <a href="mailto:organizers@kcddhaka.org">Contact us</a>
                  </p> */}
                  <p className="text-sm underline mt-3 md:mt-9">
                    <Link href={"/conditions/refund-policy"}>
                      Refund policy
                    </Link>
                  </p>
                  <p className="text-sm underline">
                    <Link href={"/conditions/terms-condition"}>
                      Terms and Conditions
                    </Link>
                  </p>
                  <p className="text-sm underline">
                    <Link href={"/conditions/privacy-policy"}>
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/company/kcd-dhaka/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLinkedinIn
                      size={25}
                      className="text-[#007bff] hover:text-white"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/kcddhaka/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookF
                      size={25}
                      className="text-[#007bff] hover:text-white"
                    />
                  </a>
                  <a
                    href="https://twitter.com/i/flow/login?redirect_after_login=%2Fkcddhaka"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter
                      size={25}
                      className="text-[#007bff] hover:text-white"
                    />
                  </a>
                  <a
                    href="https://cloud-native.slack.com/?redir=%2Farchives%2FC06KC3Z9V16%3Fname%3DC06KC3Z9V16"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaSlack
                      size={25}
                      className="text-[#007bff] hover:text-white"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center pb-3 px-1">
            <Image
              src={"/payment-footer.png"}
              alt="payments"
              width={900}
              height={207}
            />
          </div>
          <div className="py-3">
            <p className="text-center text-sm text-white/60">
              &copy; 2024 All Rights Reserved &copy; KCD Dhaka
            </p>
          </div>
        </div>
      )}
    </>
  );
}
