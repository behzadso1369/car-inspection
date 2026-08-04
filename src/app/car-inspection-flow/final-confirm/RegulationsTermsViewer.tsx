"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import {
  parseRegulationsContent,
  type RegulationSection,
} from "@/lib/regulations-content";
import { RegulationsAccordion } from "@/app/regulations/RegulationsAccordion";

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

function RegulationsBody({
  sections,
  loading,
}: {
  sections: RegulationSection[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-[#6B6C70]">
        در حال بارگذاری قوانین...
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#D0D4DD] px-4 py-10 text-center text-sm text-[#6B6C70]">
        در حال حاضر متن قوانین در دسترس نیست.
      </div>
    );
  }

  return <RegulationsAccordion sections={sections} />;
}

export function RegulationsTermsViewer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isDesktop = useIsDesktop();
  const [sections, setSections] = useState<RegulationSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open || loaded) return;

    setLoading(true);
    instance
      .get(ApiHelper.get("GetRegulationsData"))
      .then((res: any) => {
        const raw = res?.Regulations?.[0]?.Content || "";
        setSections(parseRegulationsContent(raw).sections);
        setLoaded(true);
      })
      .catch(() => {
        setSections([]);
      })
      .finally(() => setLoading(false));
  }, [open, loaded]);

  const header = (
    <>
      <p className="text-xs leading-6 text-[#55565A] lg:text-sm">
        ورود شما از طریق شماره همراه به منزله تایید این مقررات است. برای مطالعه،
        هر ماده را باز کنید.
      </p>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="flex max-h-[85vh] w-full max-w-2xl flex-col gap-0 overflow-hidden rounded-3xl border-[#E8EAF0] bg-white p-0 font-IranSans"
          dir="rtl"
        >
          <DialogHeader className="shrink-0 border-b border-[#EEF0F4] bg-[linear-gradient(180deg,#F7F9FF_0%,#FFFFFF_100%)] px-6 py-5 text-right">
            <DialogTitle className="text-lg font-bold text-[#101117]">
              قوانین و مقررات کارماچک
            </DialogTitle>
            <DialogDescription asChild>{header}</DialogDescription>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            <RegulationsBody sections={sections} loading={loading} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex max-h-[88vh] flex-col gap-0 overflow-hidden rounded-t-3xl border-[#E8EAF0] bg-white p-0 font-IranSans [&>button]:top-4 [&>button]:left-4 [&>button]:right-auto"
        dir="rtl"
      >
        <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-[#D8DCE6]" />
        <SheetHeader className="shrink-0 border-b border-[#EEF0F4] px-4 pb-4 pt-3 text-right">
          <SheetTitle className="text-base font-bold text-[#101117]">
            قوانین و مقررات کارماچک
          </SheetTitle>
          <SheetDescription asChild>{header}</SheetDescription>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <RegulationsBody sections={sections} loading={loading} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
