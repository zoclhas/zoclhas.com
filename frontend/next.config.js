/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "http://localhost:3001",
      "http://localhost:3010",
      "https://zoclhas.com",
      "http://payload.zoclhas.com",
    ],
  },
};

module.exports = nextConfig;
