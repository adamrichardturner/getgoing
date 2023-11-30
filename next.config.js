/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeFonts: true
  },
  fonts: {
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com']
  }
}

module.exports = nextConfig
