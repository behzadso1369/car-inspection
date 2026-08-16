import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { FaqItem } from "@/lib/faq-data";
import type { ReactNode } from "react";

const INSPECTION_HREF = "/car-inspection";

const INSPECTION_LINK_PHRASES = [
  "رزرو کارشناسی ماشین",
  "شروع کارشناسی",
] as const;

function linkifyInspectionPhrases(text: string): ReactNode[] {
  const pattern = new RegExp(
    `(${INSPECTION_LINK_PHRASES.map((p) =>
      p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    ).join("|")})`,
    "g"
  );

  return text.split(pattern).map((part, index) => {
    if (
      INSPECTION_LINK_PHRASES.includes(
        part as (typeof INSPECTION_LINK_PHRASES)[number]
      )
    ) {
      return (
        <Link
          key={`${part}-${index}`}
          href={INSPECTION_HREF}
          className="font-semibold text-[#3456bb] hover:underline"
        >
          {part}
        </Link>
      );
    }
    return <span key={`text-${index}`}>{part}</span>;
  });
}

type FaqPreviewSectionProps = {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
  showViewAll?: boolean;
  viewAllHref?: string;
  className?: string;
  limit?: number;
  expandInline?: boolean;
};

export function FaqPreviewSection({
  title = "پرسش‌های متداول",
  subtitle = "پاسخ سوالات رایج کاربران درباره خدمات کارماچک",
  items,
  showViewAll = true,
  viewAllHref = "/faq",
  className = "",
  limit,
  expandInline = false,
}: FaqPreviewSectionProps) {
  const validItems = items.filter((item) => item?.Question && item?.Answer);
  const visibleItems =
    limit && !expandInline ? validItems.slice(0, limit) : validItems;

  if (!visibleItems.length) return null;

  return (
    <section
      dir="rtl"
      className={`font-IranSans px-4 py-10 md:py-14 ${className}`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center md:mb-8">
          <Badge className="mb-3 border border-[#3456bb]/20 bg-[#EEF2FD] px-4 py-1.5 text-[#3456bb]">
            سوالات پرتکرار
          </Badge>
          <h2 className="text-xl font-black text-[#101117] md:text-2xl lg:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#6B6C70] md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="w-full space-y-3">
          {visibleItems.map((item, index) => (
            <details
              key={String(item.Id ?? index)}
              className="group overflow-hidden rounded-3xl border border-[#E8ECF4] bg-white px-4 shadow-[0_4px_18px_rgba(16,17,23,0.04)] open:border-[#3456bb]/30 open:bg-gradient-to-b open:from-white open:to-[#F8FAFF]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-right text-sm font-bold leading-7 text-[#101117] marker:content-none md:text-base group-open:text-[#3456bb] [&::-webkit-details-marker]:hidden">
                <span className="flex items-start gap-3 text-right">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF2FD] text-xs font-black text-[#3456bb]">
                    {index + 1}
                  </span>
                  <span>{item.Question}</span>
                </span>
              </summary>
              <div className="border-t border-[#EEF2FD] pb-4 text-right text-sm leading-8 text-[#55565A] md:text-base">
                {linkifyInspectionPhrases(item.Answer)}
              </div>
            </details>
          ))}
        </div>

        {showViewAll && !expandInline ? (
          <div className="mt-8 flex justify-center">
            <Link
              href={viewAllHref}
              className="inline-flex items-center justify-center rounded-2xl border border-[#3456bb]/25 bg-white px-6 py-3 text-sm font-semibold text-[#3456bb] shadow-[0_4px_16px_rgba(53,99,233,0.08)] transition hover:border-[#3456bb]/40 hover:bg-[#EEF2FD]"
            >
              مشاهده همه
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
