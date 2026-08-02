const FEATURES = [
  {
    title: "گزارش شفاف و دقیق",
    description:
      "نتیجه کارشناسی خودرو با توضیحی روشن ارائه می‌شود تا ایرادها و اهمیت هرکدام را بهتر درک کنید.",
  },
  {
    title: "کارشناسان معتبر و ارزیابی‌شده",
    description:
      "کارشناسی خودرو توسط کارشناسان متخصصی انجام می‌شود که صلاحیت و عملکرد آن‌ها ارزیابی شده است.",
  },
  {
    title: "بررسی چندجانبه",
    description:
      "وضعیت فنی، رنگ و بدنه خودرو متناسب با نوع خدمت انتخابی ارزیابی می‌شود.",
  },
  {
    title: "تصمیم سریع و دقیق‌تر",
    description:
      "فقط ایراد خودرو را شناسایی نمی‌کنیم؛ اثر آن روی هزینه تعمیر و ارزش واقعی معامله را هم مشخص می‌کنیم تا از ضررهای چند صد میلیونی حین معامله جلوگیری شود.",
  },
] as const;

export default function HomeFeatures() {
  const leftBox = FEATURES.slice(0, 2);
  const rightBox = FEATURES.slice(2, 4);

  return (
    <section
      dir="rtl"
      className="bg-white px-4 pb-4 pt-12 font-IranSans lg:px-36"
      aria-labelledby="home-features-heading"
    >
      <h2
        id="home-features-heading"
        className="mb-7 text-center text-lg font-bold text-[#101117] lg:text-2xl"
      >
        چرا کارشناسی خودرو با کارماچک؟
      </h2>

      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {[leftBox, rightBox].map((box, boxIndex) => (
          <div
            key={boxIndex}
            className="rounded-3xl border border-[#E8ECF4] bg-[#F8FAFF] p-5 md:p-6"
          >
            <ul className="space-y-6">
              {box.map((item) => (
                <li key={item.title}>
                  <h3 className="text-base font-bold text-[#101117] md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-8 text-[#55565A] md:text-base">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
