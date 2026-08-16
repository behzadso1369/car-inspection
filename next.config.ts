import type { NextConfig } from "next";

const FLOW_RESERVED =
  "inspection-method|inspection-location|insert-information|inspection-time|final-confirm|payment-succeed|payment|show-address|succeed|slider|components|lib";

const securityHeaders = [
  {
    key: "Permissions-Policy",
    value:
      "geolocation=(self), camera=(), microphone=(), interest-cohort=()",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,

  async redirects() {
    return [
      {
        source: "/car-inspection-flow/select-car-group",
        destination: "/car-inspection",
        permanent: true,
      },
      {
        source: "/car-inspection-flow/select-car-group/slider",
        destination: "/car-inspection/slider",
        permanent: true,
      },
      {
        source: "/car-inspection-flow/:path*",
        destination: "/car-inspection/:path*",
        permanent: true,
      },
      // اسلاگ‌های قدیمی صفحات معایب/مزایا → مسیر جدید
      {
        source: `/car-inspection/:slug((?!${FLOW_RESERVED})[^/]+)`,
        destination: "/car-inspection-most-popular/:slug",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/media/:path*",
        destination: "https://api.carmacheck.com/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.carmacheck.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [60, 70, 75],
  },

  output: "standalone",

  experimental: {
    optimizePackageImports: [
      "@/components",
      "lucide-react",
      "hugeicons-react",
      "framer-motion",
    ],
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
};

export default nextConfig;
