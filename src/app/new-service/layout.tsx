import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/new-service", {
  title: "خدمات جدید | کارماچک",
  description: "معرفی خدمات کارشناسی خودرو کارماچک",
});

export default function NewServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
