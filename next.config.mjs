/** @type {import('next').NextConfig} */
const nextConfig = {
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
