import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  sassOptions: {
    // `loadPaths` is what modern Sass reads; `includePaths` is its legacy
    // alias. Both are set so the shared partials resolve as bare `@use
    // "tokens"` from any stylesheet, whichever the active compiler honours.
    loadPaths: [path.join(process.cwd(), "src/styles")],
    includePaths: [path.join(process.cwd(), "src/styles")],
  },
};

export default nextConfig;
