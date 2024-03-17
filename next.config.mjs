/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kcdkerala.in",
        port: "",
      },
    ],
  },
};

export default nextConfig;
