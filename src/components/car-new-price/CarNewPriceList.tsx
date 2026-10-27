"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import InspectCtaButton from "@/app/car-inspection-most-popular/[slug]/InspectCtaButton";
import {
  loadCarNewPriceSelect,
  type CarNewPriceItem,
} from "@/lib/car-price/carNewPriceApi";
import {
  brandModelSearchTerm,
  groupItemsByBrand,
} from "@/lib/car-price/carBrandGroup";
import { textMatchesQuery } from "@/lib/car-price/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/app/components/mobile/Home/NavigationBar";

function formatPriceDisplay(item: CarNewPriceItem) {
  if (item.carPriceText) {
    return `${item.carPriceText.replace(/,/g, "٬")} تومان`;
  }
  return `${item.carPrice.toLocaleString("fa-IR")} تومان`;
}

export default function CarNewPriceList() {
  const [items, setItems] = useState<CarNewPriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items: rows } = await loadCarNewPriceSelect();
      setItems(rows);
    } catch (err) {
      const message =
        err instanceof Error && err.message === "RATE_LIMIT"
          ? "درخواست‌های زیاد؛ چند لحظه بعد دوباره تلاش کنید."
          : err instanceof Error
            ? err.message
            : "بارگذاری قیمت‌ها ممکن نشد.";
      setError(message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return items;
    return items.filter((item) => textMatchesQuery(item.carName, debouncedQuery));
  }, [items, debouncedQuery]);

  const groups = useMemo(() => groupItemsByBrand(filtered), [filtered]);

  return (
    <>
      <div className="sticky top-[4.5rem] z-30 -mx-3 space-y-3 border-b border-[#E8ECF4] bg-[#F3F5F8]/95 px-3 py-3 backdrop-blur-md md:static md:mx-0 md:rounded-2xl md:border md:bg-white md:p-4 lg:top-28">
        <div className="relative">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999A9C]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی نام خودرو یا برند..."
            className="h-12 rounded-2xl border-[#E8ECF4] bg-white pr-10 text-right focus-visible:border-[#3456bb] focus-visible:ring-[#3456bb]/20"
            autoComplete="off"
          />
        </div>
        {!loading && !error && (
          <p className="text-[11px] text-[#6B6C70] md:text-xs">
            {filtered.length.toLocaleString("fa-IR")} مدل
            {debouncedQuery ? ` برای «${debouncedQuery}»` : ""}
          </p>
        )}
      </div>

      {loading && (
        <div className="mt-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-white/80 md:h-16"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="mt-6 rounded-2xl border border-dashed border-[#E8ECF4] bg-white px-4 py-10 text-center">
          <p className="text-sm text-[#6B6C70]">{error}</p>
          <Button
            type="button"
            variant="outline"
            className="mt-4 rounded-2xl border-[#3456bb]/25 text-[#3456bb]"
            onClick={() => void load()}
          >
            تلاش مجدد
          </Button>
        </div>
      )}

      {!loading && !error && groups.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-[#E8ECF4] bg-white px-4 py-12 text-center text-sm text-[#6B6C70]">
          خودرویی با این فیلتر پیدا نشد.
        </div>
      )}

      {!loading && !error && groups.length > 0 && (
        <div className="mt-4 space-y-8 md:mt-6">
          {groups.map((group) => (
            <section key={group.brand} aria-labelledby={`brand-${group.brand}`}>
              <h2
                id={`brand-${group.brand}`}
                className="mb-3 border-r-4 border-[#3456bb] pr-3 text-base font-black text-[#101117] md:text-lg"
              >
                قیمت خودرو {group.brand}
              </h2>
              <ul className="overflow-hidden rounded-2xl border border-[#E8ECF4] bg-white shadow-sm md:rounded-3xl">
                {group.items.map((item, index) => (
                  <li
                    key={item.id}
                    className={`px-3 py-2.5 md:px-5 md:py-3.5 ${
                      index > 0 ? "border-t border-[#EEF1F6]" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-2 md:grid md:grid-cols-[minmax(0,1fr)_4.5rem_9.5rem_auto] md:items-center md:gap-3">
                      <div className="min-w-0 text-right">
                        <div className="flex items-start justify-between gap-2 md:block">
                          <p className="min-w-0 flex-1 text-[13px] font-bold leading-5 text-[#101117] md:text-base md:leading-6">
                            {item.carName.replace(/\s+/g, " ").trim()}
                          </p>
                          <p className="shrink-0 text-left text-[13px] font-black leading-5 tabular-nums text-[#3456bb] md:hidden">
                            {formatPriceDisplay(item)}
                          </p>
                        </div>
                        <p className="mt-0.5 text-[10px] text-[#6B6C70] md:hidden">
                          سال {item.lastYear}
                        </p>
                      </div>

                      <span className="hidden rounded-lg bg-[#F3F5F8] px-2.5 py-1 text-center text-xs font-bold text-[#55565A] md:block">
                        {item.lastYear}
                      </span>
                      <p className="hidden text-base font-black tabular-nums text-[#101117] md:block md:text-right">
                        {formatPriceDisplay(item)}
                      </p>

                      <div className="flex justify-end md:justify-start">
                        <InspectCtaButton
                          carName={item.carName.replace(/\s+/g, " ").trim()}
                          searchTerm={brandModelSearchTerm(item.carName)}
                          variant="compact"
                          label="رزرو کارشناسی همین الان"
                          labelMobile="رزرو کارشناسی"
                          showChevron
                          className="md:!h-11 md:!rounded-2xl md:!border-0 md:!bg-[#3456bb] md:!px-4 md:!text-white md:hover:!bg-[#2d49a3]"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <NavigationBar activePath="/car-new-price" />
    </>
  );
}
