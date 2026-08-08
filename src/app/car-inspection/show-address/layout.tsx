import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/car-inspection/show-address", {
  title: "نمایش آدرس | فرآیند کارشناسی خودرو | کارماچک",
  description: "نمایش آدرس محل کارشناسی خودرو",
  robots: { index: false, follow: false },
});

export default function ShowAddressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
