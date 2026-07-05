import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/car-inspection-flow/succeed", {
  title: "ثبت موفق | فرآیند کارشناسی خودرو | کارماچک",
  description: "ثبت موفق سفارش کارشناسی خودرو",
  robots: { index: false, follow: false },
});

export default function Succeed() {
    return (
        <>Succeed</>
    )
}
