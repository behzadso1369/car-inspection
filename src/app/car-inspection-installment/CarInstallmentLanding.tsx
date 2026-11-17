import Link from "next/link";
import { DEALERS_HUB_PATH } from "@/app/car-inspection-dealers/dealer-hub-data";
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
  CAR_INSTALLMENT_FAQS,
  CAR_INSTALLMENT_H1,
  CAR_INSTALLMENT_STEPS,
  CAR_INSTALLMENT_TABLE_ROWS,
} from "./car-installment-data";

const INSPECTION_URL = "/car-inspection";
const TEHRAN_URL = "/car-inspection-tehran";
const CONTACT_URL = "/contact-us";
const PRICE_URL = "/car-price";
const NEW_PRICE_URL = "/car-new-price";

export default function CarInstallmentLanding() {
  return (
    <main
      id="main-content"
      className="local-area-page max-w-full overflow-x-hidden font-IranSans text-[#101117] antialiased"
    >
      <article dir="rtl">
        <InstallmentHubHero
          breadcrumbLabel="کارشناسی قسطی خودرو"
          eyebrow="کارماچک · کارشناسی خودرو با دیجی‌پی"
          h1={CAR_INSTALLMENT_H1}
          lead="در کارماچک می‌توانید کارشناسی قسطی خودرو را با اعتبار چهارقسطه دیجی‌پی ثبت کنید؛ یعنی هزینه کارشناسی ماشین را به‌جای پرداخت یکجا، در ۴ قسط بپردازید."
          intro="این خدمت برای کارشناسی اقساطی خودروی کارکرده پیش از خرید، کارشناسی خودرو صفر هنگام تحویل و بررسی رنگ، بدنه و بخش‌های فنی در دسترس است. کیفیت کارشناسی و گزارش با پرداخت اقساطی تغییری نمی‌کند؛ فقط پرداخت هزینه منعطف‌تر می‌شود."
          primaryCta={{
            label: "بررسی قیمت و ثبت درخواست کارشناسی",
            href: INSPECTION_URL,
          }}
          secondaryCta={{
            label: "مشاهده خدمات ویژه نمایشگاه‌داران",
            href: DEALERS_HUB_PATH,
          }}
        />

        <div className="bg-[#F4F6FB]">
          <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
            <SectionCard id="tehran" title="کارشناسی قسطی خودرو در تهران">
              <P>
                در کارشناسی قسطی خودرو، هزینهٔ بررسی همان خودرو را طبق شرایط
                سفارش در چند نوبت می‌پردازید. اگر برای بازدید یک خودروی دست‌دوم
                یا تحویل خودروی صفر وقت گرفته‌اید، ابتدا نوع بررسی و محل
                کارشناسی را مشخص کنید تا بتوانید مبلغ کل و برنامهٔ پرداخت را قبل
                از رزرو بسنجید.
              </P>
              <P>
                کارماچک خدمات کارشناسی خودرو را در{" "}
                <Link href={TEHRAN_URL} className={installmentLinkClass}>
                  محل خودرو در تهران
                </Link>{" "}
                و در مرکز شرق تهران ارائه می‌دهد.
              </P>
              <P>
                <strong className="text-[#101117]">نکته مهم:</strong> اعتبار و
                اقساط را دیجی‌پی تخصیص می‌دهد و مدیریت می‌کند. کارماچک خدمت
                کارشناسی را ارائه می‌دهد و دیجی‌پی را به‌عنوان یکی از روش‌های
                پرداخت در اختیار شما می‌گذارد.
              </P>
            </SectionCard>

            <SectionCard
              id="who"
              title="چه کسانی می‌توانند از پرداخت اقساطی هزینه کارشناسی استفاده کنند؟"
            >
              <P>
                هر کاربری که اعتبار فعال دیجی‌پی داشته باشد و مانده اعتبارش برای
                مبلغ سفارش کافی باشد، می‌تواند از این روش استفاده کند. این روش
                بیشتر برای این افراد کاربرد دارد:
              </P>
              <ul className="mt-4 list-disc space-y-2 pr-5 text-sm leading-8 text-[#55565A] sm:text-[15px]">
                <li>خریداران خودروی کارکرده پیش از پرداخت به فروشنده</li>
                <li>خریداران خودرو صفر هنگام تحویل</li>
                <li>
                  نمایشگاه‌داران خودرو (
                  <Link href={DEALERS_HUB_PATH} className={installmentLinkClass}>
                    پنل کارشناسی ویژه نمایشگاه‌داران
                  </Link>
                  )
                </li>
                <li>هر کسی که ترجیح می‌دهد هزینه کارشناسی را در چند قسط بپردازد</li>
              </ul>
            </SectionCard>

            <SectionCard
              id="digipay"
              title="کارشناسی خودرو با اعتبار چهارقسطه دیجی‌پی"
            >
              <SubHeading>اعتبار چهارقسطه دیجی‌پی چیست؟</SubHeading>
              <P>
                اعتبار چهارقسطه دیجی‌پی یک روش خرید اعتباری است که طی آن ۲۵ درصد
                مبلغ در پرداخت اول دریافت می‌شود و باقی‌مانده در سه نوبت ماهانه
                تسویه می‌شود؛ سررسید اقساط بعدی ابتدای ماه است و تا روز پنجم مهلت
                پرداخت بدون جریمه وجود دارد.
              </P>
              <SubHeading>شرایط پرداخت هزینه کارشناسی با دیجی‌پی</SubHeading>
              <ul className="mt-4 list-disc space-y-2 pr-5 text-sm leading-8 text-[#55565A] sm:text-[15px]">
                <li>اعتبار چهارقسطه فعال و قابل استفاده باشد.</li>
                <li>مانده اعتبار با مبلغ سفارش سازگار باشد.</li>
                <li>گزینه دیجی‌پی برای همان سفارش کارشناسی نمایش داده شود.</li>
              </ul>
              <P>
                پیش از تأیید پرداخت، مبلغ خدمت، مبلغ قابل تقسیط و کارمزدهای
                درج‌شده را بررسی کنید. قسط اول، مجموع هزینه کارشناسی نیست؛ برای
                مقایسه پرداخت نقدی و اقساطی، جمع همه پرداخت‌ها را در نظر بگیرید.
              </P>
            </SectionCard>

            <SectionCard
              id="pricing"
              title="هزینه کارشناسی قسطی خودرو چقدر است؟"
            >
              <P>
                هزینه از مبلغ خدمت انتخابی و شرایط پرداخت همان سفارش مشخص
                می‌شود. مدل و گروه خودرو، نوع کارشناسی و محل انجام خدمت در تعیین
                مبلغ مؤثرند.
              </P>
              <SubHeading>مبلغ هر قسط چگونه محاسبه می‌شود؟</SubHeading>
              <P>
                مبلغ هر قسط = مبلغ مشمول پرداخت چهارقسطه ÷ ۴. اگر بخشی از سفارش
                خارج از اعتبار پرداخت شود، مبلغ پرداخت امروز می‌تواند بیشتر از یک
                قسط باشد.
              </P>
              <SubHeading>نمونه محاسبه هزینه کارشناسی خودرو در ۴ قسط</SubHeading>
              <P>
                فرض کنید مبلغ مشمول پرداخت چهارقسطه، ۲٬۴۰۰٬۰۰۰ تومان باشد:
              </P>
              <InstallmentExampleTable
                rows={[...CAR_INSTALLMENT_TABLE_ROWS]}
                totalLabel="مجموع چهار قسط"
                totalAmount="۲٬۴۰۰٬۰۰۰ تومان"
                caption="این مبلغ صرفاً مثال محاسباتی است و تعرفه کارماچک نیست."
              />
              <P>
                برای مشاهده مبلغ سفارش خود، وارد{" "}
                <Link href={INSPECTION_URL} className={installmentLinkClass}>
                  مسیر ثبت درخواست کارشناسی
                </Link>{" "}
                شوید و در مرحله پرداخت دیجی‌پی، مبلغ قسط اول را ببینید.
              </P>
            </SectionCard>

            <SectionCard
              id="how-to"
              title="مراحل ثبت درخواست کارشناسی اقساطی خودرو در کارماچک"
            >
              <ol className="mt-4 list-decimal space-y-4 pr-5 text-sm leading-8 text-[#55565A] marker:font-bold marker:text-[#3456bb] sm:text-[15px]">
                {CAR_INSTALLMENT_STEPS.map((step) => (
                  <li key={step.title}>
                    <strong className="text-[#101117]">{step.title}.</strong>{" "}
                    {step.description}
                  </li>
                ))}
              </ol>
            </SectionCard>

            <SectionCard
              id="location"
              title="کارشناسی قسطی خودرو در محل تهران و شرق تهران"
            >
              <P>
                با کارشناسی خودرو در محل، بررسی در آدرسی انجام می‌شود که ماشین
                در آن قرار دارد. برای جزئیات محدوده و شیوه اعزام،{" "}
                <Link href={TEHRAN_URL} className={installmentLinkClass}>
                  صفحه کارشناسی خودرو در تهران
                </Link>{" "}
                را ببینید.
              </P>
              <P>
                اگر مراجعه حضوری برای شما مناسب‌تر است، می‌توانید برای
                کارشناسی در مرکز کارماچک هماهنگ کنید: {COMPANY.streetAddress}.
                برای تماس و هماهنگی،{" "}
                <Link href={CONTACT_URL} className={installmentLinkClass}>
                  صفحه ارتباط با کارماچک
                </Link>{" "}
                را ببینید.
              </P>
            </SectionCard>

            <SectionCard
              id="services"
              title="چه خودروها و خدماتی را می‌توان به‌صورت اقساطی کارشناسی کرد؟"
            >
              <SubHeading>کارشناسی قسطی خودروی کارکرده پیش از خرید</SubHeading>
              <P>
                وضعیت فنی، شاسی و سایر موارد پکیج در خرید دست‌دوم اهمیت دارند.
                برای برآورد اولیه از{" "}
                <Link href={PRICE_URL} className={installmentLinkClass}>
                  محاسبه قیمت خودرو کارکرده
                </Link>{" "}
                استفاده کنید.
              </P>
              <SubHeading>کارشناسی خودرو صفر هنگام تحویل</SubHeading>
              <P>
                صفرکیلومتر بودن، نیاز به بررسی هنگام تحویل را از بین نمی‌برد. برای
                قیمت،{" "}
                <Link href={NEW_PRICE_URL} className={installmentLinkClass}>
                  قیمت خودروی صفر
                </Link>{" "}
                را ببینید.
              </P>
              <SubHeading>کارشناسی اقساطی رنگ، بدنه و بخش‌های فنی</SubHeading>
              <P>
                دامنه کارشناسی با پکیج انتخابی مشخص می‌شود. پیش از پرداخت،{" "}
                <Link href={INSPECTION_URL} className={installmentLinkClass}>
                  جزئیات خدمات کارشناسی خودرو
                </Link>{" "}
                را بخوانید.
              </P>
            </SectionCard>

            <SectionCard id="dealers" title="پنل نمایشگاه‌داران و اعتبار هدیه">
              <P>
                برای نمایشگاه‌هایی که چند خودرو کارشناسی می‌کنند،{" "}
                <Link href={DEALERS_HUB_PATH} className={installmentLinkClass}>
                  پنل کارشناسی خودرو ویژه نمایشگاه‌داران
                </Link>{" "}
                گزارش‌ها و مصرف اعتبار را یکجا نشان می‌دهد. با هر کارشناسی،
                اعتبار هدیه متناسب با مبلغ به کیف پول اضافه می‌شود.
              </P>
            </SectionCard>

            <InstallmentFaqSection
              title="سؤال‌های متداول درباره کارشناسی قسطی خودرو"
              faqs={[...CAR_INSTALLMENT_FAQS]}
            />

            <InstallmentBottomCta
              title="استعلام هزینه و رزرو کارشناسی قسطی خودرو"
              body="مدل و نوع کارشناسی را مشخص کنید، مبلغ سفارش را ببینید و در صورت فعال بودن، پرداخت چهارقسطه دیجی‌پی را انتخاب کنید."
              primaryCta={{
                label: "ثبت درخواست کارشناسی",
                href: INSPECTION_URL,
              }}
            />
          </div>
        </div>
      </article>
    </main>
  );
}