import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["lightningcss", "@tailwindcss/node", "detect-libc"],
};

export default nextConfig;
