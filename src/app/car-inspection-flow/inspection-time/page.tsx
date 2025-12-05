// SSR - Server Component
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "انتخاب زمان کارشناسی | فرآیند کارشناسی خودرو | کارچک",
  description: "انتخاب تاریخ و ساعت مناسب برای کارشناسی خودرو",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/car-inspection-flow/inspection-time`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function InspectionTime() {
  return <ClientWrapper />;
}
