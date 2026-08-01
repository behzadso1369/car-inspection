import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محاسبه قیمت خودرو کارکرده | قیمت‌گذاری آنلاین | کارماچک",
  description:
    "محاسبه قیمت خودرو بر اساس مدل، سال، کارکرد، رنگ و شاسی؛ در چند مرحله ساده قیمت حدودی خودروی خود را ببینید و برای قیمت‌گذاری دقیق‌تر کارشناسی بگیرید.",
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
    title: "محاسبه قیمت خودرو کارکرده | قیمت‌گذاری آنلاین | کارماچک",
    description:
      "محاسبه قیمت خودرو بر اساس مدل، سال، کارکرد، رنگ و شاسی و مشاهده بازه تقریبی قیمت خودرو.",
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
