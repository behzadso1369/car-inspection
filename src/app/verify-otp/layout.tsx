import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/verify-otp", {
  title: "تایید کد | کارماچک",
  description: "تایید کد یکبار مصرف ورود به کارماچک",
  robots: { index: false, follow: false },
});

export default function VerifyOtpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
