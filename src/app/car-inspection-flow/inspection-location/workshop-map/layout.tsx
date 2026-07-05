import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/car-inspection-flow/inspection-location/workshop-map", {
  title: "نقشه مراکز کارشناسی | فرآیند کارشناسی خودرو | کارماچک",
  description: "انتخاب مرکز کارشناسی روی نقشه",
  robots: { index: false, follow: false },
});

export default function WorkshopMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
