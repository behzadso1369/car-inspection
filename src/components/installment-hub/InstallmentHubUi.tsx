import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const installmentLinkClass =
  "font-semibold text-[#3456bb] underline-offset-4 hover:underline";

export function SectionCard({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 sm:p-7"
    >
      <h2 className="text-xl font-black leading-9 text-[#101117] sm:text-[1.35rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 text-base font-bold text-[#101117] sm:text-lg">
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-sm leading-8 text-[#55565A] sm:text-[15px] sm:leading-9">
      {children}
    </p>
  );
}

export function InstallmentExampleTable({
  rows,
  totalLabel,
  totalAmount,
  caption,
}: {
  rows: { label: string; when: string; amount: string }[];
  totalLabel: string;
  totalAmount: string;
  caption: string;
}) {
  return (
  <>
    <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E2E8F4]">
      <table className="w-full min-w-[20rem] border-collapse text-sm">
        <thead>
          <tr className="bg-[#F0F4FC] text-[#101117]">
            <th className="px-3 py-3 text-right font-bold">نوبت پرداخت</th>
            <th className="px-3 py-3 text-right font-bold">زمان پرداخت</th>
            <th className="px-3 py-3 text-right font-bold">مبلغ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8ECF4]">
          {rows.map((row) => (
            <tr key={row.label} className="bg-white">
              <td className="px-3 py-3 font-medium text-[#101117]">{row.label}</td>
              <td className="px-3 py-3 text-[#55565A]">{row.when}</td>
              <td className="px-3 py-3 text-[#55565A]">{row.amount}</td>
            </tr>
          ))}
          <tr className="bg-[#F8FAFF]">
            <td className="px-3 py-3 font-bold text-[#101117]" colSpan={2}>
              {totalLabel}
            </td>
            <td className="px-3 py-3 font-bold text-[#101117]">{totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="mt-3 text-xs leading-7 text-[#6B6C70] sm:text-sm">{caption}</p>
  </>
  );
}

export function InstallmentHubHero({
  breadcrumbLabel,
  eyebrow,
  h1,
  lead,
  primaryCta,
  secondaryCta,
  intro,
}: {
  breadcrumbLabel: string;
  eyebrow: string;
  h1: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-[#D8E0F0] bg-[#0B1F4A]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
              radial-gradient(ellipse 90% 70% at 85% -10%, rgba(74, 124, 232, 0.38), transparent 55%),
              linear-gradient(165deg, #0B1F4A 0%, #122B58 45%, #16366C 100%)
            `,
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
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
          <span className="text-white/90">{breadcrumbLabel}</span>
        </nav>

        <p className="mb-3 text-[12px] font-medium tracking-wide text-[#9BB6F0] sm:text-sm">
          {eyebrow}
        </p>
        <h1 className="text-[1.45rem] font-black leading-10 text-white sm:text-3xl sm:leading-[2.6rem]">
          {h1}
        </h1>
        <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5">
          <p className="text-sm leading-8 text-white/90 sm:text-base sm:leading-9">
            {lead}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0B1F4A] transition-colors hover:bg-[#F3F6FD]"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta ? (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
            >
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
        {intro ? (
          <p className="mt-4 text-sm leading-8 text-white/70 sm:text-[15px] sm:leading-9">
            {intro}
          </p>
        ) : null}
      </div>
    </header>
  );
}

export function InstallmentFaqSection({
  title,
  faqs,
}: {
  title: string;
  faqs: { question: string; answer: string }[];
}) {
  return (
    <SectionCard id="faq" title={title}>
      <Accordion type="single" collapsible className="mt-4 w-full">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`faq-${index}`}
            className="border-[#E2E8F4]"
          >
            <AccordionTrigger className="py-4 text-right text-[15px] font-bold leading-7 text-[#101117] hover:no-underline [&[data-state=open]]:text-[#3456bb]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-8 text-[#55565A] sm:text-[15px]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionCard>
  );
}

export function InstallmentBottomCta({
  title,
  body,
  primaryCta,
}: {
  title: string;
  body: string;
  primaryCta: { label: string; href: string };
}) {
  return (
    <section className="rounded-[1.75rem] bg-[#0B1F4A] p-5 text-white sm:p-7">
      <h2 className="text-xl font-black leading-9 sm:text-[1.35rem]">{title}</h2>
      <p className="mt-3 text-sm leading-8 text-white/75 sm:text-[15px] sm:leading-9">
        {body}
      </p>
      <Link
        href={primaryCta.href}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0B1F4A] transition-colors hover:bg-[#F3F6FD]"
      >
        {primaryCta.label}
      </Link>
    </section>
  );
}