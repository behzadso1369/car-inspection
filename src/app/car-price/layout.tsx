import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محاسبه قیمت خودرو کارکرده رایگان | تخمین آنلاین",
  description:
    "قیمت خودرو کارکرده را رایگان و بدون ثبت‌نام تخمین بزنید. مدل، سال ساخت، کارکرد و وضعیت رنگ و شاسی را وارد کنید و بازهٔ تقریبی قیمت را ببینید.",
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
    title: "محاسبه قیمت خودرو کارکرده رایگان | تخمین آنلاین | کارماچک",
    description:
      "قیمت خودرو کارکرده را رایگان و بدون ثبت‌نام تخمین بزنید. مدل، سال ساخت، کارکرد و وضعیت رنگ و شاسی را وارد کنید و بازهٔ تقریبی قیمت را ببینید.",
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
