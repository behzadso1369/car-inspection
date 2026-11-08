"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal, Sparkles } from "lucide-react";
import type { CarNewPriceItem } from "@/lib/car-price/carNewPriceApi";

const CEILING_PAD = 2_000_000_000;

function formatToman(value: number) {
  return `${value.toLocaleString("fa-IR")}\u2060\u00A0تومان`;
}

const BILLION = 1_000_000_000;
const MILLION = 1_000_000;

/** یک‌خطی برای موبایل — میلیارد + میلیون (نه فقط میلیارد) */
function formatTomanMobileOneLine(value: number) {
  const v = Math.max(0, Math.round(value));

  if (v >= BILLION) {
    const billions = Math.floor(v / BILLION);
    const millions = Math.round((v - billions * BILLION) / MILLION);
    const chunks: string[] = [];
    if (billions > 0) {
      chunks.push(
        `${billions.toLocaleString("fa-IR", { useGrouping: false })}\u00A0میلیارد`,
      );
    }
    if (millions > 0) {
      chunks.push(
        `${millions.toLocaleString("fa-IR", { useGrouping: false })}\u00A0میلیون`,
      );
    }
    if (chunks.length === 0) {
      return `۰\u2060\u00A0تومان`;
    }
    return `${chunks.join("\u00A0و\u00A0")}\u2060\u00A0تومان`;
  }

  if (v >= MILLION) {
    const m = Math.round(v / MILLION);
    return `${m.toLocaleString("fa-IR", { useGrouping: false })}\u00A0میلیون\u2060\u00A0تومان`;
  }

  if (v >= 1_000) {
    const k = Math.round(v / 1_000);
    return `${k.toLocaleString("fa-IR", { useGrouping: false })}\u00A0هزار\u2060\u00A0تومان`;
  }

  return `${v.toLocaleString("fa-IR", { useGrouping: false })}\u2060\u00A0تومان`;
}

