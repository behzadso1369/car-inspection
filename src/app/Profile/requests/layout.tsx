import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/Profile/requests", {
  title: "درخواست‌های کارشناسی | کارماچک",
  robots: { index: false, follow: false },
});

export default function ProfileRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
