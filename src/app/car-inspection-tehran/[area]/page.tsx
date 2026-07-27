import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCAL_AREAS, getAreaBySlug } from "@/lib/local-areas";
import {
  BASE_URL,
  getCanonicalUrl,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

export const revalidate = 86400;

export function generateStaticParams() {
  return LOCAL_AREAS.map((a) => ({ area: a.slug }));
}

type Props = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return { title: "منطقه یافت نشد" };

  const title = `کارشناسی خودرو ${area.name} | کارشناسی ماشین در محل | کارماچک`;
  const description = `کارشناسی خودرو و ماشین در ${area.name} و محله‌های ${area.nearby.slice(0, 3).join("، ")} | کارشناسی در محل با ۹۰٪ دقت و گزارش فوری | رزرو آنلاین کارماچک`;
  const path = `/car-inspection-tehran/${slug}`;

  return {
    title,
    description,
    keywords: [
      `کارشناسی خودرو ${area.name}`,
      `کارشناسی ماشین ${area.name}`,
      "کارشناسی خودرو شرق تهران",
      "کارشناسی ماشین شرق تهران",
      "کارشناسی خودرو در محل",
      "کارماچک",
    ],
    alternates: { canonical: getCanonicalUrl(path) },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: getCanonicalUrl(path),
      siteName: "کارماچک - کارشناسی خودرو",
      title,
      description,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocalAreaPage({ params }: Props) {
  const { area: slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const path = `/car-inspection-tehran/${slug}`;
  const startUrl = "/car-inspection-flow/select-car-group";

  const faqs = [
    {
      question: `هزینه کارشناسی خودرو در ${area.name} چقدر است؟`,
      answer:
        "کارشناسی استاندارد از ۲۵۰ هزار تومان و کارشناسی VIP از ۴۵۰ هزار تومان شروع می‌شود. هزینه دقیق بسته به نوع خودرو و سطح کارشناسی تعیین می‌شود.",
    },
    {
      question: `آیا کارشناسی خودرو در محل در ${area.name} انجام می‌شود؟`,
      answer: `بله، کارشناسان کارماچک در ${area.name} و کل شرق تهران به‌صورت در محل حاضر می‌شوند و خودرو را همان‌جا بررسی می‌کنند.`,
    },
    {
      question: "گزارش کارشناسی چه زمانی آماده می‌شود؟",
      answer:
        "گزارش کارشناسی بلافاصله پس از پایان بررسی به‌صورت دیجیتال در اختیار شما قرار می‌گیرد.",
    },
  ];

  const schema = [
    generateLocalBusinessSchema({ area: area.name, path }),
    generateBreadcrumbSchema([
      { name: "خانه", path: "/" },
      { name: "کارشناسی خودرو تهران", path: "/car-inspection-tehran" },
      { name: area.name, path },
    ]),
    generateFAQSchema(faqs),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <main className="font-IranSans max-w-4xl mx-auto px-4 py-8" dir="rtl">
        <nav className="text-sm text-[#9A9CA1] mb-4">
          <Link href="/" className="hover:text-[#3456bb]">خانه</Link>
          <span className="mx-1">/</span>
          <Link href="/car-inspection-tehran" className="hover:text-[#3456bb]">کارشناسی خودرو تهران</Link>
          <span className="mx-1">/</span>
          <span className="text-[#55565A]">{area.name}</span>
        </nav>

        <h1 className="text-2xl lg:text-3xl font-bold text-[#1E2A38] leading-relaxed">
          کارشناسی خودرو {area.name} — کارشناسی ماشین در محل با کارماچک
        </h1>

        <p className="mt-4 text-[#444] leading-8">
          به دنبال <strong>کارشناسی خودرو در {area.name}</strong> هستید؟ کارماچک با
          کارشناسان مجرب، خدمات <strong>کارشناسی ماشین {area.name}</strong> را به‌صورت
          <strong> در محل</strong> و با ۹۰٪ دقت ارائه می‌دهد. کافیست آنلاین رزرو کنید تا
          کارشناس ما در {area.name} و محله‌های اطراف
          ({area.nearby.join("، ")}) حاضر شود و خودرو را همان‌جا به‌طور کامل بررسی کند.
        </p>

        <div className="my-6">
          <Link
            href={startUrl}
            className="inline-block rounded-full bg-[#3456bb] text-white px-8 py-3 text-sm font-medium hover:bg-[#2c4aa0] transition-colors"
          >
            رزرو کارشناسی خودرو در {area.name}
          </Link>
        </div>

        <h2 className="text-xl font-bold text-[#1E2A38] mt-8 mb-3">
          چرا کارشناسی خودرو در {area.name} را به کارماچک بسپارید؟
        </h2>
        <ul className="list-disc pr-5 space-y-2 text-[#444] leading-8">
          <li>حضور کارشناس در محل شما در {area.name} و سراسر شرق تهران</li>
          <li>بررسی کامل بدنه، موتور، گیربکس، برق، تایر و ترمز</li>
          <li>تشخیص رنگ‌شدگی، تصادف، جوش و کیلومتر واقعی</li>
          <li>گزارش دیجیتال فوری پس از پایان کارشناسی</li>
          <li>بیش از ۲۵ هزار کارشناسی موفق</li>
        </ul>

        <h2 className="text-xl font-bold text-[#1E2A38] mt-8 mb-3">
          خدمات کارشناسی ماشین در {area.name}
        </h2>
        <p className="text-[#444] leading-8">
          چه قصد <strong>خرید خودرو دست دوم</strong> در {area.name} را دارید و چه می‌خواهید
          پیش از فروش، ماشینتان کارشناسی شود، تیم کارماچک در تمام محله‌های شرق تهران
          از جمله {area.nearby.join("، ")} در خدمت شماست. برای مشاهده انواع خدمات و
          تعرفه‌ها می‌توانید صفحه‌ی{" "}
          <Link href="/services" className="text-[#3456bb] font-medium">خدمات کارشناسی</Link>{" "}
          را ببینید.
        </p>

        <h2 className="text-xl font-bold text-[#1E2A38] mt-8 mb-3">مناطق دیگر شرق تهران</h2>
        <div className="flex flex-wrap gap-2">
          {LOCAL_AREAS.filter((a) => a.slug !== area.slug).map((a) => (
            <Link
              key={a.slug}
              href={`/car-inspection-tehran/${a.slug}`}
              className="rounded-full border border-[#A6A6A6] text-[#55565A] px-4 py-1.5 text-sm hover:text-[#3456bb] hover:border-[#3456bb] transition-colors"
            >
              کارشناسی خودرو {a.name}
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-[#1E2A38] mt-8 mb-3">سوالات متداول</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-medium text-[#1E2A38]">{f.question}</h3>
              <p className="text-[#444] leading-8 mt-1">{f.answer}</p>
            </div>
          ))}
        </div>

        <div className="my-10 rounded-2xl bg-[#f5f7fc] p-6 text-center">
          <p className="text-[#1E2A38] font-medium">
            همین حالا کارشناسی خودرو خود را در {area.name} رزرو کنید
          </p>
          <Link
            href={startUrl}
            className="inline-block mt-4 rounded-full bg-[#3456bb] text-white px-8 py-3 text-sm font-medium hover:bg-[#2c4aa0] transition-colors"
          >
            شروع رزرو کارشناسی
          </Link>
        </div>
      </main>
    </>
  );
}
