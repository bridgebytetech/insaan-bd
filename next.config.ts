// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     // ইমেজ লোড না হওয়ার মূল সমাধান এটি
//     unoptimized: true, 
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'api.insaanbd.org',
//         port: '',
//         pathname: '/uploads/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'ui-avatars.com',
//         pathname: '/api/**',
//       },
//       // লোকাল হোস্টের জন্য (যদি প্রয়োজন হয়)
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '8080',
//         pathname: '/uploads/**',
//       },
//     ],
//   },
//   env: {
//     // ডিফল্ট হিসেবে আপনার লাইভ এপিআই সেট করা হলো
//     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.insaanbd.org/api',
//   },
// };

// module.exports = nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.insaanbd.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8089',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;