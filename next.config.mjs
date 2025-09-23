/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Optional: Adjust if needed
  output: "standalone",

  images: {
    domains: ["res.cloudinary.com"], // Add the domain hosting your images
  },
};

export default nextConfig;
