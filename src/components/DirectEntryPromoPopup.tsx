"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DiscountTag01Icon } from "hugeicons-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { WalletIcon } from "@/components/WalletIcon";

const enterList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const enterItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const FIRST_PATH_KEY = "carmacheck:promo-first-path";
const VISITED_MAIN_KEY = "carmacheck:promo-visited-main";
const SHOWN_KEY = "carmacheck:promo-shown";
const RESERVE_HREF = "/car-inspection";

function normalizePath(path: string) {
  if (!path) return "/";
  const clean = path.split("?")[0].split("#")[0];
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean;
}

/** صفحه اصلی، رزرو کارشناسی، قیمت — ورود از این‌ها پاپ‌آپ را برای کل تب قفل می‌کند */
function isMainLandingPage(path: string) {
  const p = normalizePath(path);
  return (
    p === "/" ||
    p === "/car-inspection" ||
    p.startsWith("/car-inspection/") ||
    p === "/car-price" ||
    p.startsWith("/car-price/")
  );
}

/** صفحات حساس: حتی اگر ورود مستقیم باشد پاپ‌آپ روی خودشان باز نشود */
function isSensitivePage(path: string) {
  const p = normalizePath(path);
  return (
    p === "/login" ||
    p === "/register" ||
    p === "/verify-otp" ||
    p.startsWith("/Profile") ||
    p.startsWith("/payment") ||
    p.startsWith("/wallet") ||
    p === "/car-viewer" ||
    p.startsWith("/car-viewer/")
  );
}

function storageGet(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Safari private mode / blocked storage
  }
}

export function DirectEntryPromoPopup() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const path = normalizePath(pathname || "/");

    if (!storageGet(FIRST_PATH_KEY)) {
      storageSet(FIRST_PATH_KEY, path);
    }

    if (isMainLandingPage(path)) {
      storageSet(VISITED_MAIN_KEY, "1");
      setOpen(false);
      return;
    }

    if (storageGet(SHOWN_KEY) === "1" || storageGet(VISITED_MAIN_KEY) === "1") {
      setOpen(false);
      return;
    }

    if (isSensitivePage(path)) return;

    storageSet(SHOWN_KEY, "1");
    setOpen(true);
  }, [pathname]);

  const close = () => setOpen(false);

  const goReserve = () => {
    setOpen(false);
    router.push(RESERVE_HREF);
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <DialogContent
        showCloseButton={false}
        aria-describedby="direct-entry-promo-desc"
        className="w-[calc(100%-2rem)] max-w-[23.5rem] gap-0 overflow-hidden rounded-[1.75rem] border border-[#E4E9F2] bg-white p-0 font-IranSans shadow-[0_18px_40px_rgba(16,17,23,0.1)]"
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-3 left-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#5B6475] backdrop-blur-sm transition-colors hover:bg-white hover:text-[#101117] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3456bb]/40"
          aria-label="بستن"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="relative overflow-hidden bg-gradient-to-b from-[#F5F7FB] via-white to-white px-5 pb-5 pt-10 sm:px-6">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-[#3456bb]/8 blur-3xl" />

          <motion.div
            initial="hidden"
            animate="show"
            variants={enterList}
            className="relative text-center"
          >
            <motion.p
              variants={enterItem}
              className="text-[11px] font-bold tracking-wide text-[#3456bb]"
            >
              پیشنهاد ویژه کارماچک
            </motion.p>
            <DialogTitle className="sr-only">
              ۱ میلیون تومان تخفیف کارشناسی و هدیه کیف پول
            </DialogTitle>
            <DialogDescription id="direct-entry-promo-desc" className="sr-only">
              کارشناسی را الان رزرو کنید تا یک میلیون تومان تخفیف و هدیه کیف پول روی سفارشتان اعمال شود.
            </DialogDescription>

            <motion.div variants={enterItem} className="promo-popup-offer mt-4">
              <div className="relative overflow-hidden rounded-2xl border border-[#DDE6FF] bg-gradient-to-b from-[#F8FAFF] to-[#EEF2FD] px-4 py-4 shadow-[0_8px_20px_rgba(52,86,187,0.08)]">
                <div className="promo-popup-shine pointer-events-none absolute inset-0" />
                <div className="relative flex items-center justify-center gap-2 text-[11px] font-medium text-[#5A6B8C]">
                  <DiscountTag01Icon size={16} />
                  تخفیف کارشناسی
                </div>
                <p className="relative mt-1.5 text-[1.75rem] font-extrabold leading-none tracking-tight text-[#3456bb]">
                  ۱ میلیون تومان
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={enterItem}
              className="mt-2 flex items-center gap-3 rounded-2xl border border-[#E4E9F2] bg-[#FAFBFE] px-3.5 py-3 text-right"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FD] text-[#3456bb]">
                <WalletIcon size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[#101117]">هدیه کیف پول</p>
                <p className="mt-0.5 text-[12px] leading-5 text-[#55565A]">
                  شارژ هدیه همراه با رزرو کارشناسی
                </p>
              </div>
            </motion.div>

            <motion.p
              variants={enterItem}
              className="mx-auto mt-4 max-w-[18rem] text-[13px] leading-7 text-[#55565A]"
            >
              هر دو پیشنهاد فقط با رزرو همین حالا روی سفارشتان اعمال می‌شود.
            </motion.p>

            <motion.div variants={enterItem}>
              <Button
                type="button"
                onClick={goReserve}
                className="promo-popup-cta mt-5 h-12 w-full rounded-xl bg-[#3456bb] text-base font-bold text-white hover:bg-[#2d4aa3]"
              >
                رزرو با تخفیف و هدیه
              </Button>
              <button
                type="button"
                onClick={close}
                className="mt-1.5 w-full py-2 text-[13px] text-[#8A8B90] transition-colors hover:text-[#101117]"
              >
                بعداً
              </button>
            </motion.div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
