import { BrandLogo } from "@/components/seo/BrandLogo";

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.5 3.5h3L12 8l-2 1.5a12 12 0 0 0 4.5 4.5L16 12l4.5 1.5v3c0 1-1 2.5-6 2.5C8 19 5 12 5 7.5c0-5 1.5-4 2.5-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CallActionProps = {
  data?: any;
  /** روی موبایل به‌صورت fixed زیر بنر بچسبد (مثلاً صفحه قیمت‌گذاری) */
  fixed?: boolean;
};

export default function CallAction({ data, fixed = false }: CallActionProps) {
  const sectionClass = fixed
    ? "fixed inset-x-0 top-11 z-30 bg-secondary p-4 h-11 text-black flex justify-between items-center shadow-[0px_4px_8px_0px_#00000014]"
    : "sticky top-11 z-20 bg-secondary p-4 h-11 text-black flex justify-between items-center shadow-[0px_4px_8px_0px_#00000014]";

  return (
    <>
      {fixed ? <div className="h-11" aria-hidden /> : null}
      <section className={sectionClass}>
        <div className="flex items-center">
          <a href="/" aria-label="صفحه اصلی کارماچک">
            <BrandLogo path={data?.ImagePath} width={130} height={30} />
          </a>
        </div>

        <span className="text-[#101117] flex items-center font-IranSans">
          <a
            className="rounded-3xl font-IranSans border border-white px-2"
            href={`tel:${data?.NavbarPhoneNumber}`}
          >
            {data?.NavbarPhoneNumber}
          </a>
          <PhoneIcon />
        </span>
      </section>
    </>
  );
}
