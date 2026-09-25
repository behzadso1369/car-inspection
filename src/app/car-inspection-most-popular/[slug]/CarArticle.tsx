import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { CarArticleSection, CarFaq } from "../carsData";
import InspectCtaButton from "./InspectCtaButton";

const ARTICLE_LINKS: { needle: string; href: string }[] = [
  { needle: "محاسبه قیمت خودرو رایگان", href: "/car-price" },
  { needle: "محاسبه قیمت خودرو کارکرده", href: "/car-price" },
  { needle: "کارشناسی خودرو در تهران", href: "/car-inspection-tehran" },
  { needle: "ویدیوی کارشناسی خودرو ۲۰۶", href: "#inspection-video" },
  { needle: "ویدیوی کارشناسی خودرو 206", href: "#inspection-video" },
  { needle: "نشانه‌های شاسی ضربه‌خورده", href: "/blog" },
  { needle: "راهنمای تشخیص کیلومتر واقعی خودرو", href: "/blog" },
];

function LinkedText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length) {
    let nextIndex = -1;
    let nextLink: (typeof ARTICLE_LINKS)[number] | null = null;

    for (const link of ARTICLE_LINKS) {
      const idx = remaining.indexOf(link.needle);
      if (idx !== -1 && (nextIndex === -1 || idx < nextIndex)) {
        nextIndex = idx;
        nextLink = link;
      }
    }

    if (!nextLink || nextIndex === -1) {
      parts.push(remaining);
      break;
    }

    if (nextIndex > 0) {
      parts.push(remaining.slice(0, nextIndex));
    }
    parts.push(
      <Link key={`${nextLink.href}-${key++}`} href={nextLink.href} className="text-[#416CEA] font-medium">
        {nextLink.needle}
      </Link>,
    );
    remaining = remaining.slice(nextIndex + nextLink.needle.length);
  }

  return <>{parts}</>;
}

function ArticleParagraphs({
  texts,
  className = "text-[#55565A] leading-8 text-sm md:text-base mb-3",
}: {
  texts?: string[];
  className?: string;
}) {
  if (!texts?.length) return null;
  return (
    <>
      {texts.map((text) => (
        <p key={text.slice(0, 48)} className={className}>
          <LinkedText text={text} />
        </p>
      ))}
    </>
  );
}

