import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSlack,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-sectionLayout mx-auto py-12 flex flex-col md:flex-row justify-between gap-8 px-2">
        <div className="flex flex-col items-center md:items-start justify-center max-w-full md:max-w-[45%]">
          <p className="font-bold border-b-[1px] border-gray-500 mb-4 pb-2">
            About us
          </p>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-white/80 text-sm">
              Join us at KCD Dhaka on May 11th, 2024, for a day of cutting-edge
              talks and networking. Whether you&apos;re a developer, operations
              expert, or IT professional, this is your chance to shape the
              future of cloud-native technology.
            </p>
            <p className="text-white/80 text-sm">
              Supported by the CNCF, mark your calendars and let&apos;s innovate
              together in Dhaka, Bangladesh!
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start max-w-full md:max-w-[30%] ">
          <p className="font-bold border-b-[1px] border-gray-500 mb-4 pb-2">
            Connect with us
          </p>
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
              <FaSlack size={25} className="text-[#007bff] hover:text-white" />
            </a>
          </div>
        </div>
      </div>
      <div className="py-3">
        <p className="text-center text-sm text-white/60">
          &copy; 2024 All Rights Reserved &copy; KCD Dhaka
        </p>
      </div>
    </div>
  );
}
