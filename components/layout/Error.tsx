import Image from "next/image";
import React from "react";

export default function Error() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image src={"/error.jpg"} alt="not found" width={700} height={700} />
    </div>
  );
}
