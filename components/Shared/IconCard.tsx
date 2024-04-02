import Image from "next/image";
import React from "react";

type Sponsor = {
  id: string;
  name: string;
  icon: string;
};

export default function IconCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="w-[280px] h-[160px] p-5 rounded-lg bg-white border-4 border-gray-300">
      <div className="w-[240px] h-[111px] flex items-center justify-center overflow-hidden ">
        <Image
          src={sponsor.icon}
          alt="sponsors"
          width={240}
          height={111}
          style={{ objectFit: "contain" }}
          // fill={true}
          // className="w-[240px] h-[111px] "
          // sizes="(max-width: 240px)"
        />
      </div>
    </div>
  );
}
