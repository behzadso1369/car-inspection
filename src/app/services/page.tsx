import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check } from "lucide-react"
import { NavigationBar } from "../components/mobile/Home/NavigationBar"
import { Metadata } from "next"
import { serverApiHelper } from "@/helper/server-fetcher"

// ISR - Incremental Static Regeneration (revalidate هر 1 ساعت)
// صفحه سرویس‌ها محتوای نسبتاً ثابتی دارد که گاهی آپدیت می‌شود
export const revalidate = 3600; // 1 hour

// SEO Metadata
export const metadata: Metadata = {
  title: "خدمات کارشناسی خودرو | استاندارد و VIP",
  description: "دامنه خدمات کارشناسی کارماچک: بررسی بدنه، رنگ، شاسی و بخش‌های فنی متناسب با نوع خدمت. تعرفه هنگام ثبت درخواست اعلام می‌شود.",
  keywords: [
    "قیمت کارشناسی",
    "کارشناسی استاندارد",
    "کارشناسی VIP",
    "خدمات کارشناسی",
    "هزینه کارشناسی خودرو",
    "کارشناسی خودرو",
    "کارماچک",
    "تعرفه کارشناسی",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/services`,
  },
  openGraph: {
    title: "خدمات کارشناسی خودرو | استاندارد و VIP",
    description: "بررسی بدنه، رنگ، شاسی و بخش‌های فنی پیش از معامله؛ تعرفه هنگام ثبت درخواست اعلام می‌شود.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://carmacheck.com"}/services`,
    siteName: "کارماچک",
    locale: "fa_IR",
    type: "website",
    // تصویر OG به‌صورت داینامیک از app/opengraph-image.tsx تولید می‌شود
  },
  twitter: {
    card: "summary_large_image",
    title: "خدمات کارشناسی خودرو",
    description: "کارشناسی استاندارد و VIP پیش از خرید یا فروش خودرو",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Server-side data fetching با استفاده از serverApiHelper
async function getMasterPageData() {
  return await serverApiHelper.get("GetMasterPageData", 3600);
}

export default async function Services() {
  const data = await getMasterPageData();
  const features = [
    {
      id: 1,
      icon: "/service-box-1.svg",
      title: "کارشناسی در محل",
    },
    {
      id: 2,
      icon: "/professiona-tools.svg",
      title: "بررسی بدنه و رنگ",
    },
    {
      id: 3,
      icon: "/professiona-tools.svg",
      title: "بررسی فنی",
    },
    {
      id: 4,
      icon: "/professional-expoerts.svg",
      title: "گزارش پیش از معامله",
    },
  ]

  const serviceTypes = [
    {
      id: 1,
      icon: "/standard-inspection.svg",
      title: "کارشناسی استاندارد",
      description: "بررسی وضعیت قابل مشاهده بدنه، رنگ، شاسی و بخش‌های فنی متناسب با نوع خدمت انتخابی.",
      features: [
        "بررسی بدنه، رنگ و شاسی",
        "بررسی بخش‌های فنی قابل آزمون",
        "ثبت موارد خارج از دامنه خدمت",
        "گزارش برای تصمیم خرید یا فروش",
      ],
      href: "/car-inspection",
      buttonText: "ثبت درخواست کارشناسی خودرو",
    },
    {
      id: 2,
      icon: "/vip-inspect.svg",
      title: "کارشناسی VIP",
      description: "پوشش گسترده‌تر نسبت به خدمت استاندارد؛ جزئیات دقیق دامنه هنگام ثبت درخواست اعلام می‌شود.",
      features: [
        "دامنه گسترده‌تر بررسی بدنه و فنی",
        "توضیح یافته‌ها برای مذاکره معامله",
        "هماهنگی محل و زمان اعزام",
        "گزارش مکتوب پس از انجام خدمت",
      ],
      href: "/car-inspection",
      buttonText: "ثبت درخواست کارشناسی خودرو",
    },
  ]

  const faqs = [
    {
      id: 1,
      question: "کارشناسی خودرو شامل چه مواردی است؟",
      answer:
        "بسته به نوع خدمت، وضعیت بدنه، رنگ، شاسی و بخش‌های فنی قابل آزمون بررسی می‌شود. مواردی که بازکردن قطعه، ابزار خاص یا شرایط محیط اجازه ندهد، در گزارش به‌عنوان بررسی‌نشده ثبت می‌شود.",
    },
    {
      id: 2,
      question: "تعرفه کارشناسی چقدر است؟",
      answer:
        "مبلغ نهایی به نوع خدمت، محل اعزام و مشخصات خودرو بستگی دارد و هنگام ثبت درخواست اعلام می‌شود. در این صفحه تعرفه حدسی درج نشده است.",
    },
    {
      id: 3,
      question: "کارشناسی در محل انجام می‌شود یا باید خودرو را ببریم؟",
      answer:
        "مسیر اصلی کارماچک اعزام کارشناس به آدرس اعلام‌شده در تهران و شرق تهران است. اگر بررسی خاصی فقط در مرکز مجهز ممکن باشد، پیش از انجام خدمت هماهنگ می‌شود.",
    },
    {
      id: 4,
      question: "خروجی کارشناسی چیست؟",
      answer:
        "پس از انجام خدمت، گزارش یافته‌ها در اختیار شما قرار می‌گیرد تا برای تصمیم خرید، فروش یا مذاکره قیمت استفاده شود. گزارش جایگزین معاینه فنی یا کارشناسی قضایی نیست.",
    },
    {
      id: 5,
      question: "برای موتورسیکلت هم خدمت دارید؟",
      answer:
        "بله. مسیر جداگانه کارشناسی موتورسیکلت در محل وجود دارد. اگر وسیله مورد معامله موتور است، از صفحه کارشناسی موتورسیکلت درخواست ثبت کنید.",
    },
  ]

  return (
    <div className="font-IranSans bg-white">
      {/* Hero Section */}
      <section className="w-full lg:max-w-7xl lg:mx-auto">
        
        <div className="flex flex-col lg:flex-row items-center gap-6 px-4 py-8 lg:py-16 lg:px-12">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 h-64 lg:h-80 relative rounded-2xl overflow-hidden lg:order-1">
            <Image
              src="/services.png"
              fill
              alt="خدمات کارشناسی خودرو"
              className="object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 lg:px-8 lg:order-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#101117] mb-4">
              خدمات کارشناسی خودرو پیش از معامله
            </h1>
            <p className="text-base lg:text-lg text-gray-700 font-light leading-relaxed mb-6">
              کارماچک تعمیرگاه یا سرویس دوره‌ای نیست. پیش از خرید یا فروش،
              وضعیت قابل بررسی خودرو — بدنه، رنگ، شاسی و بخش‌های فنی متناسب با
              نوع خدمت — در محل شما ارزیابی می‌شود و نتیجه در قالب گزارش در
              اختیار طرفین معامله قرار می‌گیرد.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-40 h-40 lg:w-24 lg:h-24 bg-secondary-background rounded-2xl flex items-center justify-center mb-2 bg-[#F0F2F4]">
                    <div className="w-24 h-24 lg:9 lg:h-9 relative">
  <Image
                      src={feature.icon}
                      alt={feature.title}
                   fill
                   className="objext-cover"
                    />
                    </div>
                  
                  </div>
                  <h3 className="text-xs lg:text-sm font-medium text-[#101117]">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="w-full lg:max-w-7xl lg:mx-auto px-4 py-12 lg:py-16 lg:px-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#101117] mb-8 lg:mb-12 text-center">
          انواع خدمات کارشناسی
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {serviceTypes.map((service) => (
            <div
              key={service.id}
              className="bg-[#F0F2F4] rounded-3xl p-6 lg:p-8 flex flex-col"
            >
              {/* Icon */}
              <div className="w-24 h-24  rounded-2xl flex items-center justify-center mb-4 mx-auto relative">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill className="object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-bold text-[#416CEA]  mb-3 text-center">
                {service.title}
              </h3>

           

              {/* Features List */}
              <div className="space-y-3 mb-6 flex-grow">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-[#55565A] leading-7 mb-4 text-center">
                {service.description}
              </p>
              <p className="text-center text-sm font-semibold text-[#3456bb] mb-6">
                تعرفه هنگام ثبت درخواست اعلام می‌شود
              </p>

              <Link
                href={service.href}
                className="block w-full rounded-2xl bg-[#416CEA] hover:bg-primary/90 text-white font-bold py-3 text-center"
              >
                {service.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full lg:max-w-7xl lg:mx-auto px-4 py-12 lg:py-16 lg:px-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#101117] mb-8 lg:mb-12 text-center">
          سوالات متداول
        </h2>

        <p className="mb-6 text-center text-sm text-[#55565A]">
          برای موتورسیکلت، مسیر جداگانه{" "}
          <Link href="/motorcycle-inspection" className="font-semibold text-[#3456bb] hover:underline">
            کارشناسی موتورسیکلت
          </Link>{" "}
          را ببینید.
        </p>
        <div className="bg-secondary-background rounded-2xl p-6 lg:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <AccordionTrigger className="text-right hover:text-primary">
                  <span className="text-sm lg:text-base font-medium text-[#101117]">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-right">
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Spacing */}
      <div className="h-8" />
       <div className="lg:hidden">
                  <NavigationBar activePath="/services" />
          </div>
    </div>
  )
}
