/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <-- এই লাইনটি যোগ করুন

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
};

module.exports = nextConfig;
