import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "قیمت‌گذاری خودرو | کارماچک",
  description:
    "قیمت حدودی خودرو را با کارشناسی هوشمند کارماچک محاسبه کنید. انتخاب مدل، سال ساخت، کارکرد، وضعیت رنگ و شاسی.",
  keywords: [
    "قیمت گذاری خودرو",
    "قیمت خودرو",
    "کارشناسی قیمت خودرو",
    "ارزیابی خودرو",
    "کارماچک",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-price`,
  },
  openGraph: {
    title: "قیمت‌گذاری خودرو | کارماچک",
    description:
      "قیمت حدودی خودرو را با کارشناسی هوشمند کارماچک محاسبه کنید.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-price`,
  },
};

export default function CarPriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
