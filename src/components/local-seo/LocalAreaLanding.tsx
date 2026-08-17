"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LocalArea } from "@/lib/local-areas";
import { getNearbyAreaLinks, LOCAL_AREAS } from "@/lib/local-areas";
import { COMPANY } from "@/lib/seo";

const START_URL = "/car-inspection";
const PRICE_URL = "/car-price";
const PHONE_TEL = "tel:+982191001740";

type Props = {
  area: LocalArea;
};

export default function LocalAreaLanding({ area }: Props) {
  const { content, name } = area;
  const nearbyLinks = getNearbyAreaLinks(area);

  return (
    <article
      dir="rtl"
      className="local-area-page font-IranSans text-[#101117] antialiased"
    >
      {/* —— Hero —— */}
      <header className="relative overflow-hidden border-b border-[#D8E0F0] bg-[#0B1F4A]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 90% 70% at 85% -10%, rgba(74, 124, 232, 0.38), transparent 55%),
              radial-gradient(ellipse 55% 45% at 5% 110%, rgba(52, 86, 187, 0.28), transparent 50%),
              linear-gradient(165deg, #0B1F4A 0%, #122B58 45%, #16366C 100%)
            `,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#3456bb]/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#4A7CE8]/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8">
          <nav
            aria-label="مسیر صفحه"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-[12px] text-white/65 sm:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-white">
              خانه
            </Link>
            <span aria-hidden className="text-white/35">
              /
            </span>
            <Link
              href="/car-inspection-tehran"
              className="transition-colors hover:text-white"
            >
              کارشناسی خودرو تهران
            </Link>
            <span aria-hidden className="text-white/35">
              /
            </span>
            <span className="text-white/90">{name}</span>
          </nav>

          <p className="mb-3 text-[12px] font-medium tracking-wide text-[#9BB6F0] sm:text-sm">
            کارماچک · کارشناسی خودرو در محل
            {content.hasCenterVisit ? " و مرکز شرق تهران" : ""}
          </p>

          <h1 className="max-w-3xl text-[1.55rem] font-black leading-10 text-white sm:text-3xl sm:leading-[2.6rem] lg:text-[2.15rem] lg:leading-[3.2rem]">
            {content.h1}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/80 sm:text-base sm:leading-9">
            {content.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={START_URL}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0B1F4A] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#F3F6FD]"
            >
              رزرو کارشناسی در {name}
            </Link>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/12"
            >
              تماس {COMPANY.phoneDisplay}
            </a>
            <Link
              href={PRICE_URL}
              className="inline-flex items-center justify-center px-2 text-sm text-[#B8C9F0] underline-offset-4 transition-colors hover:text-white hover:underline sm:mr-2"
            >
              قیمت‌گذاری خودرو
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "۲۵٬۰۰۰+", v: "کارشناسی موفق" },
              { k: "در محل", v: `پوشش ${name}` },
              { k: "گزارش", v: "دیجیتال و فوری" },
              { k: "۹۰٪", v: "دقت کارشناسی" },
            ].map((item) => (
              <li
                key={item.v}
                className="rounded-2xl border border-white/15 bg-white/8 px-3 py-3 backdrop-blur-sm sm:px-4"
              >
                <p className="text-base font-black text-white sm:text-lg">
                  {item.k}
                </p>
                <p className="mt-0.5 text-[11px] text-white/65 sm:text-xs">
                  {item.v}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="bg-[#F4F6FB]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          {/* Highlights */}
          <section aria-labelledby="highlights-heading" className="mb-12">
            <h2 id="highlights-heading" className="sr-only">
              مزایای کارشناسی خودرو در {name}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {content.highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="group relative overflow-hidden rounded-[1.35rem] border border-[#E2E8F4] bg-white p-5 shadow-[0_8px_24px_rgba(16,17,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3456bb]/40 hover:shadow-[0_16px_36px_rgba(52,86,187,0.12)]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span
                    aria-hidden
                    className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FD] text-sm font-black text-[#3456bb]"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-[15px] font-bold leading-7 text-[#101117]">
                    {h.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-7 text-[#55565A]">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
            {/* Main article body */}
            <div className="space-y-8">
              {content.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 shadow-[0_8px_24px_rgba(16,17,23,0.04)] sm:p-7"
                >
                  <h2 className="text-xl font-black leading-9 text-[#101117] sm:text-[1.35rem]">
                    {section.title}
                  </h2>
                  {section.paragraphs?.map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="mt-3 text-sm leading-8 text-[#55565A] sm:text-[15px] sm:leading-9"
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2.5 pr-1">
                      {section.bullets.map((b, i) => (
                        <li
                          key={b}
                          className="flex gap-2.5 text-sm leading-8 text-[#55565A] sm:text-[15px]"
                        >
                          {section.ordered ? (
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EEF2FD] text-xs font-black text-[#3456bb]">
                              {i + 1}
                            </span>
                          ) : (
                            <span
                              aria-hidden
                              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3456bb]"
                            />
                          )}
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.afterParagraphs?.map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="mt-3 text-sm leading-8 text-[#55565A] sm:text-[15px] sm:leading-9"
                    >
                      {p}
                    </p>
                  ))}
                  {section.subsections?.map((sub) => (
                    <div
                      key={sub.title}
                      className="mt-5 rounded-2xl border border-[#EEF1F8] bg-[#F8FAFE] p-4 sm:p-5"
                    >
                      <h3 className="text-base font-bold text-[#101117]">
                        {sub.href ? (
                          <Link
                            href={sub.href}
                            className="text-[#3456bb] transition-colors hover:underline"
                          >
                            {sub.title}
                          </Link>
                        ) : (
                          sub.title
                        )}
                      </h3>
                      {sub.paragraphs?.map((p) => (
                        <p
                          key={p.slice(0, 32)}
                          className="mt-2 text-sm leading-8 text-[#55565A]"
                        >
                          {p}
                        </p>
                      ))}
                      {sub.bullets && (
                        <ul className="mt-3 space-y-2 pr-1">
                          {sub.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex gap-2 text-sm leading-7 text-[#55565A]"
                            >
                              <span
                                aria-hidden
                                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3456bb]"
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  {section.links && section.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {section.links.map((link) => (
                        <Link
                          key={`${link.href}-${link.label}`}
                          href={link.href}
                          className="inline-flex items-center rounded-full border border-[#D5DCEB] bg-[#F8FAFE] px-4 py-2 text-[13px] font-medium text-[#3456bb] transition-colors hover:border-[#3456bb] hover:bg-[#EEF2FD]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* Steps */}
              <section
                id="steps"
                className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 sm:p-7"
              >
                <h2 className="text-xl font-black text-[#101117] sm:text-[1.35rem]">
                  مسیر رزرو کارشناسی در {name}
                </h2>
                <ol className="mt-6 space-y-4">
                  {content.steps.map((step, i) => (
                    <li
                      key={step.title}
                      className="flex gap-4 rounded-2xl border border-[#EEF1F8] bg-[#F8FAFE] p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#3456bb] text-sm font-black text-white">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-[#101117]">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-7 text-[#55565A]">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link
                  href={START_URL}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#3456bb] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2c4aa0] sm:w-auto"
                >
                  شروع رزرو کارشناسی
                </Link>
              </section>

              {/* Why us */}
              <section
                id="why-us"
                className="scroll-mt-28 rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 sm:p-7"
              >
                <h2 className="text-xl font-black text-[#101117] sm:text-[1.35rem]">
                  چرا کارماچک برای کارشناسی خودرو {name}؟
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {content.whyUs.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#EEF1F8] bg-[#F8FAFE] p-4"
                    >
                      <h3 className="font-bold text-[#101117]">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-7 text-[#55565A]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section
                id="faq"
                className="scroll-mt-28 rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 sm:p-7"
              >
                <h2 className="text-xl font-black text-[#101117] sm:text-[1.35rem]">
                  سوالات متداول کارشناسی خودرو {name}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="mt-4 w-full"
                  defaultValue="faq-0"
                >
                  {content.faqs.map((faq, i) => (
                    <AccordionItem
                      key={faq.question}
                      value={`faq-${i}`}
                      className="border-[#E8ECF4]"
                    >
                      <AccordionTrigger className="py-4 text-right text-[15px] font-bold leading-7 text-[#101117] hover:no-underline [&[data-state=open]]:text-[#3456bb]">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-8 text-[#55565A]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>

            {/* Sticky TOC / CTA sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <nav
                  aria-label="فهرست مطالب"
                  className="rounded-[1.35rem] border border-[#E2E8F4] bg-white p-4 shadow-[0_8px_24px_rgba(16,17,23,0.04)]"
                >
                  <p className="mb-3 text-xs font-bold text-[#6B6C70]">
                    در این صفحه
                  </p>
                  <ul className="space-y-1.5">
                    {content.sections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="block rounded-lg px-2.5 py-1.5 text-[12px] leading-6 text-[#55565A] transition-colors hover:bg-[#EEF2FD] hover:text-[#3456bb]"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href="#faq"
                        className="block rounded-lg px-2.5 py-1.5 text-[12px] leading-6 text-[#55565A] transition-colors hover:bg-[#EEF2FD] hover:text-[#3456bb]"
                      >
                        سوالات متداول
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="rounded-[1.35rem] bg-[#0B1F4A] p-5 text-white">
                  <p className="text-sm font-bold leading-7">
                    کارشناسی در {name} را همین حالا رزرو کنید
                  </p>
                  <p className="mt-2 text-xs leading-6 text-white/70">
                    آنلاین ثبت کنید؛ کارشناس در محل حاضر می‌شود.
                  </p>
                  <Link
                    href={START_URL}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white py-2.5 text-sm font-bold text-[#0B1F4A] transition-colors hover:bg-[#EEF2FD]"
                  >
                    شروع رزرو
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Nearby areas */}
          <section className="mt-12" aria-labelledby="nearby-heading">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  id="nearby-heading"
                  className="text-xl font-black text-[#101117]"
                >
                  {area.slug === "shargh-tehran"
                    ? "محله‌های تحت پوشش شرق تهران"
                    : "مناطق دیگر شرق تهران"}
                </h2>
                <p className="mt-1 text-sm text-[#6B6C70]">
                  لینک‌های مرتبط برای سئوی محلی و پیدا کردن محله‌ی نزدیک‌تر
                </p>
              </div>
              <Link
                href="/car-inspection-tehran"
                className="text-sm font-medium text-[#3456bb] hover:underline"
              >
                همه مناطق
              </Link>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {nearbyLinks.map((a) => (
                <Link
                  key={a.slug}
                  href={`/car-inspection-tehran/${a.slug}`}
                  className="rounded-full border border-[#D5DCEB] bg-white px-4 py-2 text-sm text-[#55565A] transition-all hover:border-[#3456bb] hover:text-[#3456bb] hover:shadow-[0_6px_16px_rgba(52,86,187,0.12)]"
                >
                  کارشناسی خودرو {a.name}
                </Link>
              ))}
            </div>
            {LOCAL_AREAS.length > nearbyLinks.length + 1 && (
              <p className="mt-3 text-xs text-[#9A9CA1]">
                پوشش خدمات در تمام محله‌های شرق تهران
              </p>
            )}
          </section>

          {/* Bottom CTA */}
          <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-[#0B1F4A] px-6 py-10 text-center sm:px-10 sm:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#4A7CE8]/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-[#3456bb]/35 blur-3xl"
            />
            <h2 className="relative text-xl font-black text-white sm:text-2xl">
              {content.closingTitle ??
                `همین حالا کارشناسی خودرو در ${name} را رزرو کنید`}
            </h2>
            <p className="relative mx-auto mt-3 max-w-2xl text-sm leading-8 text-white/75">
              {content.closingText ??
                `مشخصات خودرو را وارد کنید، محل را مشخص کنید و کارشناس کارماچک در ${name} حاضر می‌شود.`}
            </p>
            <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={START_URL}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#0B1F4A] transition-transform hover:-translate-y-0.5"
              >
                شروع رزرو کارشناسی
              </Link>
              <a
                href={PHONE_TEL}
                className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {COMPANY.phoneDisplay}
              </a>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
