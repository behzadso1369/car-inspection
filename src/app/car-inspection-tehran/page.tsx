import { Metadata } from "next";
import Link from "next/link";
import { LOCAL_AREAS } from "@/lib/local-areas";
import {
  BASE_URL,
  getCanonicalUrl,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 86400;

const title = "کارشناسی خودرو تهران و شرق تهران | کارشناسی ماشین در محل | کارماچک";
const description =
  "کارشناسی خودرو و ماشین در تهران و شرق تهران؛ تهرانپارس، نارمک، هنگام، رسالت و پیروزی | کارشناسی در محل با گزارش فوری | رزرو آنلاین کارماچک";

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
    "کارشناسی خودرو هنگام",
    "کارشناسی خودرو رسالت",
    "کارشناسی خودرو پیروزی",
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
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function CarInspectionTehranHub() {
  const schema = [
    generateLocalBusinessSchema({ path: "/car-inspection-tehran" }),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی خودرو تهران", path: "/car-inspection-tehran" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "مناطق کارشناسی خودرو شرق تهران",
      itemListElement: LOCAL_AREAS.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `کارشناسی خودرو ${a.name}`,
        url: getCanonicalUrl(`/car-inspection-tehran/${a.slug}`),
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />
      <main className="font-IranSans bg-[#F4F6FB]" dir="rtl">
        <header className="relative overflow-hidden bg-[#0B1F4A] text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 85% -10%, rgba(74,124,232,.35), transparent 55%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(52,86,187,.22), transparent 50%), linear-gradient(165deg,#0B1F4A,#122B58 45%,#16366C)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#4A7CE8]/18 blur-3xl"
          />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <nav className="mb-6 text-sm text-white/65">
              <Link href="/" className="hover:text-white">
                خانه
              </Link>
              <span className="mx-1.5 text-white/35">/</span>
              <span className="text-white/90">کارشناسی خودرو تهران</span>
            </nav>
            <p className="text-sm font-medium text-[#9BB6F0]">
              کارماچک · پوشش شرق تهران
            </p>
            <h1 className="mt-2 max-w-3xl text-2xl font-black leading-10 sm:text-3xl sm:leading-[2.8rem]">
              کارشناسی خودرو تهران و شرق تهران
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/80 sm:text-base sm:leading-9">
              کارماچک خدمات <strong>کارشناسی خودرو</strong> و{" "}
              <strong>کارشناسی ماشین</strong> را به‌صورت{" "}
              <strong>در محل</strong> در سراسر تهران و به‌ویژه شرق تهران ارائه
              می‌دهد. منطقه‌ی خود را انتخاب کنید تا جزئیات خدمات کارشناسی در
              محله‌ی شما را ببینید.
            </p>
            <Link
              href="/car-inspection"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0B1F4A] transition-transform hover:-translate-y-0.5"
            >
              شروع رزرو کارشناسی
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LOCAL_AREAS.map((a) => (
              <Link
                key={a.slug}
                href={`/car-inspection-tehran/${a.slug}`}
                className="group rounded-[1.5rem] border border-[#E2E8F4] bg-white p-5 shadow-[0_8px_24px_rgba(16,17,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3456bb]/45 hover:shadow-[0_16px_36px_rgba(52,86,187,0.12)] sm:p-6"
              >
                <h2 className="text-lg font-bold text-[#101117] transition-colors group-hover:text-[#3456bb]">
                  کارشناسی خودرو {a.name}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#6B6C70]">
                  {a.content.shortPitch ??
                    `${a.nearby.slice(0, 3).join("، ")} و اطراف`}
                </p>
                <span className="mt-4 inline-flex text-xs font-medium text-[#3456bb]">
                  مشاهده صفحه منطقه ←
                </span>
              </Link>
            ))}
          </div>

          <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-[#0B1F4A] px-6 py-10 text-center text-white">
            <p className="text-lg font-bold">
              کارشناسی خودرو در محل، در هر نقطه از شرق تهران
            </p>
            <Link
              href="/car-inspection"
              className="mt-5 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#0B1F4A]"
            >
              شروع رزرو کارشناسی
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
