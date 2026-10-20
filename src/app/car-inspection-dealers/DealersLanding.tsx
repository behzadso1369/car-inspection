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
  DEALERS_HUB_INTRO,
  DEALERS_HUB_LEAD,
  DEALERS_HUB_PLANS,
  DEALERS_HUB_STEPS,
  DEALERS_PORTAL_URL,
} from "./dealer-hub-data";
import DealerRegistrationForm from "./DealerRegistrationForm";

const INSPECTION_URL = "/car-inspection";
const PRICE_URL = "/car-price";
const REGISTER_HASH = "#register";
const linkClass =
  "font-semibold text-[#3456bb] underline-offset-4 hover:underline";

function SectionCard({
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

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-sm leading-8 text-[#55565A] sm:text-[15px] sm:leading-9">
      {children}
    </p>
  );
}

function CtaPair({ primaryLabel }: { primaryLabel: string }) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <a
        href={DEALERS_PORTAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0B1F4A] transition-colors hover:bg-[#F3F6FD]"
      >
        {primaryLabel}
      </a>
      <a
        href={REGISTER_HASH}
        className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
      >
        ثبت نام نمایشگاه داران
      </a>
    </div>
  );
}

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
              <span className="text-white/90">پنل نمایشگاه داران</span>
            </nav>

            <p className="mb-3 text-[12px] font-medium tracking-wide text-[#9BB6F0] sm:text-sm">
              کارماچک · کارشناسی خودرو ویژه نمایشگاه داران
            </p>
            <h1 className="text-[1.55rem] font-black leading-10 text-white sm:text-3xl sm:leading-[2.6rem]">
              {DEALERS_HUB_H1}
            </h1>
            <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5">
              <p className="text-sm leading-8 text-white/90 sm:text-base sm:leading-9">
                {DEALERS_HUB_LEAD}
              </p>
            </div>
            <CtaPair primaryLabel="ورود به پنل نمایشگاه داران" />
            <p className="mt-4 text-sm leading-8 text-white/70 sm:text-[15px] sm:leading-9">
              {DEALERS_HUB_INTRO}
            </p>
          </div>
        </header>

        <div className="bg-[#F4F6FB]">
          <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
            <SectionCard
              id="reports"
              title="گزارش های کارشناسی نمایشگاه تان، همیشه در دسترس"
            >
              <P>
                وقتی چند خودرو برای خرید، فروش یا تحویل به مشتری کارشناسی
                می شوند، دسترسی منظم به نتیجه هر بررسی اهمیت بیشتری پیدا می کند.
                در پنل کارماچک می توانید گزارش های کارشناسی خودروهای نمایشگاه تان
                را یک جا ببینید و هنگام نیاز، به سوابق آن ها مراجعه کنید.
              </P>
              <P>
                این دسترسی به شما کمک می کند پیش از تصمیم گیری درباره یک خودرو،
                نتیجه بررسی آن را مرور کنید و توضیح وضعیت خودرو به مشتری را بر
                پایه اطلاعات ثبت شده پیش ببرید.
              </P>
            </SectionCard>

            <SectionCard
              id="usage"
              title="تعداد کارشناسی ها و مصرف ماهانه اعتبار را ببینید"
            >
              <P>
                برای برنامه ریزی هزینه های کارشناسی، هم تعداد خودروهای
                بررسی شده مهم است و هم اعتباری که برای آن ها مصرف شده است. پنل
                نمایشگاه داران این اطلاعات را در اختیار شما می گذارد:
              </P>
              <ul className="mt-4 space-y-3 text-sm leading-8 text-[#55565A] sm:text-[15px]">
                <li>
                  <strong className="text-[#101117]">
                    تعداد کارشناسی های ماهانه:
                  </strong>{" "}
                  در هر ماه چند خودرو کارشناسی شده است؟
                </li>
                <li>
                  <strong className="text-[#101117]">
                    میزان مصرف ماهانه اعتبار:
                  </strong>{" "}
                  چه مقدار از اعتبار حساب در همان ماه استفاده شده است؟
                </li>
                <li>
                  <strong className="text-[#101117]">موجودی حساب:</strong> چه
                  میزان اعتبار برای ادامه استفاده از خدمات دارید؟
                </li>
              </ul>
              <P>
                با مرور این اطلاعات، می توانید نیاز نمایشگاه به شارژ مجدد را بهتر
                برآورد کنید و طرح شارژ را متناسب با مصرف خود انتخاب کنید.
              </P>
            </SectionCard>

            <SectionCard
              id="credit"
              title="اعتبار حساب را شارژ کنید و اعتبار هدیه بگیرید"
            >
              <P>
                در طرح های شارژ پنل نمایشگاه داران، مبلغی به عنوان اعتبار هدیه به
                شارژ شما اضافه می شود؛ بنابراین اعتبار نهایی حساب از مبلغ پرداختی
                بیشتر خواهد بود.
              </P>

              <h3 className="mt-6 text-base font-bold text-[#101117] sm:text-lg">
                طرح های شارژ اعتبار نمایشگاه داران
              </h3>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-[#E2E8F4]">
                <table className="w-full min-w-[36rem] border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#F0F4FC] text-[#101117]">
                      <th className="px-3 py-3 text-right font-bold">طرح</th>
                      <th className="px-3 py-3 text-right font-bold">
                        مبلغ پرداختی
                      </th>
                      <th className="px-3 py-3 text-right font-bold">
                        اعتبار هدیه شارژ
                      </th>
                      <th className="px-3 py-3 text-right font-bold">
                        مجموع اعتبار دریافتی
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEALERS_HUB_PLANS.map((plan) => (
                      <tr
                        key={plan.name}
                        className="border-t border-[#E2E8F4] text-[#55565A]"
                      >
                        <td className="px-3 py-3 font-bold text-[#101117]">
                          {plan.name}
                        </td>
                        <td className="px-3 py-3" dir="ltr">
                          {plan.paid}
                        </td>
                        <td className="px-3 py-3" dir="ltr">
                          {plan.gift}
                        </td>
                        <td className="px-3 py-3 font-semibold text-[#101117]" dir="ltr">
                          {plan.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <P>
                برای مثال، در طرح VIP با پرداخت ۴۰ میلیون تومان، مجموعاً ۴۶
                میلیون تومان اعتبار دریافت می کنید؛ یعنی ۶ میلیون تومان اعتبار
                اضافه برای استفاده از خدمات کارشناسی.
              </P>
              <P>
                طرح مناسب را بر اساس مصرف کارشناسی نمایشگاه انتخاب کنید. اگر
                به تازگی همکاری را شروع کرده اید، مصرف اولیه می تواند مبنای انتخاب
                شارژ بعدی باشد؛ اگر به طور مستمر خودرو کارشناسی می کنید، گزارش
                مصرف ماهانه به برآورد دقیق تر اعتبار موردنیاز کمک می کند.
              </P>
              <P>
                برای بررسی طرح های فعال، وارد بخش «کیف پول و اعتبار» پنل شوید.
              </P>
            </SectionCard>

            <SectionCard
              id="bonus-credit"
              title="اعتبار اضافه به ازای کارشناسی هر خودرو"
            >
              <P>
                علاوه بر هدیه شارژ، در طرح همکاری نمایشگاه داران، به ازای
                کارشناسی هر خودرو نیز مطابق شرایط طرح، درصدی اعتبار اضافه دریافت
                می کنید. میزان این اعتبار و شرایط تعلق آن را پیش از شروع همکاری
                از تیم کارماچک بپرسید.
              </P>
              <div className="mt-5">
                <a
                  href={DEALERS_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#3456bb] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2c4aa0]"
                >
                  ورود به پنل و مشاهده طرح های شارژ
                </a>
              </div>
            </SectionCard>

            <SectionCard
              id="support"
              title="پشتیبانی کارشناسی ها و حساب را از طریق تیکت پیگیری کنید"
            >
              <P>
                اگر درباره گزارش یک خودرو، اعتبار حساب یا نحوه استفاده از پنل
                پرسشی دارید، از داخل حساب نمایشگاه تیکت ثبت کنید.
              </P>
              <P>
                برای اینکه موضوع روشن تر بررسی شود، در متن تیکت مشخص کنید درخواست
                مربوط به کدام خودرو، کارشناسی یا پرداخت است و چه مسئله ای نیاز به
                پیگیری دارد. توضیح دقیق از ابتدا، به کاهش رفت وبرگشت برای
                روشن شدن موضوع کمک می کند.
              </P>
            </SectionCard>

            <SectionCard id="onsite" title="کارشناسی خودرو در محل نمایشگاه">
              <P>
                کارماچک امکان کارشناسی خودرو در محل نمایشگاه را در تهران فراهم
                کرده است. زمان حضور کارشناس بر اساس آدرس و ظرفیت هماهنگ می شود و
                جزئیات بررسی به نوع خدمت انتخابی بستگی دارد. بررسی می تواند شامل
                رنگ و بدنه، شاسی، بخش های فنی، دیاگ و آپشن ها باشد.
              </P>
              <P>
                برای آشنایی با دامنه خدمات و شرایط محل، صفحه{" "}
                <Link href={INSPECTION_URL} className={linkClass}>
                  کارشناسی خودرو در محل
                </Link>{" "}
                را ببینید.
              </P>
              <P>
                پیش از حضور کارشناس، خودرو را در فضایی با نور و دسترسی مناسب قرار
                دهید و امکان بررسی اطراف آن را فراهم کنید. این آمادگی به انجام
                بهتر بررسی کمک می کند.
              </P>
              <P>
                برای برآورد اولیه ارزش خودرو نیز می توانید از{" "}
                <Link href={PRICE_URL} className={linkClass}>
                  محاسبه قیمت خودرو کارکرده
                </Link>{" "}
                استفاده کنید و نتیجه را در کنار گزارش کارشناسی و شرایط واقعی
                معامله بسنجید.
              </P>
              <div className="mt-5">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-[#0B1F4A] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#122B58]"
                >
                  کارماچک
                </Link>
              </div>
            </SectionCard>

            <SectionCard
              id="how-to"
              title="چطور از پنل نمایشگاه داران استفاده کنید؟"
            >
              <ol className="mt-4 list-decimal space-y-4 pr-5 text-sm leading-8 text-[#55565A] marker:font-bold marker:text-[#3456bb] sm:text-[15px]">
                {DEALERS_HUB_STEPS.map((step) => (
                  <li key={step.title}>
                    <strong className="text-[#101117]">{step.title}.</strong>{" "}
                    {step.description}
                  </li>
                ))}
              </ol>
            </SectionCard>

            <div id="register" className="scroll-mt-28">
              <DealerRegistrationForm />
            </div>

            <SectionCard id="faq" title="پرسش های متداول نمایشگاه داران">
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
            </SectionCard>

            <section className="rounded-[1.75rem] bg-[#0B1F4A] p-5 text-white sm:p-7">
              <h2 className="text-xl font-black leading-9 sm:text-[1.35rem]">
                مدیریت کارشناسی های نمایشگاه را از همین جا شروع کنید
              </h2>
              <p className="mt-3 text-sm leading-8 text-white/75 sm:text-[15px] sm:leading-9">
                گزارش خودروها را یک جا ببینید، مصرف ماهانه را زیر نظر داشته باشید
                و با انتخاب طرح شارژ مناسب، برای کارشناسی های بعدی اعتبار آماده
                کنید.
              </p>
              <CtaPair primaryLabel="ورود به پنل نمایشگاه داران" />
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
