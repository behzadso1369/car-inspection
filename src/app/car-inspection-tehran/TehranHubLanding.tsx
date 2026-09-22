import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LOCAL_AREAS } from "@/lib/local-areas";
import { COMPANY } from "@/lib/seo";
import {
  TEHRAN_HUB_FAQS,
  TEHRAN_HUB_H1,
  TEHRAN_HUB_STEPS,
  TEHRAN_HUB_TOC,
} from "./tehran-hub-data";

const START_URL = "/car-inspection";
const PRICE_URL = "/car-price";
const POPULAR_URL = "/car-inspection-most-popular";
const BLOG_URL = "/blog";
const PHONE_TEL = "tel:+982191001740";
const linkClass = "font-semibold text-[#3456bb] underline-offset-4 hover:underline";

const highlights = [
  { k: "در محل", v: "پارکینگ، نمایشگاه یا محل توافق" },
  { k: "شرق تهران", v: "هماهنگی سریع‌تر از مرکز رسالت" },
  { k: "گزارش", v: "ایراد، هزینه و اثر روی معامله" },
  { k: "پیش از بیعانه", v: "تصمیم قبل از تعهد مالی" },
];

function AreaLink({
  slug,
  children,
}: {
  slug: string;
  children: string;
}) {
  return (
    <Link href={`/car-inspection-tehran/${slug}`} className={linkClass}>
      {children}
    </Link>
  );
}

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
      className="scroll-mt-28 rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 shadow-[0_8px_24px_rgba(16,17,23,0.04)] sm:p-7"
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

function SubBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-[#EEF1F8] bg-[#F8FAFE] p-4 sm:p-5">
      <h3 className="text-base font-bold text-[#101117]">{title}</h3>
      {children}
    </div>
  );
}

function ActionBox({
  kicker,
  title,
  body,
  href,
  label,
  tone = "navy",
}: {
  kicker?: string;
  title: string;
  body: string;
  href: string;
  label: string;
  tone?: "navy" | "sky" | "emerald";
}) {
  const wrap =
    tone === "sky"
      ? "border-[#C9D8F7] bg-gradient-to-l from-[#EEF3FD] via-white to-white"
      : tone === "emerald"
        ? "border-[#C7E7D4] bg-gradient-to-l from-[#EEFBF3] via-white to-white"
        : "border-transparent bg-[#0B1F4A] text-white";
  const kickerCls =
    tone === "navy" ? "text-[#9BB6F0]" : "text-[#3456bb]";
  const titleCls = tone === "navy" ? "text-white" : "text-[#101117]";
  const bodyCls = tone === "navy" ? "text-white/75" : "text-[#55565A]";
  const btn =
    tone === "navy"
      ? "bg-white text-[#0B1F4A] hover:bg-[#F3F6FD]"
      : "bg-[#3456bb] text-white hover:bg-[#2c4aa0]";

  return (
    <aside className={`relative mt-6 overflow-hidden rounded-[1.6rem] border p-5 sm:p-6 ${wrap}`}>
      {tone === "navy" && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-24 w-24 -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#4A7CE8]/30 blur-2xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 translate-x-1/3 translate-y-1/3 rounded-full bg-[#3456bb]/35 blur-2xl"
          />
        </>
      )}
      <div className="relative">
        {kicker ? (
          <p className={`text-xs font-bold ${kickerCls}`}>{kicker}</p>
        ) : null}
        <p className={`mt-1 text-lg font-black leading-8 ${titleCls}`}>{title}</p>
        <p className={`mt-2 text-sm leading-8 ${bodyCls}`}>{body}</p>
        <Link
          href={href}
          className={`mt-4 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 ${btn}`}
        >
          {label}
        </Link>
      </div>
    </aside>
  );
}

function TipBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="relative mt-5 overflow-hidden rounded-[1.45rem] border border-[#C9D9F5] bg-gradient-to-l from-[#EEF3FD] to-white p-5">
      <span
        aria-hidden
        className="absolute left-4 top-4 h-10 w-10 rounded-full bg-[#3456bb]/8"
      />
      <p className="text-xs font-black text-[#3456bb]">{label}</p>
      <div className="mt-2 text-sm leading-8 text-[#3A3D4A]">{children}</div>
    </aside>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <aside className="relative mt-5 overflow-hidden rounded-[1.45rem] border border-[#F3D7B5] bg-gradient-to-l from-[#FFF6EB] to-white p-5">
      <p className="text-xs font-black text-[#B45309]">هشدار معامله</p>
      <div className="mt-2 text-sm leading-8 text-[#3A3D4A]">{children}</div>
    </aside>
  );
}

