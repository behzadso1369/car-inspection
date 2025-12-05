// SSR - Server Component
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ثبت اطلاعات | فرآیند کارشناسی خودرو | کارچک",
  description: "وارد کردن اطلاعات کاربری برای ادامه فرآیند کارشناسی خودرو",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/insert-information`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function InsertInformation() {
  return <ClientWrapper />;
}