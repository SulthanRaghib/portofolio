import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow loading images from Cloudinary used by the backend
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
