import type { NextConfig } from "next";

// Set by the GitHub Actions workflow while the site is served from
// https://<user>.github.io/plotnikova/ (a project page). Once the reg.ru
// domain is attached, drop NEXT_PUBLIC_BASE_PATH from the workflow env and
// the site moves back to the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // GitHub Pages and plain reg.ru hosting only serve static files, so the
  // whole site is exported to HTML/CSS/JS at build time.
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // No image optimizer without a Node server: originals are served as-is.
    unoptimized: true,
  },
};

export default nextConfig;
