import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/motorcycle-inspection/succeed", {
  title: "ثبت موفق | فرآیند کارشناسی موتور | کارماچک",
  description: "ثبت موفق سفارش کارشناسی موتور",
  robots: { index: false, follow: false },
});

export default function Succeed() {
    return (
        <>Succeed</>
    )
}
