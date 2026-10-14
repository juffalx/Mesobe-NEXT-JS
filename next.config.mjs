/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: '/orderCart', destination: '/cart', permanent: true },
      { source: '/delivery', destination: '/checkout', permanent: true },
      { source: '/Delibery', destination: '/checkout', permanent: true },
      { source: '/future', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
