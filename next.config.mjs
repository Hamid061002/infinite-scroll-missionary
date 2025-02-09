/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'seed.photo',
      port: '',
      pathname: '/cdn-cgi/**',
      search: '',
    },
    ],
  },
};

export default nextConfig;
