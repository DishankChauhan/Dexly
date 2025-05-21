/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
  // Add proper error handling for API requests
  onError(err: Error) {
    console.warn('Next.js API error:', err);
  },
  // Configure image handling
  images: {
    domains: ['framerusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/images/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Allow serving static images from public directory
  },
};

export default nextConfig;
