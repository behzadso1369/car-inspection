import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CheckmarkCircle02Icon, CancelCircleIcon, SearchAreaIcon } from "hugeicons-react";
import { BASE_URL, COMMON_KEYWORDS } from "@/lib/seo";
import { CARS, getCarBySlug } from "../carsData";

// SSG - صفحات ثابت برای ۱۰ خودرو، عالی برای SEO و سرعت لود
export const dynamicParams = false;

export function generateStaticParams() {
  return CARS.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);

  if (!car) {
    return { title: "خودرو یافت نشد | کارماچک" };
  }

  const title = `کارشناسی ${car.name} | معایب و مزایا | کارماچک`;
  const description = `معایب و مزایای ${car.name} + نکات مهم کارشناسی این خودرو. ${car.tagline}. رزرو کارشناسی تخصصی ${car.name} در محل با کارشناسان مجرب کارماچک.`;
  const url = `${BASE_URL}/car-inspection-most-popular/${car.slug}`;
  const image = `${BASE_URL}${car.image}`;

  return {
    title,
    description,
    keywords: [...car.keywords, ...COMMON_KEYWORDS],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "کارماچک",
      locale: "fa_IR",
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: `کارشناسی ${car.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CarInspectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const url = `${BASE_URL}/car-inspection-most-popular/${car.slug}`;

  // JSON-LD: مقاله + مسیر راهنما (Breadcrumb) برای نتایج بهتر گوگل
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `کارشناسی ${car.name} | معایب و مزایا`,
        description: car.intro,
        image: `${BASE_URL}${car.image}`,
        author: { "@type": "Organization", name: "کارماچک" },
        publisher: {
          "@type": "Organization",
          name: "کارماچک",
          logo: { "@type": "ImageObject", url: `${BASE_URL}/assets/images/logo.svg` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "خانه", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "کارشناسی خودروها", item: `${BASE_URL}/car-inspection-most-popular` },
          { "@type": "ListItem", position: 3, name: `کارشناسی ${car.name}`, item: url },
        ],
      },
    ],
  };

  return (
    <div className="px-4 font-IranSans py-4 max-w-5xl mx-auto" dir="rtl">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD ساختاریافته برای SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "کارشناسی خودروها", href: "/car-inspection-most-popular" },
          { label: `کارشناسی ${car.name}` },
        ]}
        className="mb-4"
      />

      {/* هدر: عکس + معرفی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#F4F5F7]">
          <Image
            src={car.image}
            alt={`عکس ${car.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <span className="text-sm text-[#3456bb] font-medium">{car.brand}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#101117] mt-1 mb-3">
            کارشناسی {car.name}
          </h1>
          <p className="text-[#55565A] leading-8 text-sm md:text-base">{car.intro}</p>
        </div>
      </div>

      {/* CTA بالای صفحه */}
      <CtaBox carName={car.name} />

      {/* مزایا و معایب */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <section className="rounded-2xl border border-[#E4F5EC] bg-[#F3FBF7] p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#15803D] mb-4">
            <CheckmarkCircle02Icon className="w-6 h-6" />
            مزایای {car.name}
          </h2>
          <ul className="space-y-3">
            {car.pros.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[#101117] text-sm leading-7">
                <CheckmarkCircle02Icon className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#FBE4E4] bg-[#FDF3F3] p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#B91C1C] mb-4">
            <CancelCircleIcon className="w-6 h-6" />
            معایب {car.name}
          </h2>
          <ul className="space-y-3">
            {car.cons.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[#101117] text-sm leading-7">
                <CancelCircleIcon className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* نکات کارشناسی */}
      <section className="rounded-2xl border border-[#E7EBF7] bg-[#F5F7FD] p-5 mt-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-[#3456bb] mb-4">
          <SearchAreaIcon className="w-6 h-6" />
          نکات مهم در کارشناسی {car.name}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {car.inspectionPoints.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[#101117] text-sm leading-7">
              <span className="w-2 h-2 rounded-full bg-[#3456bb] flex-shrink-0 mt-2.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA پایین صفحه */}
      <CtaBox carName={car.name} className="mt-8" />

      {/* لینک به سایر خودروها */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-[#101117] mb-4">کارشناسی سایر خودروها</h2>
        <div className="flex flex-wrap gap-2">
          {CARS.filter((c) => c.slug !== car.slug).map((c) => (
            <Link
              key={c.slug}
              href={`/car-inspection-most-popular/${c.slug}`}
              className="rounded-full border border-[#DFDFDF] px-4 py-1.5 text-sm text-[#55565A] hover:border-[#3456bb] hover:text-[#3456bb] transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function CtaBox({ carName, className = "" }: { carName: string; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-l from-[#3456bb] to-[#4a6fd8] p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${className}`}
    >
      <div className="text-white">
        <p className="text-lg font-bold">قصد خرید {carName} دارید؟</p>
        <p className="text-sm text-white/90 mt-1">
          قبل از خرید، خودرو را توسط کارشناسان مجرب کارماچک کارشناسی کنید.
        </p>
      </div>
      <Link
        href="/car-inspection"
        prefetch
        className="inline-flex items-center justify-center rounded-full bg-white text-[#3456bb] font-bold px-6 py-3 text-sm whitespace-nowrap hover:bg-white/90 transition-colors"
      >
        شروع کارشناسی
      </Link>
    </div>
  );
}
