import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/Profile/requests/incompeleted", {
  title: "درخواست‌های ناتمام | کارماچک",
  robots: { index: false, follow: false },
});

export default function ProfileIncompeletedRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
