import type { Metadata } from "next";
import { jalaliDayMonth } from "@/lib/jalali-date";

const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-price`;

// تاریخ تایتل از قیمت‌های زنده‌ی API می‌آید؛ صفحه هر ساعت (revalidate روت) دوباره ساخته می‌شود تا تاریخ هر روز عوض شود.
export async function generateMetadata(): Promise<Metadata> {
  const today = jalaliDayMonth();
  const title = `تخمین قیمت خودرو کارکرده امروز ${today} | رایگان`;
  const description = `محاسبه و قیمت‌گذاری رایگان خودرو کارکرده با قیمت روز بازار، ${today}. مدل، سال، کارکرد و وضعیت رنگ و شاسی را وارد کنید و بدون ثبت‌نام بازهٔ قیمت را ببینید.`;

  return {
    title,
    description,
    keywords: [
      "تخمین قیمت خودرو",
      "تخمین قیمت خودرو کارکرده",
      "قیمت خودرو کارکرده",
      "محاسبه قیمت خودرو",
      "قیمت گذاری خودرو",
      "کارشناسی قیمت خودرو",
      "کارماچک",
    ],
    alternates: {
      canonical: PAGE_URL,
    },
    openGraph: {
      title: `${title} | کارماچک`,
      description,
      url: PAGE_URL,
    },
  };
}

export default function CarPriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
