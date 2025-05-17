/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
  // Add proper error handling for API requests
  onError(err: Error) {
    console.warn('Next.js API error:', err);
  },
  // Configure allowed image domains
  images: {
    domains: ['framerusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
