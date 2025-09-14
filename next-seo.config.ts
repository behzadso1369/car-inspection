// next-seo.config.ts
import { DefaultSeoProps } from "next-seo";

const SEO: DefaultSeoProps = {
  titleTemplate: "%s | کارشناسی خودرو",
  defaultTitle: "کارشناسی و خرید خودرو",
  description: "کارشناسی تخصصی خودرو و خرید مطمئن با بهترین کارشناسان در ایران.",
  canonical: "https://yoursite.com",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://yoursite.com",
    siteName: "کارشناسی خودرو",
    images: [
      {
        url: "https://yoursite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "کارشناسی خودرو",
      },
    ],
  },
  twitter: {
    handle: "@yourbrand",
    site: "@yourbrand",
    cardType: "summary_large_image",
  },
};

export default SEO;
