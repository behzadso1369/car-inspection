import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DEALERS_HUB_FAQS,
  DEALERS_HUB_H1,
  DEALERS_HUB_STEPS,
} from "./dealer-hub-data";
import DealerRegistrationForm from "./DealerRegistrationForm";

const INSPECTION_URL = "/car-inspection";
const linkClass =
  "font-semibold text-[#3456bb] underline-offset-4 hover:underline";

export default function DealersLanding() {
  return (
    <main
      id="main-content"
      className="local-area-page max-w-full overflow-x-hidden font-IranSans text-[#101117] antialiased"
    >
      <article dir="rtl">
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
              <span className="text-white/90">ثبت‌نام نمایشگاه‌دار</span>
            </nav>

            <p className="mb-3 text-[12px] font-medium tracking-wide text-[#9BB6F0] sm:text-sm">
              کارماچک · همکاری با نمایشگاه‌های خودرو
            </p>
            <h1 className="text-[1.55rem] font-black leading-10 text-white sm:text-3xl sm:leading-[2.6rem]">
              {DEALERS_HUB_H1}
            </h1>
            <p className="mt-4 text-sm leading-8 text-white/80 sm:text-base sm:leading-9">
              فرم زیر یک درخواست همکاری می‌سازد. تا تأیید ادمین، حساب نمایشگاه
              ساخته نمی‌شود. پس از تأیید، با همان شماره موبایل از پرتال
              نمایشگاه وارد می‌شوید.
            </p>
          </div>
        </header>

        <div className="bg-[#F4F6FB]">
          <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
            <section className="rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 sm:p-7">
              <p className="text-sm leading-8 text-[#55565A] sm:text-[15px] sm:leading-9">
                برای آشنایی با{" "}
                <Link href="/" className={linkClass}>
                  خدمات و تیم کارماچک
                </Link>
                ، صفحه اصلی را ببینید. این صفحه مخصوص{" "}
                <strong className="text-[#101117]">ثبت درخواست نمایشگاه</strong>{" "}
                است؛ برای رزرو{" "}
                <Link href={INSPECTION_URL} className={linkClass}>
                  کارشناسی خودرو
                </Link>{" "}
                از مسیر جداگانه اقدام کنید.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-[#55565A]">
                <li className="flex gap-2">
                  <span className="text-[#3456bb]">۱.</span>
                  فرم کوتاه را ارسال کنید (شماره موبایل مالک = ورود بعدی با OTP).
                </li>
                <li className="flex gap-2">
                  <span className="text-[#3456bb]">۲.</span>
                  درخواست در صف بررسی می‌ماند؛ نتیجه از طریق تماس اعلام می‌شود.
                </li>
                <li className="flex gap-2">
                  <span className="text-[#3456bb]">۳.</span>
                  پس از تأیید، ورود از{" "}
                  <span dir="ltr" className="font-medium">
                    dealer.carmacheck.com
                  </span>{" "}
                  — بدون ثبت‌نام آزاد در پرتال.
                </li>
              </ul>
            </section>

            <div id="register">
              <DealerRegistrationForm />
            </div>

            <section className="rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 sm:p-7">
              <h2 className="text-xl font-black leading-9 text-[#101117]">
                مراحل از ثبت درخواست تا ورود پرتال
              </h2>
              <ol className="mt-4 list-decimal space-y-4 pr-5 text-sm leading-8 text-[#55565A] marker:font-bold marker:text-[#3456bb] sm:text-[15px]">
                {DEALERS_HUB_STEPS.map((step) => (
                  <li key={step.title}>
                    <strong className="text-[#101117]">{step.title}</strong>
                    <span className="mt-1 block">{step.description}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 sm:p-7">
              <h2 className="text-xl font-black leading-9 text-[#101117]">
                پرسش‌های متداول
              </h2>
              <Accordion type="single" collapsible className="mt-4 w-full">
                {DEALERS_HUB_FAQS.map((faq, index) => (
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
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
