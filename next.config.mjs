/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/sol" : "",
};

export default nextConfig;