function TomanPrice({ value }: { value: number }) {
  return (
    <div
      dir="rtl"
      className="mt-0.5 flex h-4 w-full shrink-0 items-center justify-end overflow-hidden md:mt-0.5 md:h-auto md:min-h-[1.125rem]"
    >
      <span className="hidden whitespace-nowrap font-black tabular-nums text-[#101117] [overflow-wrap:normal] md:inline md:text-xs">
        {formatToman(value)}
      </span>
      <bdi
        dir="rtl"
        className="inline-block max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap text-[clamp(8px,2.65vw,10px)] font-black leading-none tabular-nums tracking-tight text-[#101117] [-ms-overflow-style:none] [overflow-wrap:normal] [scrollbar-width:none] [word-break:keep-all] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        {formatTomanMobileOneLine(value)}
      </bdi>
    </div>
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function snapStep(value: number, step: number) {
  if (step <= 0) return value;
  return Math.round(value / step) * step;
}

type CarNewPriceRangeFilterProps = {
  items: CarNewPriceItem[];
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  rangeMin: number;
  rangeMax: number;
  onRangeChange: (min: number, max: number) => void;
};

export function useCarNewPriceRangeBounds(items: CarNewPriceItem[]) {
  return useMemo(() => {
    const floor = 0;
    const peak =
      items.length > 0
        ? Math.max(...items.map((i) => i.carPrice), 0)
        : 0;
    const ceiling = peak + CEILING_PAD;
    const step = Math.max(10_000_000, Math.floor(ceiling / 120));
    return { floor, ceiling, step };
  }, [items]);
}

export default function CarNewPriceRangeFilter({
  items,
  enabled,
  onEnabledChange,
  rangeMin,
  rangeMax,
  onRangeChange,
}: CarNewPriceRangeFilterProps) {
  const { floor, ceiling, step } = useCarNewPriceRangeBounds(items);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      if (mq.matches) setPanelOpen(true);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (enabled) {
      setPanelOpen(true);
    } else if (!isDesktop) {
      setPanelOpen(false);
    }
  }, [enabled]);

  const countInRange = useMemo(() => {
    return items.filter(
      (i) => i.carPrice >= rangeMin && i.carPrice <= rangeMax,
    ).length;
  }, [items, rangeMin, rangeMax]);

  const minPct = ceiling > 0 ? (rangeMin / ceiling) * 100 : 0;
  const maxPct = ceiling > 0 ? (rangeMax / ceiling) * 100 : 100;

  const setMin = useCallback(
    (raw: number) => {
      const v = snapStep(clamp(raw, floor, rangeMax), step);
      onRangeChange(v, rangeMax);
    },
    [floor, rangeMax, step, onRangeChange],
  );

  const setMax = useCallback(
    (raw: number) => {
      const v = snapStep(clamp(raw, rangeMin, ceiling), step);
      onRangeChange(rangeMin, v);
    },
    [rangeMin, ceiling, step, onRangeChange],
  );

  const valueFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track || ceiling <= 0) return 0;
      const rect = track.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const ratio = x / rect.width;
      return snapStep(ratio * ceiling, step);
    },
    [ceiling, step],
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => {
      const v = valueFromClientX(e.clientX);
      if (dragging === "min") setMin(v);
      else setMax(v);
    };

    const onUp = () => setDragging(null);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, setMin, setMax, valueFromClientX]);

  const inactive = !enabled;

  return (
    <section
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-opacity md:rounded-3xl ${
        inactive
          ? "border-[#E8ECF4] opacity-[0.92]"
          : "border-[#3456bb]/25 shadow-[0_8px_28px_rgba(52,86,187,0.08)]"
      }`}
      aria-labelledby={`${id}-title`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EEF1F6] bg-gradient-to-l from-[#EEF2FD]/90 to-white px-3 py-2 md:px-4 md:py-3">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl text-right outline-none focus-visible:ring-2 focus-visible:ring-[#3456bb]/30 md:flex-initial md:pointer-events-none"
          aria-expanded={panelOpen}
          aria-controls={`${id}-panel`}
          onClick={() => setPanelOpen((o) => !o)}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl md:h-9 md:w-9 ${
              enabled
                ? "bg-[#3456bb] text-white shadow-md shadow-[#3456bb]/25"
                : "bg-[#F3F5F8] text-[#6B6C70]"
            }`}
            aria-hidden="true"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id={`${id}-title`}
              className="text-[13px] font-black text-[#101117] md:text-sm"
            >
              بازه قیمت
            </h2>
            <p className="text-[10px] text-[#6B6C70] md:text-[11px]">
              {enabled
                ? "جستجو فقط بین این قیمت‌ها"
                : "جستجو بین همه مدل‌ها"}
            </p>
          </div>
          <ChevronDown
            className={`mr-auto h-4 w-4 shrink-0 text-[#6B6C70] transition-transform md:hidden ${
              panelOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          role="switch"
          dir="rtl"
          aria-checked={enabled}
          aria-label="فعال‌سازی فیلتر بازه قیمت"
          onClick={(e) => {
            e.stopPropagation();
            onEnabledChange(!enabled);
          }}
          className={`relative inline-flex h-9 min-w-[7.5rem] shrink-0 items-center rounded-full border px-1 text-[11px] font-bold transition-colors md:h-10 md:min-w-28 md:text-xs ${
            enabled
              ? "border-[#3456bb]/40 bg-[#EEF2FD]"
              : "border-[#E8ECF4] bg-[#F3F5F8]"
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1 h-7 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-all duration-200 ease-out md:top-1.5 md:h-7 ${
              enabled ? "right-1" : "left-1"
            }`}
          />
          <span
            className={`relative z-[1] flex-1 text-center transition-colors ${
              enabled ? "text-[#3456bb]" : "text-[#999A9C]"
            }`}
          >
            فعال
          </span>
          <span
            className={`relative z-[1] flex-1 text-center transition-colors ${
              enabled ? "text-[#999A9C]" : "text-[#55565A]"
            }`}
          >
            خاموش
          </span>
        </button>
      </div>

      <div
        id={`${id}-panel`}
        className={`space-y-3 px-3 py-3 md:block md:space-y-4 md:px-4 md:py-4 ${
          panelOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="grid grid-cols-[minmax(0,1.2fr)_auto_minmax(0,1.2fr)] items-end gap-1.5 text-[11px] md:grid-cols-[1fr_auto_1fr] md:gap-2 md:text-xs"
          dir="ltr"
        >
          <div
            dir="rtl"
            className="flex min-h-[3.5rem] min-w-0 flex-col justify-end overflow-hidden rounded-xl border border-[#E8ECF4] bg-[#F9FAFC] px-2 py-2 text-right text-[#55565A] md:min-h-0 md:px-2.5"
          >
            <span className="block text-sm font-black text-[#3456bb] md:text-base">
              از
            </span>
            <TomanPrice value={rangeMin} />
          </div>
          <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-[#EFFAF3] px-1.5 py-1.5 text-center font-bold text-[#1F7A45] md:flex-row md:gap-1 md:rounded-full md:px-2.5 md:py-1.5 md:text-[11px]">
            <Sparkles
              className="hidden h-3 w-3 shrink-0 md:block"
              aria-hidden="true"
            />
            <span className="hidden whitespace-nowrap md:inline">
              {countInRange.toLocaleString("fa-IR")} مدل در این بازه
            </span>
            <span className="flex flex-col items-center leading-none md:hidden">
              <span className="text-[12px] font-black tabular-nums">
                {countInRange.toLocaleString("fa-IR")}
              </span>
              <span className="mt-0.5 text-[9px]">مدل</span>
            </span>
          </div>
          <div
            dir="rtl"
            className="flex min-h-[3.5rem] min-w-0 flex-col justify-end overflow-hidden rounded-xl border border-[#E8ECF4] bg-[#F9FAFC] px-2 py-2 text-right text-[#55565A] md:min-h-0 md:px-2.5"
          >
            <span className="block text-sm font-black text-[#3456bb] md:text-base">
              تا
            </span>
            <TomanPrice value={rangeMax} />
          </div>
        </div>

        <div
          ref={trackRef}
          className="relative mx-0.5 h-11 touch-none select-none md:h-12"
          dir="ltr"
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            const v = valueFromClientX(e.clientX);
            const distMin = Math.abs(v - rangeMin);
            const distMax = Math.abs(v - rangeMax);
            if (distMin <= distMax) setMin(v);
            else setMax(v);
          }}
        >
          <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-[#E8ECF4]" />
          <div
            className="absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#3456bb] via-[#3563E9] to-[#416CEA] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
            style={{
              left: `${minPct}%`,
              width: `${Math.max(0, maxPct - minPct)}%`,
            }}
          />
          <button
            type="button"
            aria-label="حداقل قیمت"
            aria-valuemin={floor}
            aria-valuemax={rangeMax}
            aria-valuenow={rangeMin}
            className="absolute top-1/2 z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#3456bb] shadow-[0_4px_14px_rgba(52,86,187,0.45)] outline-none ring-[#3456bb]/30 focus-visible:ring-4 active:scale-110 md:h-8 md:w-8"
            style={{ left: `${minPct}%` }}
            onPointerDown={(e) => {
              e.preventDefault();
              setDragging("min");
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            }}
          />
          <button
            type="button"
            aria-label="حداکثر قیمت"
            aria-valuemin={rangeMin}
            aria-valuemax={ceiling}
            aria-valuenow={rangeMax}
            className="absolute top-1/2 z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#3456bb] shadow-[0_4px_14px_rgba(52,86,187,0.45)] outline-none ring-[#3456bb]/30 focus-visible:ring-4 active:scale-110 md:h-8 md:w-8"
            style={{ left: `${maxPct}%` }}
            onPointerDown={(e) => {
              e.preventDefault();
              setDragging("max");
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            }}
          />
        </div>

        <p
          dir="rtl"
          className="text-center text-[10px] leading-5 text-[#999A9C] md:text-[11px]"
        >
          <span className="inline-block whitespace-nowrap">
            <span>صفر تا{"\u00A0"}</span>
            <span className="font-bold text-[#6B6C70] max-md:hidden">
              {formatToman(ceiling)}
            </span>
            <bdi className="font-bold text-[#6B6C70] md:hidden">
              {formatTomanMobileOneLine(ceiling)}
            </bdi>
          </span>
        </p>
      </div>
    </section>
  );
}
