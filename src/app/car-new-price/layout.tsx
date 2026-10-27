import type { Metadata } from "next";
import { jalaliDayMonth } from "@/lib/jalali-date";

const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-new-price`;

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const today = jalaliDayMonth();
  const title = `قیمت روز خودرو ${today} | صفر و کارخانه`;
  const description = `لیست قیمت روز خودروهای صفر ${today}؛ نام مدل، سال تولید و قیمت به‌روز از بازار. رزرو کارشناسی همان خودرو در یک کلیک.`;

  return {
    title,
    description,
    keywords: [
      "قیمت روز خودرو",
      "قیمت خودرو صفر",
      "قیمت ماشین",
      "قیمت کارخانه",
      "قیمت بازار خودرو",
      "کارماچک",
    ],
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: `${title} | کارماچک`,
      description,
      url: PAGE_URL,
    },
  };
}

export default function CarNewPriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
