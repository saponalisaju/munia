/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'munia-qa-bucket.s3-website-eu-north-1.amazonaws.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
