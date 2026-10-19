"use client";

import {
  ArrowLeft01Icon,
  Car01Icon,
  GarageIcon,
  Motorbike02Icon,
  SearchList01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const INSPECTION_SERVICE_LINKS = [
  {
    href: "/car-inspection",
    label: "کارشناسی ماشین",
    description: "بررسی رنگ، بدنه و فنی خودرو",
    Icon: Car01Icon,
  },
  {
    href: "/motorcycle-inspection",
    label: "کارشناسی موتور",
    description: "کارشناسی تخصصی موتورسیکلت",
    Icon: Motorbike02Icon,
  },
  {
    href: "/car-inspection-dealers",
    label: "پنل نمایشگاه‌داران",
    description: "مدیریت کارشناسی و اعتبار نمایشگاه",
    Icon: GarageIcon,
  },
] as const;

export function isInspectionServicesPath(pathname: string) {
  if (pathname === "/car-inspection-dealers") return true;
  if (pathname === "/motorcycle-inspection" || pathname.startsWith("/motorcycle-inspection/")) {
    return true;
  }
  return pathname === "/car-inspection" || pathname.startsWith("/car-inspection/");
}

type InspectionServicesSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function InspectionServicesSheet({ open, onOpenChange }: InspectionServicesSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[78vh] flex-col gap-0 overflow-hidden rounded-t-[1.75rem] border-0 bg-gradient-to-b from-[#E8EEFF] via-[#F6F8FF] to-white p-0 font-IranSans shadow-[0_-12px_40px_0px_#3456bb28] [&>button]:top-4 [&>button]:left-4 [&>button]:right-auto [&>button]:rounded-full [&>button]:bg-white/90 [&>button]:shadow-sm"
        dir="rtl"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_80%_70%_at_50%_-10%,#3456bb33,transparent)]" />
        <div className="relative mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-[#3456bb]/25" />
        <SheetHeader className="relative shrink-0 space-y-0 px-4 pb-4 pt-2 text-right">
          <div className="flex items-center gap-3">
            <SearchList01Icon
              className="shrink-0"
              size={28}
              color="#3456bb"
              strokeWidth={1.75}
            />
            <div className="min-w-0 flex-1">
              <SheetTitle className="text-base font-black text-[#101117]">خدمات کارشناسی</SheetTitle>
              <p className="mt-0.5 text-xs font-medium text-[#55565A]">مسیر مناسب خود را انتخاب کنید</p>
            </div>
          </div>
          <SheetDescription className="sr-only">انتخاب نوع خدمات کارشناسی</SheetDescription>
        </SheetHeader>
        <ul className="relative flex flex-col gap-3 px-4 py-2 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {INSPECTION_SERVICE_LINKS.map((item) => {
            const ItemIcon = item.Icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-white/90 bg-white/95 p-3 shadow-[0_4px_20px_0px_#3456bb14] backdrop-blur-sm transition-[transform,box-shadow] active:scale-[0.98] active:shadow-[0_2px_12px_0px_#3456bb20]"
                >
                  <ItemIcon
                    className="shrink-0 transition-transform group-active:scale-95"
                    size={28}
                    color="#3456bb"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0 flex-1 text-right">
                    <p className="text-sm font-bold text-[#101117]">{item.label}</p>
                    <p className="mt-0.5 text-xs text-[#55565A]">{item.description}</p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[#3456bb] transition-colors group-active:bg-[#3456bb] group-active:text-white">
                    <ArrowLeft01Icon size={18} color="currentColor" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

type InspectionServicesNavTriggerProps = {
  className: string;
  style?: React.CSSProperties;
  children: ReactNode;
};

export function InspectionServicesNavTrigger({
  className,
  style,
  children,
}: InspectionServicesNavTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        style={style}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      <InspectionServicesSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

type InspectionServicesDesktopNavProps = {
  className: string;
  style?: React.CSSProperties;
};

export function InspectionServicesDesktopNav({
  className,
  style,
}: InspectionServicesDesktopNavProps) {
  return (
    <li className="group relative mx-4">
      <span
        className={`${className} mx-0 inline-flex cursor-default items-center gap-1`}
        style={style}
        aria-haspopup="menu"
      >
        کارشناسی
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="opacity-60 transition-transform group-hover:rotate-180"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="pointer-events-none absolute right-0 top-full z-50 pt-2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <ul
          role="menu"
          className="min-w-[13.5rem] overflow-hidden rounded-2xl border border-[#E8EAF0] bg-white py-2 shadow-[0px_8px_24px_0px_#CBD5E066]"
        >
          {INSPECTION_SERVICE_LINKS.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className="block px-4 py-2.5 text-sm text-[#101117] transition-colors hover:bg-[#F4F6FB] hover:text-[#3456bb]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
