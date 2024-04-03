"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Sponsor = {
  id: string;
  name: string;
  icon: string;
  link: string;
};

export default function IconCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Link
      href={sponsor.link}
      target="_blank"
      className="w-[280px] h-[160px] p-5 rounded-lg bg-white border-4 border-gray-300  hover:scale-105 transition-all overflow-hidden cursor-pointer"
    >
      <div className="w-[240px] h-[111px] flex items-center justify-center overflow-hidden">
        <Image
          src={sponsor.icon}
          alt={sponsor.name}
          width={240}
          height={111}
          style={{ objectFit: "contain" }}
          // fill={true}
          // className="w-[240px] h-[111px] "
          // sizes="(max-width: 240px)"
        />
      </div>
    </Link>
  );
}
