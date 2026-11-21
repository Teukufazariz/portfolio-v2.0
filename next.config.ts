import type { NextConfig } from "next";

// The old site's /projects/* URLs, sent to where that content lives now.
const moved: Record<string, string> = {
  "nanovest-developer-portal": "/work/nanovest",
  "planpal-kubernetes": "/work/planpal",
  "planpal-iac": "/work/planpal#iac",
  aform: "/work/aform",
  ristock: "/#earlier",
  "coco-co": "/#earlier",
  percatalk: "/#earlier",
  swifter: "/#earlier",
  "wedding-invitation": "/#earlier",
};

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return Object.entries(moved).map(([slug, destination]) => ({
      source: `/projects/${slug}`,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
