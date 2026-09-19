import Image from "next/image";

const QUALITY_POINTS = [
  "کارشناسی رنگ، بدنه و شاسی",
  "بررسی فنی موتور و گیربکس",
  "دیاگ و بررسی آپشن‌های خودرو",
  "گزارش شفاف و معتبر",
] as const;

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#416CEA" strokeWidth="1.6" />
      <path d="M8 12.2 10.6 15 16 9.5" stroke="#416CEA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QualityBox() {
  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden py-8 px-4 font-IranSans"
      aria-labelledby="quality-box-heading"
    >
      <Image
        src="/service-background.webp"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        quality={70}
        loading="lazy"
      />
      <div className="relative z-10 bg-[#151313E5] text-white py-8 px-4 rounded-4xl w-full lg:w-2/5">
        <h2
          id="quality-box-heading"
          className="my-3 text-lg font-bold leading-8 lg:text-2xl lg:leading-10"
        >
          کارشناسی دقیق، برای یک خرید مطمئن‌تر
        </h2>
        <p className="my-3 text-base leading-8">
          ما خودرو را فقط از روی ظاهر بررسی نمی‌کنیم. کارشناس کارماچک وضعیت{" "}
          <strong className="font-semibold">رنگ و بدنه</strong>،{" "}
          <strong className="font-semibold">شاسی</strong>، بخش‌های فنی،{" "}
          <strong className="font-semibold">دیاگ</strong> و آپشن‌ها را دقیق بررسی
          می‌کند تا قبل از خرید، تصویر شفافی از وضعیت واقعی خودرو داشته باشید.
        </p>
        <ul className="my-3">
          {QUALITY_POINTS.map((point) => (
            <li key={point} className="my-3 text-lg flex items-center">
              <CheckIcon />
              <span className="mx-2">{point}</span>
            </li>
          ))}
        </ul>
        <a
          href="/car-inspection"
          className="rounded-3xl py-3 px-4 inline-block text-center w-full my-4 bg-[#416CEA] text-white font-bold"
        >
          رزرو کارشناسی خودرو در محل
        </a>
      </div>
    </section>
  );
}
