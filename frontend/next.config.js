/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost:3001",
      },
      {
        hostname: "payload.zoclhas.com"
      }
    ]
  }
}

module.exports = nextConfig
