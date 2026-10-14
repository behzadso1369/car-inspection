import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/motorcycle-inspection/slider", {
  title: "اسلایدر مشتریان | فرآیند کارشناسی موتور | کارماچک",
  robots: { index: false, follow: false },
});

export default function SelectCarGroupSliderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
