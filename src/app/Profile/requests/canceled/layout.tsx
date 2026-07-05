import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/Profile/requests/canceled", {
  title: "درخواست‌های لغو‌شده | کارماچک",
  robots: { index: false, follow: false },
});

export default function ProfileCanceledRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
