import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/car-inspection-flow/inspection-location/workshop-map-2", {
  title: "نقشه مراکز کارشناسی | فرآیند کارشناسی خودرو | کارماچک",
  description: "انتخاب مرکز کارشناسی روی نقشه",
  robots: { index: false, follow: false },
});

export default function WorkshopMap2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
