import localFont from "next/font/local";

/** IRANSans (FaNum) — only woff2, Regular+Bold preloaded; UltraLight is optional. */

export const iranSans = localFont({
  src: [
    {
      path: "../fonts/iransans.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/iransans-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-iran-sans",
  preload: true,
  adjustFontFallback: "Arial",
});

export const iranSansUltraLight = localFont({
  src: [
    {
      path: "../fonts/iransans-ultralight.woff2",
      weight: "200",
      style: "normal",
    },
  ],
  display: "optional",
  variable: "--font-iran-sans-ultralight",
  preload: false,
  adjustFontFallback: "Arial",
});
