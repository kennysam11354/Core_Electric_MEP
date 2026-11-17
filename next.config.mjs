import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  async redirects() {
    return [
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/projects", destination: "/#projects", permanent: true },
      { source: "/about-us", destination: "/#about", permanent: true },
      { source: "/get-a-quote", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
