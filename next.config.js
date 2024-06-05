/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    optimizeFonts: true,
  },
  fonts: {
    domains: ["fonts.googleapis.com", "fonts.gstatic.com"],
  },
}

module.exports = nextConfig
