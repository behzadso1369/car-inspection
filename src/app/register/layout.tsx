import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/register", {
  title: "ثبت‌نام | کارماچک",
  description: "ثبت‌نام کاربر جدید در کارماچک",
  robots: { index: false, follow: false },
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
