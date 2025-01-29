/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com", // Allow Cloudinary images
      },
      {
        protocol: "https",
        hostname: "**.freepik.com", // Allow Freepik images
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com", // Allow Unsplash images
      },
    ],
  },
};

export default nextConfig;
