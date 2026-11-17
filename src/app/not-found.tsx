import Link from "next/link";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="mx-auto min-h-screen max-w-xl bg-[#F3F5F8] px-4 py-16 font-IranSans text-right text-[#101117]"
    >
      <h1 className="text-2xl font-bold text-[#101117]">صفحه پیدا نشد</h1>
      <p className="mt-3 leading-8 text-[#55565A]">
        این نشانی در سایت کارماچک وجود ندارد. از مسیرهای زیر ادامه بدهید.
      </p>
      <nav className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
        <Link
          href="/"
          className="rounded-2xl bg-[#3456bb] px-4 py-2.5 text-white"
        >
          صفحه اصلی
        </Link>
        <Link
          href="/blog"
          className="rounded-2xl border border-[#3456bb]/30 px-4 py-2.5 text-[#3456bb]"
        >
          بلاگ
        </Link>
        <Link
          href="/car-inspection"
          className="rounded-2xl border border-[#3456bb]/30 px-4 py-2.5 text-[#3456bb]"
        >
          کارشناسی خودرو
        </Link>
      </nav>
    </main>
  );
}
