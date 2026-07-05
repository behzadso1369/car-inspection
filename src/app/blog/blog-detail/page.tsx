import { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("/blog/blog-detail", {
  title: "جزئیات مقاله | مجله کارماچک",
});

export default function BlogDetail() {
    return (
        <>blog-detail</>
    )
}
