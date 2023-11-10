/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3010",
      },
      {
        protocol: "https",
        hostname: "zoclhas.com",
      },
      {
        protocol: "https",
        hostname: "payload.zoclhas.com",
      },
    ],
  },
};

module.exports = nextConfig;