export default function TehranHubLanding() {
  return (
    <article
      dir="rtl"
      className="local-area-page max-w-full overflow-x-hidden font-IranSans text-[#101117] antialiased"
    >
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
          className="pointer-events-none absolute right-0 top-0 h-56 w-56 translate-x-1/4 -translate-y-1/4 rounded-full bg-[#4A7CE8]/20 blur-3xl"
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
            <span className="text-white/90">کارشناسی خودرو تهران</span>
          </nav>

          <p className="mb-3 text-[12px] font-medium tracking-wide text-[#9BB6F0] sm:text-sm">
            کارماچک · اعزام کارشناس در محل و شرق تهران
          </p>
          <h1 className="max-w-3xl text-[1.55rem] font-black leading-10 text-white sm:text-3xl sm:leading-[2.6rem] lg:text-[2.15rem] lg:leading-[3.2rem]">
            {TEHRAN_HUB_H1}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/80 sm:text-base sm:leading-9">
            پیش از جابه‌جایی پول، وضعیت واقعی ماشین را در محل خودرو ببینید:
            رنگ، بدنه، شاسی، فنی و دیاگ، با گزارش یکپارچه برای تصمیم معامله.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={START_URL}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0B1F4A] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#F3F6FD]"
            >
              رزرو کارشناسی خودرو
            </Link>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/12"
            >
              تماس {COMPANY.phoneDisplay}
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {highlights.map((item) => (
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
            <div className="min-w-0 space-y-8">
              <section className="rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 shadow-[0_8px_24px_rgba(16,17,23,0.04)] sm:p-7">
                <p className="text-sm leading-8 text-[#55565A] sm:text-[15px] sm:leading-9">
                  کارشناسی خودرو در تهران یعنی پیش از آنکه پولی جابه‌جا شود، یک
                  نفر مستقل از خریدار و فروشنده وضعیت واقعی ماشین را ببیند و
                  بنویسد.{" "}
                  <Link href="/" className={linkClass}>
                    کارماچک
                  </Link>{" "}
                  این بررسی را در محل شما انجام می‌دهد؛ پارکینگ منزل، محل کار،
                  نمایشگاه یا هر جایی که خودرو ایستاده است.
                </p>
                <P>
                  کارشناس رنگ و بدنه، شاسی و ستون‌ها، موتور و گیربکس، جلوبندی و
                  ترمز، دیاگ و آپشن‌ها را بررسی می‌کند و نتیجه را در یک گزارش
                  یکپارچه تحویل می‌دهد. این گزارش فقط نمی‌گوید خودرو ایراد دارد
                  یا ندارد؛ نشان می‌دهد هر ایراد چقدر جدی است و چه اثری روی
                  هزینه تعمیر و ارزش معامله می‌گذارد.
                </P>
                <P>
                  خدمات در سطح شهر تهران ارائه می‌شود و چون مرکز کارماچک در
                  میدان رسالت است، برای افراد حاضر در شرق تهران و محله‌های
                  تهرانپارس، نارمک، رسالت، فرجام، هنگام و محله‌های اطراف دسترسی
                  معمولاً سریع‌تر انجام می‌شود. با کارشناسی خودرو می‌توانید پیش
                  از نهایی‌شدن معامله وضعیت خودرو را بررسی کنید و بعد تصمیم
                  بگیرید.
                </P>

                <section className="quick-answer mt-6 rounded-2xl bg-[#F0F4F8] p-4 sm:p-5">
                  <p className="text-sm leading-8 text-[#3A3D4A] sm:text-[15px]">
                    کارشناسی خودرو در تهران یعنی کارشناس در محل خودرو حاضر
                    می‌شود و رنگ، بدنه، شاسی، فنی و دیاگ را بررسی می‌کند. نتیجه
                    در گزارش یکپارچه ثبت می‌شود تا پیش از بیعانه یا قولنامه،
                    ریسک معامله روشن‌تر شود. پوشش در سراسر تهران است و برای شرق
                    تهران معمولاً هماهنگی سریع‌تر انجام می‌شود.
                  </p>
                </section>

                <div className="mt-5 rounded-2xl border border-[#E2E8F4] bg-[#F8FAFE] p-4 sm:p-5">
                  <p className="text-sm font-black text-[#101117]">
                    خلاصه در یک دقیقه
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "بهترین زمان کارشناسی، قبل از بیعانه و قولنامه است.",
                      "کارشناسی رنگ به‌تنهایی جای بررسی فنی، شاسی و دیاگ را نمی‌گیرد.",
                      "رنگ‌شدگی یک قطعه به‌تنهایی دلیل رد خودرو نیست؛ محل آسیب، کیفیت تعمیر و قیمت باید کنار هم دیده شوند.",
                      "دیاگ خطاهای الکترونیکی را نشان می‌دهد، نه همه خرابی‌های مکانیکی و نه سابقه رنگ.",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-7 text-[#55565A]"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3456bb]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ActionBox
                  kicker="برای خریدار آماده معامله"
                  title="خودروی موردنظرتان را پیدا کرده‌اید؟"
                  body="پیش از پرداخت بیعانه یا امضای قولنامه، وضعیت فنی و بدنه را بررسی کنید. کارشناس در زمان و آدرسی که خودتان انتخاب می‌کنید حاضر می‌شود."
                  href={START_URL}
                  label="رزرو کارشناسی خودرو"
                />
              </section>

              <SectionCard
                id="included"
                title="کارشناسی خودرو در تهران شامل چه بخش‌هایی است؟"
              >
                <P>
                  کارشناسی خودرو در تهران در پنج بخش انجام می‌شود: رنگ و بدنه،
                  شاسی و ستون‌ها، فنی و مکانیکی، دیاگ و برق و آپشن، و در صورت
                  فراهم‌بودن شرایط، یک تست رانندگی کوتاه. عمق بررسی در هر بخش به
                  پکیجی که انتخاب می‌کنید بستگی دارد.
                </P>

                <SubBlock title="کارشناسی رنگ و بدنه">
                  <P>
                    کارشناس با ضخامت‌سنج رنگ و بازرسی چشمی مشخص می‌کند کدام قطعه
                    رنگ کارخانه دارد و کدام قطعه بعداً رنگ یا تعمیر شده است. عدد
                    ضخامت‌سنج به‌تنهایی حکم صادر نمی‌کند؛ بعضی خودروها از کارخانه
                    ضخامت بالاتری دارند و در رنگ‌های متالیک یا روی سقف، اختلاف
                    عدد می‌تواند کاملاً طبیعی باشد.
                  </P>
                  <P>
                    عدد وقتی معنا پیدا می‌کند که کنار بقیه نشانه‌ها گذاشته شود:
                    یکنواختی جلوه رنگ بین قطعات مجاور، شکل و جنس درزگیرها، فاصله
                    و هم‌ترازی در با گلگیر، و رد ابزار روی لبه‌ها و پیچ‌ها. از همه
                    این‌ها مهم‌تر، تخصص کارشناس کارماچک در تفسیر همین مجموعه
                    نشانه‌هاست.
                  </P>
                </SubBlock>

                <TipBox label="نکته کارشناس">
                  <p>
                    اگر عدد ضخامت‌سنج کمی بالاتر از حد انتظار بود، سریع نتیجه
                    نگیرید که بدنه رنگ شده است. همین عدد باید با درزگیر، هم‌ترازی
                    قطعات و الگوی پیچ‌ها خوانده شود؛ وگرنه یک خودروی سالم کارخانه
                    ممکن است بی‌دلیل مشکوک به نظر برسد.
                  </p>
                </TipBox>

                <SubBlock title="کارشناسی شاسی و ستون‌ها">
                  <P>
                    سرشاسی جلو و عقب، سینی جلو، کلاف‌ها، ستون‌های A و B و C، سقف
                    و کف صندوق بررسی می‌شوند. در تصادف جلو، معمولاً سینی و لبه
                    سرشاسی اولین جاهایی هستند که تغییر شکل می‌دهند؛ در ضربه عقب،
                    کف صندوق و محل زاپاس. جوش کارخانه‌ای الگوی منظم و فاصله
                    یکنواخت دارد و جوش بعدی معمولاً نامنظم است و سیلر روی آن با
                    سیلر کارخانه فرق می‌کند.
                  </P>
                </SubBlock>

                <SubBlock title="کارشناسی فنی و مکانیکی">
                  <P>
                    موتور از نظر صدا، لرزش، نشتی، دود اگزوز و سیستم خنک‌کاری
                    بررسی می‌شود؛ گیربکس از نظر نحوه تعویض دنده، ضربه، صدا و
                    عملکرد کلاچ؛ و جلوبندی، ترمز و فرمان از نظر صدا، لرزش،
                    ترمزگیری و الگوی ساییدگی لاستیک. هدف باز کردن یا تعمیر قطعه
                    در محل نیست؛ هدف این است که نشانه‌ها و ریسک‌های احتمالی پیش
                    از معامله مشخص شوند.
                  </P>
                </SubBlock>

                <SubBlock title="دیاگ، برق و آپشن‌ها">
                  <P>
                    دستگاه دیاگ خطاهای ثبت‌شده در واحدهای الکترونیکی خودرو
                    (موتور، گیربکس، ترمز ABS، ایربگ و سنسورها) را می‌خواند. در
                    کنار آن، عملکرد آپشن‌های اصلی تست می‌شود: شیشه و آینه برقی،
                    قفل مرکزی، کولر و بخاری، سیستم صوتی، سانروف، دوربین و سنسور
                    پارک.
                  </P>
                </SubBlock>

                <SubBlock title="تست رانندگی">
                  <P>
                    اگر مالک خودرو اجازه بدهد و فضای مناسبی وجود داشته باشد،
                    کارشناس یک تست کوتاه انجام می‌دهد تا شتاب‌گیری، تعویض دنده،
                    ترمزگیری و رفتار خودرو روی ناهمواری را در شرایط واقعی ببیند.
                  </P>
                </SubBlock>
              </SectionCard>

              <SectionCard
                id="on-site"
                title="کارشناسی خودرو در محل تهران چگونه انجام می‌شود؟"
              >
                <P>
                  برای کارشناسی خودرو در محل تهران، ابتدا خودرو و نوع کارشناسی
                  مورد نظر را انتخاب می‌کنید، آدرس و زمان پیشنهادی را ثبت
                  می‌کنید و پس از تأیید درخواست، کارشناس به محل خودرو می‌آید.
                  لازم نیست خودرو را برای شروع بررسی به نقطه دیگری منتقل کنید؛
                  البته اگر مراجعه به مرکز برای شما مناسب‌تر باشد، مرکز کارماچک
                  در محدوده رسالت و خیابان هنگام نیز در دسترس است.
                </P>
                <P>فرایند رزرو به‌صورت خلاصه چنین است:</P>
                <ol className="mt-4 space-y-3">
                  {TEHRAN_HUB_STEPS.map((step, i) => (
                    <li
                      key={step.title}
                      className="flex gap-4 rounded-2xl border border-[#EEF1F8] bg-[#F8FAFE] p-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#3456bb] text-sm font-black text-white">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-[#101117]">{step.title}</h3>
                        <p className="mt-1 text-sm leading-7 text-[#55565A]">
                          {i === 0 ? (
                            <>
                              مدل خودرو و مشخصات موردنیاز را در{" "}
                              <Link href={START_URL} className={linkClass}>
                                مسیر رزرو
                              </Link>{" "}
                              وارد کنید.
                            </>
                          ) : (
                            step.description
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <P>
                  برای بررسی دقیق‌تر رنگ و بدنه، بهتر است خودرو نسبتاً تمیز و در
                  محیطی با نور کافی باشد، اطراف آن فضای دسترسی وجود داشته باشد و
                  در صورت امکان، شرایط یک تست رانندگی کوتاه فراهم شود. باران،
                  نور ضعیف یا نبود دسترسی به زیر و اطراف خودرو می‌تواند بخشی از
                  بررسی را محدود کند.
                </P>
                <ActionBox
                  title="ثبت خودرو برای کارشناسی"
                  body="آدرس و زمان را مشخص کنید تا کارشناس بدون جابه‌جایی ماشین، در محل خودرو حاضر شود."
                  href={START_URL}
                  label="ثبت خودرو برای کارشناسی"
                />
              </SectionCard>

              <SectionCard
                id="east-tehran"
                title="کارشناسی خودرو در شرق تهران"
              >
                <P>
                  مرکز کارماچک در میدان رسالت، خیابان هنگام قرار دارد و همین
                  موقعیت باعث می‌شود هماهنگی کارشناسی در شرق تهران معمولاً
                  ساده‌تر و سریع‌تر انجام شود.
                </P>
                <P>
                  در{" "}
                  <AreaLink slug="tehranpars">تهرانپارس</AreaLink>،{" "}
                  <AreaLink slug="narmak">نارمک</AreaLink> و{" "}
                  <AreaLink slug="haft-hoz">هفت حوض</AreaLink> بیشتر معامله‌ها در
                  پارکینگ ساختمان‌های مسکونی جمع می‌شود. نکته عملی این محله‌ها
                  این است که پارکینگ‌های کم‌نور بررسی رنگ را سخت می‌کنند؛ اگر
                  می‌توانید خودرو را به محوطه باز یا جای پرنورتر بیاورید، نتیجه
                  بررسی بدنه دقیق‌تر خواهد بود.
                </P>
                <P>
                  در محدوده{" "}
                  <AreaLink slug="meydan-resalat">رسالت</AreaLink>،{" "}
                  <AreaLink slug="farjam">فرجام</AreaLink>،{" "}
                  <AreaLink slug="hengam">هنگام</AreaLink>،{" "}
                  <AreaLink slug="niru-havaei">نیرو هوایی</AreaLink> و{" "}
                  <AreaLink slug="piroozi">پیروزی</AreaLink> تراکم نمایشگاه‌ها و
                  معاملات خیابانی بیشتر است. در این موارد بهتر است پیش از پرداخت
                  هر مبلغی، درخواست کارشناس خودرو در محل ثبت شود؛ چه خودرو در
                  نمایشگاه باشد و چه در محل توافق خریدار و فروشنده.
                </P>
                <P>
                  <AreaLink slug="hakimiyeh">حکیمیه</AreaLink>، شمیران‌نو،{" "}
                  <AreaLink slug="lavizan">لویزان</AreaLink>،{" "}
                  <AreaLink slug="majidiyeh">مجیدیه</AreaLink>،{" "}
                  <AreaLink slug="heravi">هروی</AreaLink> و شمس‌آباد هم در محدوده
                  سرویس‌دهی قرار دارند. زمان دقیق حضور کارشناس در هر آدرس به
                  ظرفیت آن روز و ساعت انتخابی بستگی دارد، بنابراین هنگام ثبت
                  درخواست بهتر است محله و بازه زمانی موردنظرتان را مشخص کنید؛ اما
                  در نظر داشته باشید در هر محله‌ای از تهران نیاز به کارشناسی در
                  محل داشته باشید، کارشناس کارماچک در کمتر از یک ساعت خود را به
                  محل کارشناسی می‌رساند.
                </P>
                <WarningBox>
                  <p>
                    پارکینگ زیرزمین یا فضای کم‌نور، تشخیص اختلاف رنگ را سخت
                    می‌کند. اگر معامله در تهرانپارس، نارمک یا هفت حوض است، خودرو
                    را در صورت امکان به حیاط، خیابان یا محوطه باز بیاورید تا
                    بررسی بدنه کامل‌تر شود.
                  </p>
                </WarningBox>
              </SectionCard>

              <SectionCard
                id="when"
                title="چه زمانی باید خودرو را کارشناسی کنیم؟"
              >
                <P>
                  بهترین زمان کارشناسی، پیش از هر تعهد مالی است؛ یعنی قبل از
                  بیعانه، قبل از قولنامه و قبل از هر پرداختی. کارشناسی وقتی
                  بیشترین ارزش را دارد که هنوز امکان انصراف بدون هزینه وجود
                  داشته باشد.
                </P>
                <P>
                  ترتیب منطقی ساده است: خودرو را می‌بینید، اگر قیمت و ظاهر و
                  مدارک اولیه برایتان قابل قبول بود، همان‌جا یا در اولین فرصت
                  کارشناسی را هماهنگ می‌کنید و بعد سراغ عدد نهایی می‌روید.
                </P>
                <h3 className="mt-6 text-base font-bold text-[#101117] sm:text-lg">
                  قبل از بیعانه کارشناسی خودرو کنیم یا بعد از بیعانه؟
                </h3>
                <P>
                  قبل از بیعانه. بعد از پرداخت بیعانه، موقعیت شما در مذاکره ضعیف
                  می‌شود و پس‌گرفتن مبلغ در عمل همیشه ساده نیست، حتی وقتی حق با
                  خریدار است.
                </P>
                <P>
                  اگر فروشنده‌ای اجازه نمی‌دهد خودرو پیش از بیعانه کارشناسی شود،
                  خودِ این موضوع یک نشانه است و ارزش دارد که درباره‌اش سؤال
                  کنید. در مقابل، فروشنده‌ای که از سلامت خودرویش مطمئن است معمولاً
                  از کارشناسی استقبال می‌کند، چون گزارش مستقل جلوی چانه‌زنی‌های
                  بی‌پایه را هم می‌گیرد.
                </P>
                <P>
                  اگر شرایط به‌هر دلیل بیعانه را جلو انداخت، بهتر است در متن
                  رسید یا قولنامه شرط شود که در صورت مشاهده ایراد مهم در
                  کارشناسی، مبلغ برگردانده می‌شود. درباره اینکه هزینه کارشناسی با
                  خریدار است یا فروشنده، در{" "}
                  <a href="#faq" className={linkClass}>
                    سؤالات متداول همین صفحه
                  </a>{" "}
                  توضیح داده‌ایم.
                </P>
                <WarningBox>
                  <p>
                    پرداخت بیعانه پیش از کارشناسی، قدرت انصراف شما را کم می‌کند.
                    اگر مجبور به پرداخت شدید، شرط بازگشت وجه در صورت ایراد مهم را
                    مکتوب کنید.
                  </p>
                </WarningBox>
                <ActionBox
                  kicker="کارشناسی در محل تهران"
                  title="درخواست کارشناسی خودرو در محل"
                  body="مشخصات خودرو، آدرس و زمان موردنظرتان را ثبت کنید تا کارشناس در محل حاضر شود و گزارش کامل وضعیت خودرو را تحویل بگیرید."
                  href={START_URL}
                  label="درخواست کارشناسی خودرو در محل"
                />
              </SectionCard>

              <SectionCard
                id="paint-enough"
                title="آیا کارشناسی رنگ به‌تنهایی کافی است؟"
              >
                <P>
                  کارشناسی رنگ تنها یکی از بخش‌های بررسی خودرو است و نمی‌تواند
                  جای بررسی موتور، گیربکس، شاسی و دیاگ را بگیرد. یک خودرو می‌تواند
                  بدنه کاملاً سالم و بدون رنگ داشته باشد و همزمان گیربکس
                  اتوماتیکی داشته باشد که تعمیرش ده‌ها میلیون تومان هزینه بردارد.
                </P>
                <P>
                  عکس این حالت هم درست است: خودرویی با یک لکه رنگ روی گلگیر عقب
                  ممکن است از نظر فنی و شاسی وضعیت بهتری از یک خودروی «بدون رنگ»
                  داشته باشد. برای همین نتیجه رنگ باید کنار نتیجه فنی خوانده شود،
                  نه به‌جای آن.
                </P>
                <TipBox label="اشتباه رایج خریدار">
                  <p>
                    عبارت «بدون رنگ» در آگهی، سلامت موتور و گیربکس را تضمین
                    نمی‌کند. اگر فقط رنگ را چک کنید، ممکن است گران‌ترین ایراد
                    معامله را اصلاً نبینید.
                  </p>
                </TipBox>
              </SectionCard>

              <SectionCard
                id="painted"
                title="رنگ‌شدگی یعنی خودرو را نخریم؟"
              >
                <P>
                  رنگ‌شدگی یک قطعه به‌تنهایی دلیل رد خودرو نیست؛ محل آسیب، شدت
                  آن، کیفیت تعمیر، سلامت شاسی و قیمت نهایی باید کنار هم دیده
                  شوند.
                </P>
                <P>
                  مهم‌ترین تفکیک، تفاوت قطعات پیچی و جوشی است. گلگیر جلو، در،
                  کاپوت و درِ صندوق قطعات پیچی‌اند و تعویض یا رنگ‌شدن آن‌ها معمولاً
                  روی ایمنی اثر مستقیم ندارد. ستون‌ها، سقف، سرشاسی و کلاف‌ها جوشی‌اند
                  و هر تعمیری روی آن‌ها موضوع جدی‌تری است.
                </P>
                <div className="mt-5 max-w-full overflow-x-auto overscroll-x-contain rounded-2xl border border-[#E8ECF4]">
                  <table className="w-full min-w-[480px] border-collapse text-right text-sm">
                    <thead className="bg-[#F2F5FF] text-[#101117]">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-extrabold">
                          نوع قطعه
                        </th>
                        <th scope="col" className="px-4 py-3 font-extrabold">
                          نمونه
                        </th>
                        <th scope="col" className="px-4 py-3 font-extrabold">
                          اثر رنگ یا تعویض
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8ECF4] bg-white">
                      <tr>
                        <td className="px-4 py-3 font-bold text-[#101117]">
                          قطعات پیچی
                        </td>
                        <td className="px-4 py-3 leading-7 text-[#55565A]">
                          گلگیر جلو، در، کاپوت، در صندوق
                        </td>
                        <td className="px-4 py-3 leading-7 text-[#55565A]">
                          معمولاً روی ایمنی اثر مستقیم ندارد؛ روی قیمت اثر دارد
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-[#101117]">
                          قطعات جوشی
                        </td>
                        <td className="px-4 py-3 leading-7 text-[#55565A]">
                          ستون‌ها، سقف، سرشاسی، کلاف
                        </td>
                        <td className="px-4 py-3 leading-7 text-[#55565A]">
                          تعمیر جدی‌تر است و باید دقیق بررسی شود
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <P>
                  عامل دوم کیفیت تعمیر است. صافکاری و رنگ استاندارد با تعمیر
                  عجولانه‌ای که زیرش بتونه ضخیم یا پوشش ناهموار دارد فرق می‌کند و
                  این تفاوت در دوام بدنه و ظاهر خودرو بعد از چند سال خودش را نشان
                  می‌دهد.
                </P>
                <P>
                  عامل سوم قیمت است. خودروی رنگ‌شده باید ارزان‌تر از نمونه سالم
                  خودش عرضه شود و سؤال درست این نیست که «رنگ دارد یا نه»، بلکه این
                  است که «با این وضعیت، این قیمت منصفانه است یا نه». برای شناخت
                  سطوح مختلف لکه رنگ، صافکاری، دوررنگ و تمام‌رنگ می‌توانید{" "}
                  <Link href={BLOG_URL} className={linkClass}>
                    مطالب آموزشی کارشناسی
                  </Link>{" "}
                  را در سایت کارماچک مطالعه کنید.
                </P>
              </SectionCard>

              <SectionCard
                id="diag"
                title="دیاگ چه چیزی را مشخص می‌کند و چه چیزی را نه؟"
              >
                <P>
                  دیاگ خطاها و داده‌های قابل دسترس در واحدهای الکترونیکی خودرو،
                  مانند ECU موتور، گیربکس، ABS، ایربگ و بعضی سنسورها را نشان
                  می‌دهد. این اطلاعات می‌تواند نشانه‌ای از خطای فعلی یا ثبت‌شده
                  باشد، اما باید همراه با علائم واقعی خودرو و بررسی فنی تفسیر شود.
                </P>
                <P>
                  دیاگ همه خرابی‌های مکانیکی را تشخیص نمی‌دهد، درباره رنگ و شاسی
                  اطلاعاتی ندارد و در همه خودروها کارکرد واقعی را به‌طور قطعی
                  ثابت نمی‌کند. حتی پاک‌بودن صفحه خطا نیز به‌تنهایی به معنی سلامت
                  کامل خودرو نیست؛ ممکن است خطا پاک شده باشد یا ایراد موردنظر هنوز
                  به شکل خطای الکترونیکی ثبت نشده باشد. جزئیات بیشتر را در صفحه{" "}
                  <Link href={START_URL} className={linkClass}>
                    کارشناسی خودرو قبل از خرید
                  </Link>{" "}
                  ببینید.
                </P>
                <WarningBox>
                  <p>
                    صفحه دیاگ خالی، تضمین سلامت نیست. خطا ممکن است پاک شده باشد،
                    یا ایراد مکانیکی اصلاً به شکل کد الکترونیکی ظاهر نشده باشد.
                  </p>
                </WarningBox>
                <h3 className="mt-6 text-base font-bold text-[#101117] sm:text-lg">
                  نتیجه کارشناسی چه کمکی به معامله می‌کند؟
                </h3>
                <P>
                  گزارش کارشناسی یک زنجیره تصمیم می‌سازد: ایرادها شناسایی
                  می‌شوند، هزینه احتمالی تعمیر هر ایراد برآورد می‌شود، این عدد
                  مبنای مذاکره روی قیمت قرار می‌گیرد و در نهایت مشخص می‌شود معامله
                  ارزش ادامه دادن دارد یا نه.
                </P>
                <P>
                  تفاوت یک گزارش کاربردی با یک فهرست ایراد در همین‌جاست. اینکه
                  «سینی جلو رنگ دارد» یک اطلاعات است؛ اینکه این رنگ از چه نوع
                  تصادفی آمده، چه اثری روی ارزش خودرو می‌گذارد و چه هزینه‌ای در
                  آینده می‌سازد، چیزی است که به درد مذاکره می‌خورد.
                </P>
                <P>
                  اگر می‌خواهید بدانید ایرادهای پیداشده چقدر باید از قیمت کم کنند،
                  سرویس{" "}
                  <Link href={PRICE_URL} className={linkClass}>
                    قیمت‌گذاری خودرو
                  </Link>{" "}
                  کارماچک نقطه شروع خوبی برای برآورد ارزش تقریبی است.
                </P>
                <ActionBox
                  tone="sky"
                  kicker="بعد از دیدن وضعیت فنی"
                  title="قیمت واقعی این خودرو چقدر است؟"
                  body="اگر می‌خواهید علاوه بر وضعیت فنی و بدنه، ارزش تقریبی خودرو را هم بررسی کنید، وارد بخش قیمت‌گذاری شوید."
                  href={PRICE_URL}
                  label="محاسبه قیمت خودرو رایگان"
                />
              </SectionCard>

              <SectionCard
                id="why-us"
                title="چرا کارشناسی خودرو با کارماچک؟"
              >
                <P>
                  یک چک‌لیست ثابت برای همه خودروها جواب نمی‌دهد. بررسی پژو ۲۰۶ با
                  JAC S5 یا تیگو ۸ پرو مکس از پایه یکسان نیست، چون نقاط ضعف
                  شناخته‌شده و نحوه استفاده این خودروها با هم فرق دارد.
                </P>
                <P>
                  مزیت یک کارشناسی مطمئن، شیوه تفسیر نشانه‌هاست؛ در بررسی خودرو،
                  یک پیچ بازشده، اختلاف رنگ یا چروک داخل صندوق نباید بدون دیدن
                  شواهد دیگر به نتیجه قطعی تبدیل شود.
                </P>
                <P>
                  کارشناس باید متناسب با مدل خودرو، لبه قطعات، اتصالات، نقاط جوش،
                  سینی‌ها، قسمت‌های پنهان، وضعیت فنی و داده‌های دیاگ را کنار هم
                  بگذارد. نتیجه نیز باید به زبان روشن توضیح دهد چه چیزی دیده شده،
                  اهمیت آن چیست و کدام بخش به بررسی تکمیلی نیاز دارد.
                </P>
                <P>
                  کارماچک علاوه بر کارشناسی در محل، برای کارشناسی خودروهای
                  پرطرفدار راهنماهای تخصصی دارد تا خریدار قبل از بازدید با نقاط
                  حساس همان مدل آشنا شود. هرچند که جای کارشناسی خودروی مورد معامله
                  را نمی‌گیرد، اما کمک می‌کند سؤال‌های دقیق‌تری بپرسید و گزارش را
                  بهتر بفهمید.
                </P>
                <ActionBox
                  tone="emerald"
                  kicker="راهنمای مدل‌های پرفروش"
                  title="قبل از خرید، نقاط ضعف خودرو را بشناسید"
                  body="در بررسی خودروهای پرطرفدار بازار، کارشناسان کارماچک نقاط حساس، ایرادهای رایج و مواردی را که هنگام کارشناسی هر مدل باید بررسی شوند با تصویر و ویدئو توضیح داده‌اند."
                  href={POPULAR_URL}
                  label="بررسی خودروهای پرفروش"
                />
              </SectionCard>

              <SectionCard
                id="prepare"
                title="قبل از حضور کارشناس چه چیزهایی آماده کنیم؟"
              >
                <P>
                  برای جلوگیری از ناقص‌شدن بررسی، مدل و مشخصات خودرو، آدرس دقیق،
                  شماره تماس هماهنگی و زمان پیشنهادی را آماده کنید. از فروشنده
                  بخواهید خودرو را در فضای روشن و قابل دسترس قرار دهد و کلید،
                  مدارک و امکان روشن‌کردن خودرو در دسترس باشد.
                </P>
                <P>
                  اگر تست رانندگی بخشی از خدمت انتخابی است، اجازه مالک و مسیر
                  مناسب نیز لازم است. شستن موتور درست قبل از بازدید توصیه
                  نمی‌شود؛ این کار ممکن است تشخیص نشتی‌های قابل مشاهده را دشوار
                  کند.
                </P>
                <aside className="mt-5 rounded-[1.45rem] border border-[#C7E7D4] bg-gradient-to-l from-[#EEFBF3] to-white p-5">
                  <p className="text-xs font-black text-[#047857]">
                    چک‌لیست روز کارشناسی
                  </p>
                  <ul className="mt-3 space-y-2">
                    {[
                      "مدل و مشخصات خودرو آماده باشد",
                      "آدرس دقیق و شماره تماس هماهنگی ثبت شود",
                      "خودرو در فضای روشن و قابل دسترس باشد",
                      "کلید، مدارک و امکان روشن‌کردن خودرو فراهم باشد",
                      "موتور درست قبل از بازدید شسته نشود",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm leading-7 text-[#3A3D4A]"
                      >
                        <span aria-hidden className="font-black text-[#047857]">
                          ✔
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </SectionCard>

              <section
                id="faq"
                className="scroll-mt-28 rounded-[1.75rem] border border-[#E2E8F4] bg-white p-5 sm:p-7"
              >
                <h2 className="text-xl font-black text-[#101117] sm:text-[1.35rem]">
                  سؤالات متداول کارشناسی خودرو در تهران
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  className="mt-4 w-full"
                  defaultValue="faq-0"
                >
                  {TEHRAN_HUB_FAQS.map((faq, i) => (
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
                    {TEHRAN_HUB_TOC.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block rounded-lg px-2.5 py-1.5 text-[12px] leading-6 text-[#55565A] transition-colors hover:bg-[#EEF2FD] hover:text-[#3456bb]"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="rounded-[1.35rem] bg-[#0B1F4A] p-5 text-white">
                  <p className="text-sm font-bold leading-7">
                    کارشناسی در تهران را همین حالا رزرو کنید
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

          <section id="areas" className="mt-12 scroll-mt-28" aria-labelledby="areas-heading">
            <div className="mb-5">
              <h2
                id="areas-heading"
                className="text-xl font-black text-[#101117]"
              >
                مناطق تحت پوشش کارشناسی خودرو تهران
              </h2>
              <p className="mt-1 text-sm text-[#6B6C70]">
                صفحه هر محله را باز کنید تا جزئیات کارشناسی در همان محدوده را
                ببینید.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {LOCAL_AREAS.map((a) => (
                <Link
                  key={a.slug}
                  href={`/car-inspection-tehran/${a.slug}`}
                  className="group rounded-[1.5rem] border border-[#E2E8F4] bg-white p-5 shadow-[0_8px_24px_rgba(16,17,23,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3456bb]/45 hover:shadow-[0_16px_36px_rgba(52,86,187,0.12)] sm:p-6"
                >
                  <h3 className="text-lg font-bold text-[#101117] transition-colors group-hover:text-[#3456bb]">
                    کارشناسی خودرو {a.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#6B6C70]">
                    {a.content.shortPitch ??
                      `${a.nearby.slice(0, 3).join("، ")} و اطراف`}
                  </p>
                  <span className="mt-4 inline-flex text-xs font-medium text-[#3456bb]">
                    مشاهده صفحه منطقه
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="relative mt-12 overflow-hidden rounded-[2rem] bg-[#0B1F4A] px-6 py-10 text-center sm:px-10 sm:py-12 contain-paint">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_0%_0%,rgba(74,124,232,0.35),transparent_55%),radial-gradient(ellipse_45%_55%_at_100%_100%,rgba(52,86,187,0.4),transparent_55%)]"
            />
            <h2 className="relative text-xl font-black text-white sm:text-2xl">
              پیش از معامله، خودرو را در تهران بررسی کنید
            </h2>
            <p className="relative mx-auto mt-3 max-w-2xl text-sm leading-8 text-white/75">
              مشخصات خودرو، آدرس و زمان را ثبت کنید. کارشناس کارماچک در محل حاضر
              می‌شود و گزارش وضعیت فنی و بدنه را برای تصمیم معامله تحویل می‌دهد.
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
