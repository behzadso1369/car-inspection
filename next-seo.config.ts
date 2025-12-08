// next-seo.config.ts
import { DefaultSeoProps } from "next-seo";

/**
 * تنظیمات پیش‌فرض SEO برای تمام صفحات
 * این تنظیمات برای صفحاتی که SEO مشخص ندارند استفاده می‌شود
 */
const DEFAULT_SEO: DefaultSeoProps = {
  // Title Template - برای تمام صفحات
  titleTemplate: "%s | کارماچک",
  defaultTitle: "کارماچک | کارشناسی تخصصی خودرو با کارشناسان مجرب",
  
  // Meta Description پیش‌فرض
  description: "کارشناسی تخصصی خودرو با ۹۰٪ دقت | بیش از ۲۵ هزار کارشناسی موفق | کارشناسی در محل یا مرکز | دریافت گزارش فوری | تهران",
  
  // Canonical URL پیش‌فرض
  canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com",
  
  // Language and Charset
  languageAlternates: [
    {
      hrefLang: "fa-IR",
      href: process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com",
    },
  ],
  
  // Additional Meta Tags
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, maximum-scale=5",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      httpEquiv: "content-type",
      content: "text/html; charset=utf-8",
    },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: "index, follow",
    },
    // Author and Publisher
    {
      name: "author",
      content: "کارماچک - CarmaCheck",
    },
    {
      name: "publisher",
      content: "کارماچک",
    },
    // Theme Color
    {
      name: "theme-color",
      content: "#3456bb",
    },
    {
      name: "msapplication-TileColor",
      content: "#3456bb",
    },
  ],
  
  // Open Graph Protocol
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com",
    siteName: "کارماچک - کارشناسی خودرو",
    title: "کارماچک | کارشناسی تخصصی خودرو با کارشناسان مجرب",
    description: "کارشناسی تخصصی خودرو با ۹۰٪ دقت | بیش از ۲۵ هزار کارشناسی موفق | کارشناسی در محل یا مرکز",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "کارماچک - کارشناسی خودرو",
        type: "image/jpeg",
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/assets/images/logo.svg`,
        width: 800,
        height: 600,
        alt: "لوگوی کارماچک",
        type: "image/svg+xml",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    handle: "@carmacheck",
    site: "@carmacheck",
    cardType: "summary_large_image",
  },
  
  // Additional Link Tags
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
};

export default DEFAULT_SEO;
