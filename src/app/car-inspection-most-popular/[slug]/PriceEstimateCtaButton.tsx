import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PriceEstimateCtaButtonProps {
  /** نام نمایشی خودرو، مثل «پژو ۲۰۶» */
  carName?: string | undefined;
  /**
   * عبارت جستجو در صفحه قیمت‌گذاری (مثل «پژو 206»).
   * اگر خالی باشد، از خود carName استفاده می‌شود.
   */
  searchTerm?: string | undefined;
  className?: string | undefined;
}

/**
 * دکمهٔ «تخمین قیمت خودرو سالم یا کارکرده».
 * کاربر را به /car-price می‌برد و همان خودرو را در اینپوت جستجو از پیش پر می‌کند
 * تا فقط تیپ/نوع آن مدل را انتخاب کند.
 */
export default function PriceEstimateCtaButton({
  carName,
  searchTerm,
  className = "",
}: PriceEstimateCtaButtonProps) {
  const query = (carName! || searchTerm!).trim();
  const href = `/car-price?car=${encodeURIComponent(query)}`;

  return (
    <Button
      asChild
      variant="outline"
      className={`bg-white text-[#416CEA] border-[#416CEA] hover:bg-[#EEF2FD] hover:text-[#3456bb] w-full h-auto min-h-12 rounded-3xl text-sm font-medium leading-6 whitespace-normal py-2.5 ${className}`}
    >
      <Link href={href}>تخمین قیمت خودرو سالم یا کارکرده {carName}</Link>
    </Button>
  );
}
