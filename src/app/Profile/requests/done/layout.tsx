import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/Profile/requests/done", {
  title: "درخواست‌های تکمیل‌شده | کارماچک",
  robots: { index: false, follow: false },
});

export default function ProfileDoneRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
