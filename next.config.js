/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'munia-qa-bucket.s3.eu-north-1.amazonaws.com',
        port: '',
      },
    ],
  },
  output: 'export',
};

module.exports = nextConfig;
