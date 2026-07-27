import { Metadata } from "next";
import Link from "next/link";
import { LOCAL_AREAS } from "@/lib/local-areas";
import {
  getCanonicalUrl,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 86400;

const title = "کارشناسی خودرو تهران و شرق تهران | کارشناسی ماشین در محل | کارماچک";
const description =
  "کارشناسی خودرو و ماشین در تهران و شرق تهران؛ تهرانپارس، نارمک، فرجام و میدان رسالت | کارشناسی در محل با ۹۰٪ دقت و گزارش فوری | رزرو آنلاین کارماچک";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "کارشناسی خودرو تهران",
    "کارشناسی ماشین تهران",
    "کارشناسی خودرو شرق تهران",
    "کارشناسی ماشین شرق تهران",
    "کارشناسی خودرو تهرانپارس",
    "کارشناسی خودرو نارمک",
    "کارشناسی خودرو فرجام",
    "کارشناسی خودرو میدان رسالت",
    "کارماچک",
  ],
  alternates: { canonical: getCanonicalUrl("/car-inspection-tehran") },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: getCanonicalUrl("/car-inspection-tehran"),
    siteName: "کارماچک - کارشناسی خودرو",
    title,
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default function CarInspectionTehranHub() {
  const schema = [
    generateLocalBusinessSchema({ path: "/car-inspection-tehran" }),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی خودرو تهران", path: "/car-inspection-tehran" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <main className="font-IranSans max-w-4xl mx-auto px-4 py-8" dir="rtl">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1E2A38] leading-relaxed">
          کارشناسی خودرو تهران و شرق تهران
        </h1>
        <p className="mt-4 text-[#444] leading-8">
          کارماچک خدمات <strong>کارشناسی خودرو</strong> و <strong>کارشناسی ماشین</strong> را
          به‌صورت <strong>در محل</strong> در سراسر تهران و به‌ویژه شرق تهران ارائه می‌دهد.
          منطقه‌ی خود را انتخاب کنید تا جزئیات خدمات کارشناسی در محله‌ی شما را ببینید.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {LOCAL_AREAS.map((a) => (
            <Link
              key={a.slug}
              href={`/car-inspection-tehran/${a.slug}`}
              className="block rounded-2xl border border-[#E5E5E5] p-5 hover:border-[#3456bb] hover:shadow-[0px_8px_16px_0px_#0000000F] transition-all"
            >
              <h2 className="text-lg font-bold text-[#1E2A38]">
                کارشناسی خودرو {a.name}
              </h2>
              <p className="text-sm text-[#6B6C70] mt-1">
                {a.nearby.slice(0, 3).join("، ")} و اطراف
              </p>
            </Link>
          ))}
        </div>

        <div className="my-10 rounded-2xl bg-[#f5f7fc] p-6 text-center">
          <p className="text-[#1E2A38] font-medium">
            کارشناسی خودرو در محل، در هر نقطه از شرق تهران
          </p>
          <Link
            href="/car-inspection-flow/select-car-group"
            className="inline-block mt-4 rounded-full bg-[#3456bb] text-white px-8 py-3 text-sm font-medium hover:bg-[#2c4aa0] transition-colors"
          >
            شروع رزرو کارشناسی
          </Link>
        </div>
      </main>
    </>
  );
}
