import BlogFooter from "./components/BlogFooter";
import { serverFetch } from "@/helper/server-fetcher";
import { BlogHeader } from "./components/BlogHeader";
import Banner from "../components/mobile/Home/Banner";
import { BlogMobileHeader } from "./components/BlogMobileHeader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialData = null;

  try {
    const data = await serverFetch("Site/GetMasterPageData", {
      cache: "no-store",
    });
    initialData = data?.MasterSiteData;
  } catch (error) {
    console.error("Error fetching master data in layout:", error);
  }

  return (
    <div className="blog-chrome-offset overflow-x-clip pb-6">
      <div className="fixed inset-x-0 top-0 z-[60] w-full max-w-[100vw]">
        <Banner data={initialData} pin={false} />
        <div className="hidden bg-white lg:block">
          <BlogHeader data={initialData} />
        </div>
        <div className="bg-white lg:hidden">
          <BlogMobileHeader data={initialData} />
        </div>
      </div>
      <div aria-hidden className="blog-chrome-spacer pointer-events-none shrink-0" />
      <div className="min-w-0">{children}</div>
      <BlogFooter />
    </div>
  );
}
