import type { Metadata } from "next";

const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-new-price`;

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const title = "قیمت خودرو صفر | کارماچک";
  const description =
    "فهرست قیمت خودرو صفر بر اساس مدل، سال و منبع اعلام‌شده. نتیجه برای اطلاع است، نه قیمت قطعی معامله. امکان رزرو کارشناسی همان خودرو.";

  return {
    title: { absolute: title },
    description,
    keywords: [
      "قیمت روز خودرو صفر",
      "قیمت خودرو صفر",
      "قیمت ماشین",
      "قیمت کارخانه",
      "قیمت بازار خودرو",
      "کارماچک",
    ],
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      locale: "fa_IR",
      type: "website",
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
