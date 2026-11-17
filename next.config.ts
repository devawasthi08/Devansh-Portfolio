import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export' is only needed for GitHub Pages without Actions.
  // Vercel runs Next.js natively.
  ...(process.env.STATIC_EXPORT === "true" ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
