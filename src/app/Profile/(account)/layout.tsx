import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/Profile", {
  title: "پروفایل کاربری | کارماچک",
  description: "مدیریت حساب کاربری و درخواست‌های کارشناسی",
  robots: { index: false, follow: false },
});

export default function ProfileAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
