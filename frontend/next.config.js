/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "http://localhost:3001",
      "https://zoclhas.com",
      "http://payload.zoclhas.com",
    ],
  },
};

module.exports = nextConfig;
