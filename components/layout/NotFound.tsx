import Image from "next/image";
import React from "react";

export default function NotFound() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image src={"/not-found.jpg"} alt="not found" width={700} height={700} />
    </div>
  );
}
