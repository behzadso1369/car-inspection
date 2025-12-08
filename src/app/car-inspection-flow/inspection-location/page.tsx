// SSR - Server Component
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "انتخاب محل کارشناسی | فرآیند کارشناسی خودرو | کارماچک",
  description: "انتخاب محل کارشناسی: در محل شما یا مرکز کارشناسی",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/inspection-location`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function InspectionLocation() {
  return <ClientWrapper />;
}
