import Image from "next/image";

const SERVICES = [
  {
    title: "کارشناسی خودرو",
    description:
      "پیش از خرید یا فروش، وضعیت خودرو را به طور کامل بررسی کنید و با شناخت دقیق‌تری وارد معامله شوید.",
    href: "/car-inspection",
    cta: "رزرو کارشناسی خودرو",
    image: "/images/home/service-inspection.webp",
    imageAlt: "کارشناسی خودرو؛ بررسی رنگ و بدنه با دستگاه ضخامت‌سنج رنگ",
  },
  {
    title: "قیمت‌گذاری خودرو",
    description:
      "ارزش تقریبی خودرو را بر اساس مشخصات، شرایط بازار و وضعیت آن بررسی کنید.",
    href: "/car-price",
    cta: "تخمین قیمت خودرو",
    image: "/images/home/service-pricing.webp",
    imageAlt: "قیمت‌گذاری خودرو؛ تخمین ارزش خودرو بر اساس مشخصات و بازار",
  },
] as const;

export default function Services() {
  return (
    <section
      dir="rtl"
      className="bg-white px-4 py-12 font-IranSans lg:px-36"
      aria-labelledby="home-services-heading"
    >
      <h2
        id="home-services-heading"
        className="mb-7 text-center text-lg font-bold text-[#101117] lg:text-2xl"
      >
        خدمات کارشناسی کارماچک
      </h2>

      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        {SERVICES.map((service) => (
          <article
            key={service.title}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#DCDCDC] bg-white"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority={false}
              />
            </div>

            <div className="absolute left-6 top-52 z-30 flex h-16 w-14 -translate-y-1/2 justify-center rounded-full bg-white py-1">
              <a
                href={service.href}
                aria-label={service.cta}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#416CEA] text-white"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 6 9 12l6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="mt-10 flex flex-1 flex-col justify-between px-4 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#101117]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#55565A]">
                  {service.description}
                </p>
              </div>
              <a
                href={service.href}
                className="mt-4 block w-full rounded-3xl bg-[#416CEA] px-4 py-2.5 text-center text-white"
              >
                {service.cta}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
