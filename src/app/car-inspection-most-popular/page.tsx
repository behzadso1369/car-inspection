import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowLeft02Icon } from "hugeicons-react";
import { BASE_URL, COMMON_KEYWORDS } from "@/lib/seo";
import { FEATURED_CARS } from "./carsData";

const PAGE_TITLE =
  "راهنمای خرید خودروهای پرطرفدار بازار + مزایا، معایب و ارزش خرید | کارماچک";
const PAGE_DESCRIPTION =
  "قصد خرید ماشین دارید؟ بررسی ارزش خرید، نقاط ضعف و قوت، و مهم‌ترین نکاتی که قبل از خرید پرفروش‌ترین خودروهای داخلی و مونتاژی بازار باید چک کنید.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "راهنمای خرید خودرو",
    "خودروهای پرطرفدار",
    "مزایا و معایب خودرو",
    "ارزش خرید خودرو",
    "کارشناسی خودرو",
    ...COMMON_KEYWORDS,
  ],
  alternates: { canonical: `${BASE_URL}/car-inspection-most-popular` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${BASE_URL}/car-inspection-most-popular`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
  },
};

const needRows = [
  {
    need: "رفت‌وآمد شهری و بدنه جمع‌وجور",
    options: "پژو ۲۰۶، پژو ۲۰۷، کوییک",
    tip: "فضای عقب، نوع گیربکس و وضعیت فنی",
  },
  {
    need: "خرید اقتصادی با بودجه محدود",
    options: "کوییک یا نمونه سالم خودروهای کارکرده",
    tip: "مجموع قیمت خرید و تعمیرات اولیه",
  },
  {
    need: "استفاده خانوادگی و حمل بار سفر",
    options: "پژو پارس، سورن پلاس، تارا، شاهین",
    tip: "فضای واقعی کابین و صندوق، تیپ و موتور",
  },
  {
    need: "خودروی اتوماتیک برای ترافیک",
    options: "تیپ‌های اتوماتیک ۲۰۷، تارا و شاهین",
    tip: "نوع گیربکس، سابقه سرویس و رفتار در حرکت",
  },
  {
    need: "کراس‌اوور کارکرده",
    options: "جک S5",
    tip: "نسخه موتور و گیربکس، هزینه تعمیرات و سابقه نگهداری",
  },
  {
    need: "امکانات بیشتر و نیاز به ردیف سوم",
    options: "تیگو ۸ پرو مکس",
    tip: "کاربرد واقعی ردیف سوم، ابعاد و بودجه نگهداری",
  },
];

const decisionChecklist = [
  {
    title: "کاربری",
    body: "تعداد سرنشینان، مسیرهای روزانه، سفر و فضای پارک.",
  },
  {
    title: "مشخصات دقیق",
    body: "سال ساخت، تیپ، موتور، گیربکس و تجهیزات واقعی.",
  },
  {
    title: "وضعیت خودرو",
    body: "سابقه نگهداری، سلامت فنی، بدنه و تعمیرات انجام‌شده.",
  },
  {
    title: "هزینه قابل‌پیش‌بینی",
    body: "سرویس‌های عقب‌افتاده، لاستیک، باتری و تعمیرات ضروری.",
  },
];

const prePurchaseChecks = [
  {
    title: "مشخصات را تطبیق دهید",
    body: "سال، تیپ، موتور، گیربکس و تجهیزات با مدارک و خود خودرو همخوان باشد.",
  },
  {
    title: "سوابق نگهداری را بخواهید",
    body: "فاکتور سرویس و تعمیر، از عبارت‌هایی مثل «تازه سرویس شده» اطلاعات بیشتری می‌دهد.",
  },
  {
    title: "بدنه و ساختار را جداگانه ارزیابی کنید",
    body: "رنگ یک قطعه، تعویض آن و آسیب سازه‌ای موضوعات یکسانی نیستند.",
  },
  {
    title: "عملکرد خودرو را بررسی کنید",
    body: "استارت، صدا، نشتی، خنک‌کاری و رفتار انتقال قدرت با روش متناسب با خودرو بررسی شود.",
  },
  {
    title: "تجهیزات را واقعاً امتحان کنید",
    body: "تهویه، نمایشگر، دوربین و سایر امکانات نصب‌شده.",
  },
  {
    title: "هزینه و ابهام را روشن کنید",
    body: "در گزارش مشخص باشد چه ایرادی دیده شده، کدام بخش بررسی نشده و چه آزمون تکمیلی لازم است.",
  },
];

const faqs = [
  {
    question: "آیا خودروی پرطرفدار همیشه ارزش خرید بیشتری دارد؟",
    answer:
      "خیر. محبوبیت یک مدل، سلامت نمونه مورد معامله یا مناسب‌بودن قیمت آن را ثابت نمی‌کند. تناسب با نیاز، وضعیت واقعی خودرو و هزینه‌های پیش‌رو باید هم‌زمان بررسی شوند.",
  },
  {
    question: "برای خانواده، هاچ‌بک بخریم یا سدان؟",
    answer:
      "اگر سرنشین عقب و بار سفر دارید، فضای واقعی کابین و صندوق را معیار قرار دهید. هاچ‌بک ممکن است برای رفت‌وآمد شهری شما کافی باشد، اما بهترین تصمیم با امتحان صندلی عقب و قراردادن وسایل معمول در صندوق گرفته می‌شود.",
  },
  {
    question: "کارکرد کمتر مهم‌تر است یا مدل بالاتر؟",
    answer:
      "هیچ‌کدام به‌تنهایی تعیین‌کننده نیستند. سابقه سرویس، شرایط استفاده، تعمیرات و وضعیت فنی را کنار سال ساخت و عدد کیلومتر بررسی کنید.",
  },
  {
    question: "آیا خودروی رنگ‌شده ارزش خرید دارد؟",
    answer:
      "ممکن است؛ اما ابتدا باید محل، علت و شدت آسیب مشخص شود. ترمیم ظاهری یک قطعه با آسیب ساختار بدنه یکسان نیست و اثر هرکدام بر تصمیم و قیمت متفاوت است.",
  },
  {
    question: "چرا در این راهنما قیمت ثابت درج نشده است؟",
    answer:
      "قیمت به زمان، تیپ و وضعیت خودرو وابسته است. برای تصمیم نهایی، قیمت روز نمونه‌های مشابه را بررسی کنید و نتیجه کارشناسی همان خودرو را در مذاکره لحاظ کنید.",
  },
];

const headingClass =
  "text-xl md:text-2xl font-bold text-[#101117] mt-10 mb-3";
const paragraphClass = "text-[#55565A] leading-8 text-sm md:text-base";
const linkClass = "font-bold text-[#3456bb] underline-offset-2 hover:underline";

export default function CarInspectionListPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="px-4 font-IranSans py-4 max-w-6xl mx-auto" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[{ label: "خانه", href: "/" }, { label: "راهنمای خرید خودروهای پرطرفدار" }]}
        className="mb-4"
      />

      <h1 className="text-2xl md:text-3xl font-bold text-[#101117] mb-4 leading-10">
        راهنمای جامع خرید پرطرفدارترین خودروهای بازار ایران (مزایا، معایب و نکات
        کلیدی)
      </h1>

      <p className={`${paragraphClass} mb-4 max-w-3xl`}>
        خرید خودرو در بازار پرتلاطم امروز، حساس‌تر از همیشه شده است. بسیاری از
        خریداران برای حفظ ارزش سرمایه خود به سراغ ماشین‌های پرفروش می‌روند تا در
        زمان نیاز به پول نقد، با مشکل مواجه نشوند. اما همین تقاضای بالا باعث
        می‌شود نسخه‌های تصادفی یا دارای مشکلات پنهان به سادگی در بازار معامله
        شوند. رسالت ما در کارماچک این است که با ارائه اطلاعات تخصصی و کاملاً
        بی‌طرفانه، چشم‌انداز روشنی از وضعیت واقعی این ماشین‌ها به شما بدهیم تا با
        دیدی باز و به دور از هیجانات بازار، بهترین و امن‌ترین انتخاب را داشته
        باشید.
      </p>

      <section className="mb-10" aria-labelledby="featured-cars-title">
        <h2 id="featured-cars-title" className={headingClass}>
          کارشناسی خودروهای پرطرفدار
        </h2>
        <p className={`${paragraphClass} mb-5 max-w-3xl`}>
          فعلاً راهنمای تخصصی پژو ۲۰۶، جک S5، تیگو ۸ پرو مکس و شاهین آماده است. روی هر
          خودرو کلیک کنید تا مزایا، معایب و نکات کارشناسی آن را ببینید و در صورت
          نیاز، کارشناسی در محل را رزرو کنید.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_CARS.map((car) => {
            const coverSrc = car.ogImage || car.image;
            return (
              <Link
                key={car.slug}
                href={`/car-inspection-most-popular/${car.slug}`}
                className="group rounded-2xl border border-[#EDEDED] overflow-hidden bg-white hover:shadow-lg hover:border-[#3456bb]/40 transition-all"
              >
                <div className="relative w-full aspect-[16/10] bg-[#F4F5F7]">
                  <Image
                    src={coverSrc}
                    alt={`عکس کاور کارشناسی ${car.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-[#3456bb] font-medium">
                    {car.brand}
                  </span>
                  <h3 className="text-lg font-bold text-[#101117] mt-1">
                    کارشناسی {car.name}
                  </h3>
                  <p className="text-sm text-[#55565A] leading-6 mt-1 line-clamp-2">
                    {car.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-[#3456bb] font-medium mt-3 group-hover:gap-2 transition-all">
                    مشاهده معایب و مزایا
                    <ArrowLeft02Icon className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="need-match-title">
        <h2 id="need-match-title" className={headingClass}>
          کدام خودرو برای نیاز شما مناسب‌تر است؟
        </h2>
        <p className={`${paragraphClass} mb-4`}>
          جدول زیر نقطه شروع انتخاب است. پیشنهادها بر اساس تناسب کاربری ارائه
          شده‌اند و حکم قطعی درباره بهترین خودرو نیستند.
        </p>

        <ul className="grid gap-3 lg:hidden">
          {needRows.map((row) => (
            <li
              key={row.need}
              className="rounded-2xl border border-[#E8ECF4] bg-[#F8FAFF] p-4"
            >
              <h3 className="text-sm font-extrabold leading-7 text-[#101117]">
                {row.need}
              </h3>
              <p className="mt-1.5 text-sm leading-7 text-[#3456bb] font-medium">
                {row.options}
              </p>
              <p className="mt-1 text-sm leading-7 text-[#55565A]">{row.tip}</p>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-hidden rounded-2xl border border-[#E8ECF4] lg:block">
          <table className="w-full border-collapse text-right text-sm">
            <thead className="bg-[#F2F5FF] text-[#101117]">
              <tr>
                <th scope="col" className="w-[30%] px-4 py-3 font-extrabold">
                  نیاز اصلی شما
                </th>
                <th scope="col" className="w-[35%] px-4 py-3 font-extrabold">
                  گزینه‌های قابل بررسی
                </th>
                <th scope="col" className="px-4 py-3 font-extrabold">
                  مهم‌ترین نکته تصمیم
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8ECF4]">
              {needRows.map((row) => (
                <tr key={row.need} className="bg-white">
                  <th
                    scope="row"
                    className="px-4 py-3 text-right align-top font-bold leading-7 text-[#101117]"
                  >
                    {row.need}
                  </th>
                  <td className="px-4 py-3 align-top leading-7 text-[#55565A]">
                    {row.options}
                  </td>
                  <td className="px-4 py-3 align-top leading-7 text-[#55565A]">
                    {row.tip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="value-buy-title">
        <h2 id="value-buy-title" className={headingClass}>
          ارزش خرید یعنی چه؟
        </h2>
        <p className={paragraphClass}>
          ارزش خرید یعنی در برابر پولی که پرداخت می‌کنید، چقدر از نیازتان برطرف
          می‌شود و چه هزینه‌ها و ریسک‌هایی می‌پذیرید. خودروی محبوب، کم‌کارکرد یا
          پرآپشن الزاماً بهترین معامله نیست.
        </p>
        <p className={`${paragraphClass} mt-3`}>
          پیش از مقایسه دو گزینه، این چهار موضوع را روشن کنید:
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {decisionChecklist.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-[#E8ECF4] bg-white p-4"
            >
              <h3 className="text-sm font-extrabold text-[#101117]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-7 text-[#55565A]">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
        <p className={`${paragraphClass} mt-4`}>
          برای برآورد اولیه، از{" "}
          <Link href="/car-price" className={linkClass}>
            محاسبه قیمت خودرو کارکرده
          </Link>{" "}
          استفاده کنید و نتیجه را با نمونه‌های مشابه از نظر تیپ، سال، کارکرد و
          وضعیت بدنه مقایسه کنید. در همین بخش، خودروهای دیگری در همان بازه قیمتی
          هم به شما پیشنهاد می‌دهیم تا گزینه‌های متناسب با بودجه‌تان را بشناسید،
          آن‌ها را مقایسه کنید و انتخاب آگاهانه‌تری داشته باشید. به یاد داشته
          باشید که قیمت آگهی، لزوماً قیمت نهایی معامله نیست.
        </p>
      </section>

      <section aria-labelledby="new-vs-used-title">
        <h2 id="new-vs-used-title" className={headingClass}>
          خودرو صفر ساده‌تر بخریم یا کارکرده مجهزتر؟
        </h2>
        <p className={paragraphClass}>
          این انتخاب را با دو سؤال شروع کنید: «اگر تعمیر مهمی لازم شود، بودجه آن
          را دارم؟» و «امکانات اضافه چقدر در استفاده روزانه من اثر می‌گذارند؟»
        </p>
        <p className={`${paragraphClass} mt-3`}>
          اگر هزینه پیش‌بینی‌نشده و زمان تعمیرگاه برایتان مسئله مهمی است، خودروی
          ساده‌تر با وضعیت روشن و پوشش گارانتی معتبر می‌تواند انتخاب مناسب‌تری
          باشد. البته صفر بودن، ضرورت بررسی هنگام تحویل را از بین نمی‌برد.
        </p>
        <p className={`${paragraphClass} mt-3`}>
          خودروی کارکرده مجهزتر زمانی قابل دفاع است که سابقه نگهداری قابل
          پیگیری، وضعیت فنی مشخص و قیمت متناسب داشته باشد. اختلاف قیمت را کامل
          خرج ارتقای کلاس خودرو نکنید؛ بخشی از بودجه باید برای هزینه‌های پس از
          خرید باقی بماند.
        </p>
      </section>

      <section aria-labelledby="compare-example-title">
        <h2 id="compare-example-title" className={headingClass}>
          یک مثال برای مقایسه واقعی دو پیشنهاد
        </h2>
        <p className={paragraphClass}>
          فرض کنید دو خودرو از یک مدل و تیپ، اختلاف قیمت دارند. نمونه ارزان‌تر به
          لاستیک، سرویس و تعمیر تأییدشده نیاز دارد؛ نمونه گران‌تر این هزینه‌ها را
          فعلاً ندارد.
        </p>
        <p className={`${paragraphClass} mt-3`}>برای مقایسه اولیه بنویسید:</p>
        <aside className="mt-3 rounded-2xl border border-[#E8ECF4] bg-[#F8FAFF] p-4 text-sm leading-7 text-[#101117] md:text-base">
          هزینه شروع مالکیت = قیمت خرید + تعمیرات ضروری برآوردشده + سرویس‌های
          عقب‌افتاده
        </aside>
        <p className={`${paragraphClass} mt-3`}>
          سپس زمان خواب خودرو و ابهام‌های باقی‌مانده را جداگانه بسنجید. این
          محاسبه، هزینه‌های دوره‌ای آینده یا افت ارزش را پوشش نمی‌دهد؛ اما نشان
          می‌دهد چرا پایین‌ترین قیمت آگهی لزوماً بهترین معامله نیست.
        </p>
      </section>

      <section aria-labelledby="pre-purchase-title">
        <h2 id="pre-purchase-title" className={headingClass}>
          قبل از خرید هرکدام از این خودروها چه چیزهایی را بررسی کنیم؟
        </h2>
        <p className={`${paragraphClass} mb-4`}>
          پس از انتخاب مدل، نوبت بررسی خودروی مشخص است:
        </p>
        <ol className="list-decimal space-y-3 pr-5 text-sm leading-8 text-[#55565A] md:text-base">
          {prePurchaseChecks.map((item) => (
            <li key={item.title}>
              <span className="font-bold text-[#101117]">{item.title}:</span>{" "}
              {item.body}
            </li>
          ))}
        </ol>
        <p className={`${paragraphClass} mt-4`}>
          موارد فوق محور بررسی‌اند، نه فهرست خرابی‌های قطعی یا شایع همه این
          مدل‌ها. همچنین یک نشانه ظاهری یا خروجی دیاگ به‌تنهایی برای نتیجه‌گیری
          درباره تمام وضعیت خودرو کافی نیست.
        </p>
        <p className={`${paragraphClass} mt-3`}>
          وقتی گزینه نهایی را پیدا کردید، می‌توانید از{" "}
          <Link href="/car-inspection" className={linkClass}>
            کارشناسی خودرو در محل
          </Link>{" "}
          برای بررسی آن پیش از معامله استفاده کنید. خدمات انتخابی و امکان تست
          رانندگی یا بررسی تکمیلی را هنگام هماهنگی مشخص کنید.
        </p>
      </section>

      <section className="mt-10 mb-6" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-xl md:text-2xl font-bold text-[#101117] mb-4">
          پرسش‌های متداول خرید خودروهای پرطرفدار
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-[#E8ECF4] bg-white px-4 py-3 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-bold text-[#101117] leading-7 marker:content-none">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm leading-7 text-[#55565A] md:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
