// SSR - Server Component
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

export const revalidate = 0; // Dynamic - هر بار fresh

export const metadata: Metadata = {
  title: "پرداخت موفق | فرآیند کارشناسی خودرو | کارماچک",
  description: "سفارش شما با موفقیت ثبت شد",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/payment-success`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PaymentSucceed() {
  return <ClientWrapper />;
}
