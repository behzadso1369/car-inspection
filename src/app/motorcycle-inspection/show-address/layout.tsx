import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/motorcycle-inspection/show-address", {
  title: "نمایش آدرس | فرآیند کارشناسی موتور | کارماچک",
  description: "نمایش آدرس محل کارشناسی موتور",
  robots: { index: false, follow: false },
});

export default function ShowAddressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
