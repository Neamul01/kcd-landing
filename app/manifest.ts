import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KCD Dhaka",
    short_name: "KCD Dhaka",
    description: "KCD Dhaka",
    start_url: "/",
    display: "standalone",
    background_color: "#da532c",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
