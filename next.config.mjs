/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bracinn.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
