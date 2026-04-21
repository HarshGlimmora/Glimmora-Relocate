import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // `typedRoutes` graduated to a top-level option in Next.js 15.5.
  typedRoutes: true,
};

export default config;
