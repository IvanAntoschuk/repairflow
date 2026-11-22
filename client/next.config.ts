import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    externalDir: true,
  },
  turbopack: {
    root: path.resolve(__dirname, ".."),
    resolveAlias: {
      "@server": path.resolve(__dirname, "../server/src"),
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
