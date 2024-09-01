import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images6.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images4.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images7.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images3.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "picfiles.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images5.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "avatarfiles.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images3.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images6.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "picfiles.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "avatarfiles.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images7.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images4.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images8.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "images2.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "picfiles.alphacoders.com",
      },
      {
        protocol: "https",
        hostname: "shared.akamai.steamstatic.com",
      },
      {
        protocol: "https",
        hostname: "picfiles.alphacoders.com",
      },
    ],
  },
};

export default nextConfig;
