import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/login", {
  title: "ورود | کارماچک",
  description: "ورود به حساب کاربری کارماچک",
  robots: { index: false, follow: false },
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
