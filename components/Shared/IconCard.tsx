import Image from "next/image";
import React from "react";

type Sponsor = {
  id: string;
  name: string;
  icon: string;
};

export default function IconCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="w-[280px] h-[160px] p-5 rounded-lg bg-white border-4 border-gray-300 flex items-center justify-center">
      <Image src={sponsor.icon} alt="sponsors" height={111} width={240} />
    </div>
  );
}
