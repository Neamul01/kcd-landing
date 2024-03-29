import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Error() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-4 mb-8">
      <Image src={"/error.jpg"} alt="not found" width={700} height={700} />
      <div className="px-5 py-2 items-center justify-center bg-primary text-white rounded-lg">
        <Link href={"/"}>Go to Home</Link>
      </div>
    </div>
  );
}
