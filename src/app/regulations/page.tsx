import { Metadata } from "next";
import { FileText, ShieldCheck } from "lucide-react";
import { serverApiHelper } from "@/helper/server-fetcher";
import { parseRegulationsContent } from "@/lib/regulations-content";
import { RegulationsAccordion } from "./RegulationsAccordion";

// ISR - Incremental Static Regeneration (revalidate هر 1 ساعت)
// قوانین و مقررات نادراً تغییر می‌کنند، پس ISR مناسب است
export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "قوانین و مقررات | شرایط استفاده از خدمات کارماچک",
  description:
    "قوانین و مقررات استفاده از خدمات کارشناسی کارماچک، حریم خصوصی، شرایط پرداخت، ضمانت و قوانین لغو یا تغییر نوبت کارشناسی",
  keywords: [
    "قوانین کارماچک",
    "مقررات کارشناسی",
    "شرایط استفاده",
    "حریم خصوصی",
    "ضمانت کارشناسی",
    "کارشناسی خودرو",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/regulations`,
  },
  openGraph: {
    title: "قوانین و مقررات کارماچک",
    description: "قوانین و مقررات استفاده از خدمات کارشناسی خودرو",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/regulations`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "قوانین و مقررات کارماچک",
    description: "شرایط استفاده از خدمات کارشناسی",
  },
  robots: {
    index: true,
    follow: true,
  },
};

async function getRegulationsData() {
  const data = await serverApiHelper.get("GetRegulationsData", 3600);
  return data || { Regulations: [] };
}

export default async function RegulationsPage() {
  const regulationsResponse = await getRegulationsData();
  const regulationsData = regulationsResponse?.Regulations || [];
  const rawContent = regulationsData?.[0]?.Content || "";
  const parsed = parseRegulationsContent(rawContent);

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#EEF3FF_0%,#FFFFFF_28%,#F7F8FA_100%)] font-IranSans"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#416CEA]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-[#416CEA]/[0.07] blur-3xl"
      />

      <section className="relative mx-auto max-w-3xl px-4 pb-8 pt-10 lg:pt-14">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#416CEA]/20 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#416CEA] shadow-sm backdrop-blur">
          <ShieldCheck size={14} strokeWidth={2.5} />
          سند رسمی شرایط استفاده
        </div>

        <h1 className="text-2xl font-extrabold leading-10 tracking-tight text-[#101117] lg:text-4xl lg:leading-[3.25rem]">
          قوانین و مقررات کارماچک
        </h1>

        {parsed.documentTitle ? (
          <p className="mt-3 text-sm font-medium leading-7 text-[#55565A] lg:text-base">
            {parsed.documentTitle}
          </p>
        ) : null}

        {parsed.updatedAt ? (
          <p className="mt-3 text-xs text-[#6B6C70] lg:text-sm">
            آخرین به‌روزرسانی:{" "}
            <span className="font-semibold text-[#101117]">{parsed.updatedAt}</span>
          </p>
        ) : null}

        {parsed.intro ? (
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#55565A] lg:text-base lg:leading-9">
            {parsed.intro}
          </p>
        ) : null}
      </section>

      <section className="relative mx-auto max-w-3xl px-4 pb-16">
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#416CEA]/20 bg-[#416CEA]/[0.06] px-4 py-4 shadow-[0_8px_28px_rgba(65,108,234,0.08)]">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#416CEA] text-white shadow-[0_8px_18px_rgba(65,108,234,0.35)]">
            <FileText size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#101117]">پذیرش مقررات</p>
            <p className="mt-1 text-xs leading-7 text-[#55565A] lg:text-sm">
              ورود شما از طریق شماره همراه به منزله تایید قوانین و مقررات کارماچک
              می‌باشد.
            </p>
          </div>
        </div>

        {parsed.sections.length > 0 ? (
          <RegulationsAccordion sections={parsed.sections} />
        ) : (
          <div className="rounded-3xl border border-dashed border-[#D0D4DD] bg-white px-6 py-12 text-center text-sm text-[#6B6C70]">
            در حال حاضر متن قوانین در دسترس نیست.
          </div>
        )}
      </section>
    </main>
  );
}
