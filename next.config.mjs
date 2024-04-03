/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.kcddhaka.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "d2sycsl2hirrcd.cloudfront.net",
        port: "",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
