/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "amethyst-wrong-bobolink-547.mypinata.cloud",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "kriptolab-backend.vercel.app",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "indodax.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
