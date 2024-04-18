"use client";

import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function Page() {
  const searchParams = useSearchParams();

  const content = searchParams.get("content");
  console.log("params", content);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content as string }}
      style={{ width: "100vw", height: "100vh", marginTop: 200 }}
    />
  );
}
