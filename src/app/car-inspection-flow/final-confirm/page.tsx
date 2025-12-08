// SSR - Server Component
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "تایید نهایی | فرآیند کارشناسی خودرو | کارماچک",
  description: "بررسی و تایید نهایی اطلاعات سفارش کارشناسی خودرو",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/final-confirm`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function FinalConfirm() {
  return <ClientWrapper />;
}
