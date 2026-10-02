"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { DiscountTag01Icon, GiftIcon } from "hugeicons-react";
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
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const enterItem = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
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

    const timer = window.setTimeout(() => {
      storageSet(SHOWN_KEY, "1");
      setOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
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
        className="promo-popup-shell w-[calc(100%-2rem)] max-w-[24rem] gap-0 overflow-hidden rounded-[1.85rem] border-0 bg-transparent p-0 font-IranSans shadow-none"
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-3 left-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#5B6475] shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-[#101117] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3456bb]/40"
          aria-label="بستن"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="relative overflow-hidden rounded-[1.85rem] border border-[#C8D6FF] bg-white shadow-[0_28px_64px_rgba(28,52,120,0.28)]">
          <div className="promo-popup-hero relative overflow-hidden px-5 pb-5 pt-9 sm:px-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.22)_0%,_transparent_55%)]" />
            <div className="promo-popup-orb promo-popup-orb-a pointer-events-none absolute -top-10 -right-8 h-36 w-36 rounded-full bg-[#7B9BFF]/35 blur-2xl" />
            <div className="promo-popup-orb promo-popup-orb-b pointer-events-none absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-[#22C55E]/25 blur-2xl" />

            <motion.div
              initial="hidden"
              animate="show"
              variants={enterList}
              className="relative text-center"
            >
              <motion.div
                variants={enterItem}
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] ring-1 ring-white/25 backdrop-blur-sm"
              >
                <GiftIcon size={28} className="promo-popup-gift-icon" />
              </motion.div>

              <motion.p
                variants={enterItem}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold tracking-wide text-white ring-1 ring-white/20"
              >
                <span className="promo-popup-dot inline-block h-1.5 w-1.5 rounded-full bg-[#86EFAC]" />
                پیشنهاد ویژه کارماچک
              </motion.p>

              <DialogTitle className="sr-only">
                ۱ میلیون تومان تخفیف کارشناسی و هدیه کیف پول
              </DialogTitle>
              <DialogDescription id="direct-entry-promo-desc" className="sr-only">
                کارشناسی را الان رزرو کنید تا یک میلیون تومان تخفیف و هدیه کیف پول
                روی سفارشتان اعمال شود.
              </DialogDescription>

              <motion.h2
                variants={enterItem}
                className="mt-3 text-[1.35rem] font-black leading-9 text-white sm:text-[1.45rem]"
              >
                تخفیف +{" "}
                <span className="underline decoration-[#86EFAC] decoration-2 underline-offset-4">
                  هدیه کیف پول
                </span>
              </motion.h2>
              <motion.p
                variants={enterItem}
                className="mx-auto mt-1.5 max-w-[19rem] text-[13px] font-medium leading-6 text-white/85"
              >
                با رزرو کارشناسی همین حالا، هر دو پیشنهاد روی سفارشتان اعمال می‌شود.
              </motion.p>
            </motion.div>
          </div>

          <div className="relative bg-gradient-to-b from-[#F7FAFF] to-white px-5 pb-5 pt-4 sm:px-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={enterList}
              className="space-y-2.5"
            >
              <motion.div variants={enterItem} className="promo-popup-offer">
                <div className="relative overflow-hidden rounded-2xl border border-[#BFD0FF] bg-gradient-to-l from-[#EEF3FF] via-white to-[#F8FAFF] px-4 py-3.5 shadow-[0_10px_28px_rgba(52,86,187,0.12)]">
                  <div className="promo-popup-shine pointer-events-none absolute inset-0" />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3456bb] text-white shadow-[0_8px_18px_rgba(52,86,187,0.35)]">
                      <DiscountTag01Icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1 text-right">
                      <p className="text-[11px] font-bold text-[#5A6B8C]">
                        تخفیف کارشناسی
                      </p>
                      <p className="mt-0.5 text-[1.35rem] font-black leading-none tracking-tight text-[#3456bb]">
                        ۱ میلیون تومان
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={enterItem} className="promo-popup-wallet">
                <div className="relative overflow-hidden rounded-2xl border-2 border-[#4ADE80] bg-gradient-to-l from-[#ECFDF5] via-[#D1FAE5] to-[#F0FDF4] px-4 py-3.5 shadow-[0_12px_32px_rgba(22,163,74,0.18)]">
                  <div className="promo-popup-wallet-shine pointer-events-none absolute inset-0" />
                  <span
                    aria-hidden
                    className="promo-popup-sparkle absolute top-2 left-3 text-sm text-[#16A34A]"
                  >
                    ✦
                  </span>
                  <span
                    aria-hidden
                    className="promo-popup-sparkle promo-popup-sparkle-delay absolute bottom-2 right-3 text-[10px] text-[#22C55E]"
                  >
                    ✦
                  </span>
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#16A34A] text-white shadow-[0_8px_18px_rgba(22,163,74,0.35)]">
                      <WalletIcon size={22} />
                    </div>
                    <div className="min-w-0 flex-1 text-right">
                      <p className="text-[15px] font-black leading-6 text-[#14532D]">
                        هدیه کیف پول
                      </p>
                      <p className="mt-0.5 text-[12px] font-bold leading-5 text-[#166534]">
                        شارژ هدیه همراه با رزرو کارشناسی
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={enterItem}>
                <Button
                  type="button"
                  onClick={goReserve}
                  className="promo-popup-cta mt-2 h-12 w-full rounded-xl bg-gradient-to-l from-[#2A4BB0] to-[#416CEA] text-base font-extrabold text-white shadow-[0_12px_28px_rgba(52,86,187,0.35)] hover:from-[#243f96] hover:to-[#3456bb]"
                >
                  رزرو با تخفیف و هدیه کیف پول
                </Button>
                <button
                  type="button"
                  onClick={close}
                  className="mt-1.5 w-full py-2 text-[13px] font-medium text-[#8A8B90] transition-colors hover:text-[#101117]"
                >
                  بعداً
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
