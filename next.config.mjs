/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Teljesítmény optimalizálások
  compress: true,
  
  // Image optimization (ha lesz kép)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Headers a caching-hez
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Production optimalizálások
  swcMinify: true,
};

export default nextConfig;
