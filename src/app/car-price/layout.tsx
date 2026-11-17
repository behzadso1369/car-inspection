import type { Metadata } from "next";

const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-price`;

export async function generateMetadata(): Promise<Metadata> {
  const title = "تخمین قیمت خودرو کارکرده | کارماچک";
  const description =
    "عوامل مؤثر بر ارزش خودرو را بررسی کنید و بازهٔ برآورد قیمت کارکرده را ببینید. نتیجهٔ ابزار برآورد است، نه قیمت قطعی معامله. رایگان و بدون ثبت‌نام.";

  return {
    title: { absolute: title },
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
      title,
      description,
      url: PAGE_URL,
      locale: "fa_IR",
      type: "website",
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