function SectionBody({
  section,
  inspectCar,
}: {
  section: CarArticleSection;
  inspectCar?: {
    carName: string;
    searchTerm?: string;
    carGroupId?: number;
    carGroupName?: string;
  };
}) {
  return (
    <>
      <h2 className="text-lg font-bold text-[#101117] mb-3">{section.title}</h2>
      <ArticleParagraphs texts={section.paragraphs} />
      {section.table ? (
        <div className="overflow-x-auto my-4">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#F0F4F8]">
                {section.table.headers.map((header) => (
                  <th
                    key={header}
                    className="border border-[#E6E9EE] p-2.5 text-right font-bold text-[#101117]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} className="border border-[#E6E9EE] p-2.5 text-[#55565A] align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {section.subsections?.map((sub) => (
        <div key={sub.title} className="mt-4">
          <h3 className="text-base font-bold text-[#101117] mb-2">{sub.title}</h3>
          <ArticleParagraphs texts={sub.paragraphs} />
        </div>
      ))}
      <ArticleParagraphs texts={section.paragraphsAfter} />
      {section.cta ? (
        section.cta.inspect && inspectCar ? (
          <div className="mt-4 rounded-2xl border border-[#E2E8F4] bg-[#F8FAFE] p-4">
            <InspectCtaButton
              carName={inspectCar.carName}
              searchTerm={inspectCar.searchTerm}
              carGroupId={inspectCar.carGroupId}
              carGroupName={inspectCar.carGroupName}
              label={section.cta.label}
              className="!h-11 text-sm"
            />
          </div>
        ) : (
          <Link
            href={section.cta.href}
            className="inline-flex mt-3 bg-[#416CEA] text-white rounded-2xl px-5 py-2.5 text-sm font-medium"
          >
            {section.cta.label}
          </Link>
        )
      ) : null}
    </>
  );
}

export default function CarArticle({
  intro,
  sections,
  faqs,
  faqTitle,
  quickAnswerTitle,
  quickAnswer,
  sideImage,
  sideImageAlt,
  inspectCar,
}: {
  intro?: string[];
  sections?: CarArticleSection[];
  faqs?: CarFaq[];
  faqTitle?: string;
  quickAnswerTitle?: string;
  quickAnswer?: string;
  sideImage?: string;
  sideImageAlt?: string;
  inspectCar?: {
    carName: string;
    searchTerm?: string;
    carGroupId?: number;
    carGroupName?: string;
  };
}) {
  if (!intro?.length && !sections?.length && !faqs?.length && !quickAnswer) return null;

  const ctaCopy = intro?.find((text) => text.includes("ارزش خودرو را جداگانه محاسبه کنید"));
  const [introLead, ...introRest] = (intro ?? []).filter(
    (text) => !text.includes("ارزش خودرو را جداگانه محاسبه کنید"),
  );
  const tableSectionIndex = quickAnswer
    ? -1
    : (sections?.findIndex((section) => section.table) ?? -1);
  const tableSection = tableSectionIndex >= 0 ? sections![tableSectionIndex] : null;
  const otherSections = (sections ?? []).filter((_, index) => index !== tableSectionIndex);

  const carBox = ctaCopy || introLead || sideImage ? (
    <section className="px-4 lg:px-24">
      <div
        className={
          sideImage
            ? "rounded-3xl border border-[#E4E8F0] bg-[#F6F8FC] px-4 py-2 lg:px-10 lg:py-8 flex flex-col lg:flex-row lg:items-center lg:min-h-[360px] gap-5 lg:gap-8"
            : "max-w-5xl mx-auto"
        }
      >
        {sideImage ? (
          <div className="pointer-events-none flex justify-center lg:w-[739px] lg:shrink-0">
            <div className="relative aspect-[1200/676] w-[353px] lg:w-[739px]">
              <Image
                src={sideImage}
                alt={sideImageAlt || ""}
                fill
                unoptimized
                sizes="(max-width: 1024px) 353px, 739px"
                className="object-contain"
              />
            </div>
          </div>
        ) : null}
        <div className={`relative z-[1] ${sideImage ? "lg:flex-1 space-y-4" : ""}`}>
          {ctaCopy ? (
            <p className="text-[#3D3F45] leading-9 text-base md:text-lg">
              با{" "}
              <Link href="/" className="text-[#416CEA] font-medium">
                کارماچک
              </Link>{" "}
              می‌توانید برای بررسی خودرو در محل درخواست بدهید و نتیجه را مبنای تصمیم خرید و مذاکره
              قرار دهید. پیش از رزرو، نوع خدمات را انتخاب کنید؛ برای سنجیدن قیمت پیشنهادی فروشنده هم
              می‌توانید{" "}
              <Link href="/car-price" className="text-[#416CEA] font-medium">
                ارزش خودرو
              </Link>{" "}
              را جداگانه محاسبه کنید.
            </p>
          ) : null}
          {introLead ? (
            <p
              className={`text-[#3D3F45] leading-9 ${
                sideImage ? "text-base md:text-lg" : "text-sm md:text-base leading-8"
              }`}
            >
              <LinkedText text={introLead} />
            </p>
          ) : null}
        </div>
      </div>
    </section>
  ) : null;

  return (
    <article className="mt-4 lg:mt-10 space-y-8">
      {tableSection ? (
        <div className="px-4 max-w-5xl mx-auto">
          <section
            id={tableSection.id}
            className="rounded-2xl border border-[#EDEDED] bg-white p-5"
          >
            <SectionBody section={tableSection} inspectCar={inspectCar} />
          </section>
        </div>
      ) : null}

      {carBox}

      {introRest.map((text) => (
        <p
          key={text.slice(0, 48)}
          className="px-4 max-w-5xl mx-auto text-[#55565A] leading-8 text-sm md:text-base"
        >
          <LinkedText text={text} />
        </p>
      ))}

      <div className="px-4 max-w-5xl mx-auto space-y-8">
      {quickAnswer ? (
        <section className="quick-answer rounded-2xl bg-[#F0F4F8] p-5">
          {quickAnswerTitle ? (
            <h2 className="text-base font-bold text-[#101117] mb-2">{quickAnswerTitle}</h2>
          ) : null}
          <p className="text-[#55565A] leading-8 text-sm md:text-base">
            <LinkedText text={quickAnswer} />
          </p>
        </section>
      ) : null}

      {otherSections.map((section) => (
        <section key={section.id} id={section.id} className="rounded-2xl border border-[#EDEDED] bg-white p-5">
          <SectionBody section={section} inspectCar={inspectCar} />
        </section>
      ))}

      {faqs?.length ? (
        <section className="rounded-2xl border border-[#EDEDED] bg-white p-5" aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-lg font-bold text-[#101117] mb-3">
            {faqTitle || "سؤالات متداول"}
          </h2>
          <div className="space-y-2">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="border border-[#E6E9EE] rounded-xl px-4 py-2"
              >
                <summary className="cursor-pointer font-bold text-[#101117] py-1">
                  {faq.question}
                </summary>
                <p className="text-[#55565A] leading-8 text-sm pt-1 pb-2">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
      </div>
    </article>
  );
}
