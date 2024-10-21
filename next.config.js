/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com', 'another-domain.com'], // Add domains you expect images from
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // ... other configurations
}

module.exports = nextConfig
