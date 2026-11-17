import Link from "next/link";
import {
  InstallmentBottomCta,
  InstallmentExampleTable,
  InstallmentFaqSection,
  InstallmentHubHero,
  P,
  SectionCard,
  SubHeading,
  installmentLinkClass,
} from "@/components/installment-hub/InstallmentHubUi";
import { COMPANY } from "@/lib/seo";
import {
  MOTORCYCLE_INSTALLMENT_FAQS,
  MOTORCYCLE_INSTALLMENT_H1,
  MOTORCYCLE_INSTALLMENT_STEPS,
  MOTORCYCLE_INSTALLMENT_TABLE_ROWS,
} from "./motorcycle-installment-data";

const MOTO_URL = "/motorcycle-inspection";
const CONTACT_URL = "/contact-us";
const PHONE_DISPLAY = "۰۲۱۹۱۰۹۰۲۸۳";

export default function MotorcycleInstallmentLanding() {
  return (
    <main
      id="main-content"
      className="local-area-page max-w-full overflow-x-hidden font-IranSans text-[#101117] antialiased"
    >
      <article dir="rtl">
        <InstallmentHubHero
          breadcrumbLabel="کارشناسی قسطی موتورسیکلت"
          eyebrow="کارماچک · کارشناسی موتور با دیجی‌پی"
          h1={MOTORCYCLE_INSTALLMENT_H1}
          lead="با کارشناسی قسطی موتور در کارماچک، موتورسیکلت را پیش از معامله بررسی کنید و هزینه خدمت را با اعتبار چهارقسطه دیجی‌پی بپردازید."
          intro="کارشناسی موتورسیکلت در مرکز کارماچک در شرق تهران انجام می‌شود. با هر کارشناسی، اعتباری متناسب با مبلغ آن به کیف پول کارماچک اضافه می‌شود که برای کاهش هزینه کارشناسی‌های بعدی قابل استفاده است."
          primaryCta={{
            label: "مشاهده مدل‌ها و ثبت درخواست کارشناسی موتور",
            href: MOTO_URL,
          }}
        />

        <div className="bg-[#F4F6FB]">
          <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
            <SectionCard
              id="what"
              title="کارشناسی قسطی موتورسیکلت چیست و چگونه انجام می‌شود؟"
            >
              <P>
                کارشناسی اقساطی موتورسیکلت، روشی برای پرداخت هزینه بررسی فنی و
                بدنه موتور است. پس از انتخاب خدمت و تأیید پرداخت، موتورسیکلت در
                نوبت هماهنگ‌شده به مرکز کارماچک آورده می‌شود و ارزیابی در محدوده
                خدمت انتخابی انجام می‌گیرد.
              </P>
            </SectionCard>

            <SectionCard
              id="who"
              title="چه کسانی می‌توانند هزینه کارشناسی موتور را اقساطی پرداخت کنند؟"
            >
              <P>
                خریدار موتور کارکرده، مالک متقاضی بررسی و فروشنده می‌توانند این
                روش را بررسی کنند. استفاده به فعال‌بودن اعتبار چهارقسطه و تأیید
                تراکنش در دیجی‌پی بستگی دارد.
              </P>
            </SectionCard>

            <SectionCard
              id="budget"
              title="پرداخت اقساطی چه کمکی به مدیریت هزینه‌های کارشناسی می‌کند؟"
            >
              <P>
                تقسیم هزینه کارشناسی، مبلغ پرداختی در شروع را کمتر می‌کند. علاوه
                بر این، با هر کارشناسی در مرکز کارماچک، درصدی از مبلغ فاکتور به
                عنوان اعتبار هدیه در کیف پول شما شارژ می‌شود؛ مخصوصاً وقتی پس از
                بازدید اول از خرید منصرف می‌شوید و به سراغ موتور بعدی می‌روید.
              </P>
            </SectionCard>

            <SectionCard
              id="digipay"
              title="کارشناسی موتورسیکلت با اعتبار چهارقسطه دیجی‌پی"
            >
              <SubHeading>اعتبار ۴ قسطه دیجی‌پی چیست؟</SubHeading>
              <P>
                امکان دریافت خدمت و پرداخت بهای آن در چهار قسط را فراهم می‌کند.
                در طرح چهارقسطه، ۲۵ درصد مبلغ هنگام خرید پرداخت می‌شود و
                باقی‌مانده در سه قسط ماهانه تسویه خواهد شد.
              </P>
              <SubHeading>شرایط پرداخت با دیجی‌پی</SubHeading>
              <ul className="mt-4 list-disc space-y-2 pr-5 text-sm leading-8 text-[#55565A] sm:text-[15px]">
                <li>ثبت‌نام با شماره همراه خود و فعال‌سازی اعتبار</li>
                <li>فعال و قابل استفاده بودن طرح چهارقسطه</li>
                <li>اعتبار کافی برای پرداخت سفارش</li>
              </ul>
              <P>
                مبلغ کارشناسی را در مسیر ثبت درخواست بررسی کنید و پیش از تأیید
                درگاه، مبلغ قسط اول و مجموع پرداخت‌ها را بخوانید.
              </P>
            </SectionCard>

            <SectionCard
              id="pricing"
              title="هزینه کارشناسی قسطی موتورسیکلت چقدر است؟"
            >
              <P>
                هزینه پس از مشخص‌شدن مدل و خدمت روشن می‌شود. مدل موتورسیکلت و نوع
                خدمت انتخابی، مبنای استعلام قیمت هستند.
              </P>
              <SubHeading>مبلغ هر قسط چگونه محاسبه می‌شود؟</SubHeading>
              <P>مبلغ هر قسط = مبلغ نهایی مشمول تقسیط ÷ ۴</P>
              <SubHeading>نمونه محاسبه در ۴ قسط</SubHeading>
              <P>فرض کنید مبلغ نهایی مشمول تقسیط ۱٬۲۰۰٬۰۰۰ تومان باشد:</P>
              <InstallmentExampleTable
                rows={[...MOTORCYCLE_INSTALLMENT_TABLE_ROWS]}
                totalLabel="مجموع"
                totalAmount="۱٬۲۰۰٬۰۰۰ تومان"
                caption="این جدول فقط مثال محاسباتی است و تعرفه کارماچک محسوب نمی‌شود."
              />
            </SectionCard>

            <SectionCard id="wallet" title="اعتبار هدیه کیف پول با هر کارشناسی">
              <P>
                با هر کارشناسی، مبلغی متناسب با هزینه آن به‌صورت اعتبار هدیه به
                کیف پول کارماچک اضافه می‌شود. اعتبار دیجی‌پی برای تقسیط پرداخت
                سفارش است؛ هدیه کیف پول به کاهش هزینه کارشناسی بعدی کمک می‌کند.
              </P>
            </SectionCard>

            <SectionCard
              id="how-to"
              title="مراحل ثبت درخواست کارشناسی اقساطی موتور در کارماچک"
            >
              <ol className="mt-4 list-decimal space-y-4 pr-5 text-sm leading-8 text-[#55565A] marker:font-bold marker:text-[#3456bb] sm:text-[15px]">
                {MOTORCYCLE_INSTALLMENT_STEPS.map((step) => (
                  <li key={step.title}>
                    <strong className="text-[#101117]">{step.title}.</strong>{" "}
                    {step.description}
                  </li>
                ))}
              </ol>
            </SectionCard>

            <SectionCard
              id="center"
              title="کارشناسی قسطی موتورسیکلت در شرق تهران"
            >
              <P>
                پس از رزرو به مرکز کارماچک در محدوده رسالت مراجعه کنید. نشانی:{" "}
                {COMPANY.streetAddress}. تلفن هماهنگی: {PHONE_DISPLAY}. برای
                تماس،{" "}
                <Link href={CONTACT_URL} className={installmentLinkClass}>
                  صفحه ارتباط با کارماچک
                </Link>{" "}
                را ببینید.
              </P>
            </SectionCard>

            <SectionCard
              id="coverage"
              title="چه موتورسیکلت‌هایی را می‌توان به‌صورت اقساطی کارشناسی کرد؟"
            >
              <SubHeading>موتور دست‌دوم و کارکرده</SubHeading>
              <P>
                گزارش کارشناسی کمک می‌کند وضعیت وسیله را با توضیحات فروشنده
                مقایسه کنید.
              </P>
              <SubHeading>موتورسیکلت صفر هنگام تحویل</SubHeading>
              <P>
                تطابق مشخصات، وضعیت ظاهری و عملکردهای قابل بررسی اهمیت دارد.
              </P>
              <SubHeading>دنده‌ای و اسکوتر</SubHeading>
              <P>
                نام مدل و نوع انتقال قدرت را دقیق اعلام کنید. جزئیات بیشتر در{" "}
                <Link href={MOTO_URL} className={installmentLinkClass}>
                  صفحه کارشناسی موتورسیکلت
                </Link>
                .
              </P>
            </SectionCard>

            <SectionCard
              id="report"
              title="پس از کارشناسی قسطی موتور چه گزارشی دریافت می‌کنید؟"
            >
              <P>
                گزارش شامل مشخصات وسیله، یافته‌های فنی و بدنه، ایرادها و
                محدودیت‌های بررسی است. زمان تحویل گزارش را هنگام رزرو مشخص
                کنید؛ دریافت آن به پایان اقساط موکول نمی‌شود.
              </P>
            </SectionCard>

            <InstallmentFaqSection
              title="سؤال‌های متداول درباره کارشناسی قسطی موتورسیکلت"
              faqs={[...MOTORCYCLE_INSTALLMENT_FAQS]}
            />

            <InstallmentBottomCta
              title="رزرو کارشناسی موتورسیکلت با پرداخت چهارقسطه"
              body="مدل موتور را انتخاب کنید، هزینه خدمت را ببینید و امکان پرداخت دیجی‌پی را برای سفارش خود بررسی کنید."
              primaryCta={{
                label: "ثبت درخواست کارشناسی موتور",
                href: MOTO_URL,
              }}
            />
          </div>
        </div>
      </article>
    </main>
  );
}