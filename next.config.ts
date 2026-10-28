import type { NextConfig } from "next";

// Sites allowed to show the chat in a frame (the Webflow embed). Override
// with ASK_ELIJAH_FRAME_ANCESTORS, space separated, in Vercel if the domain
// changes.
const frameAncestors =
  process.env.ASK_ELIJAH_FRAME_ANCESTORS ??
  [
    "https://elijahcruzado.com",
    "https://www.elijahcruzado.com",
    "https://elijahcruzado.webflow.io",
    ...(process.env.NODE_ENV === "development" ? ["http://localhost:*"] : []),
  ].join(" ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/embed",
        headers: [{ key: "Content-Security-Policy", value: `frame-ancestors 'self' ${frameAncestors}` }],
      },
      {
        // Everything else may only be framed by this app itself.
        source: "/((?!embed$).*)",
        headers: [{ key: "Content-Security-Policy", value: "frame-ancestors 'self'" }],
      },
      {
        source: "/embed.js",
        headers: [{ key: "Cache-Control", value: "public, max-age=300" }],
      },
    ];
  },
};

export default nextConfig;
