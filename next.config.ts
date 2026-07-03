import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ~/ also has a package-lock.json; pin the root so Turbopack doesn't infer it
  turbopack: {
    root: path.join(__dirname),
  },
  // Let phones on the LAN load dev assets (Next blocks cross-origin dev requests by default)
  allowedDevOrigins: ["10.2.2.6", "localhost"],
};

export default nextConfig;
