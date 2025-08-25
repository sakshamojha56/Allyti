/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Experimental features
  experimental: {
    appDir: true,
    serverActions: true,
  },

  // Image domains for profile pictures, logos, etc.
  images: {
    domains: [
      'localhost',
      'allyti.com',
      'storage.googleapis.com',
      'gravatar.com',
      's3.amazonaws.com'
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    API_URL: process.env.API_URL || 'http://localhost:4000',
    WS_URL: process.env.WS_URL || 'ws://localhost:4000',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects for old URLs
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/auth/signin',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/auth/signup',
        permanent: true,
      },
    ];
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
};

module.exports = nextConfig;
