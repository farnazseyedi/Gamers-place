/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.rawg.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",
        pathname: "/**",
      },

      { hostname: "cdn.dummyjson.com", pathname: "/**" },
      { hostname: "dummyjson.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/dummy/:path*",
        destination: "https://dummyjson.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
