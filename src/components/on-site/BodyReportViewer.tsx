"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { BodyReport, BodyReportZone } from "@/types/on-site";
import {
  BODY_ZONE_STATUS_COLORS,
  BODY_ZONE_STATUS_LABELS,
} from "@/types/on-site";
import CarBodyDiagram from "./CarBodyDiagram";
import { isDefectStatus } from "./car-body-zones";

const API_ASSET = "https://api.carmacheck.com/";

function getAssetUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ASSET}${path.replace(/^\/+/, "")}`;
}

interface BodyReportViewerProps {
  report: BodyReport;
}

function ZoneBadge({
  zone,
  active,
  onSelect,
}: {
  zone: BodyReportZone;
  active?: boolean;
  onSelect?: (zone: BodyReportZone) => void;
}) {
  const color = BODY_ZONE_STATUS_COLORS[zone.Status] ?? "#95a5a6";
  return (
    <button
      type="button"
      onClick={() => onSelect?.(zone)}
      className="w-full rounded-xl border p-3 flex flex-col gap-2 text-right transition-all"
      style={{
        borderColor: active ? color : `${color}44`,
        backgroundColor: active ? `${color}22` : `${color}11`,
        boxShadow: active ? `0 0 0 2px ${color}33` : undefined,
      }}
    >
      <div className="flex justify-between items-start">
        <span className="font-medium text-[#101117] text-sm">
          {zone.NameFa}
        </span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {BODY_ZONE_STATUS_LABELS[zone.Status] ?? zone.Status}
        </span>
      </div>
      {zone.Note && <p className="text-xs text-[#55565A]">{zone.Note}</p>}
      {zone.ImagePath && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
          <Image
            src={getAssetUrl(zone.ImagePath)}
            alt={zone.NameFa}
            fill
            className="object-cover"
          />
        </div>
      )}
    </button>
  );
}

export default function BodyReportViewer({ report }: BodyReportViewerProps) {
  const zones = useMemo(
    () => [...report.Zones].sort((a, b) => a.SortOrder - b.SortOrder),
    [report.Zones],
  );
  const defectZones = zones.filter((z) => isDefectStatus(z.Status));
  const okZones = zones.filter((z) => z.Status === "Ok");
  const uncheckedZones = zones.filter((z) => z.Status === "NotChecked");

  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(
    defectZones[0]?.Id ?? null,
  );

  return (
    <div className="space-y-6 font-IranSans">
      <div className="rounded-2xl border border-[#DFDFDF] p-4 bg-[#FBFBFB]">
        <h3 className="text-lg font-semibold text-[#101117] mb-3">
          گزارش بدنه خودرو
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <span className="text-[#55565A]">خودرو:</span>
          <span className="font-medium">{report.CarDisplayName}</span>
          <span className="text-[#55565A]">رنگ:</span>
          <span className="font-medium">{report.CarColor}</span>
          <span className="text-[#55565A]">شماره شاسی:</span>
          <span className="font-medium">{report.ChassisNumber}</span>
          <span className="text-[#55565A]">پلاک:</span>
          <span className="font-medium">{report.PlateNumber}</span>
          <span className="text-[#55565A]">تاریخ:</span>
          <span className="font-medium">
            {report.InspectionDate?.split("T")[0]} — {report.InspectionTime}
          </span>
          <span className="text-[#55565A]">نتیجه کلی:</span>
          <span className="font-medium text-[#416CEA]">
            {report.OverallResult}
          </span>
        </div>
        {report.SummaryNote && (
          <p className="mt-3 text-sm text-[#55565A] border-t border-[#DFDFDF] pt-3">
            {report.SummaryNote}
          </p>
        )}
      </div>

      <CarBodyDiagram
        zones={zones}
        selectedZoneId={selectedZoneId}
        onSelectZone={(zone) => setSelectedZoneId(zone?.Id ?? null)}
      />

      {defectZones.length > 0 && (
        <div>
          <h4 className="font-medium text-[#101117] mb-3">نواحی دارای ایراد</h4>
          <div className="grid gap-3 sm:grid-cols-2">
            {defectZones.map((z) => (
              <ZoneBadge
                key={z.Id}
                zone={z}
                active={selectedZoneId === z.Id}
                onSelect={(zone) => setSelectedZoneId(zone.Id)}
              />
            ))}
          </div>
        </div>
      )}

      {okZones.length > 0 && (
        <div>
          <h4 className="font-medium text-[#101117] mb-3">
            نواحی سالم ({okZones.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {okZones.map((z) => (
              <span
                key={z.Id}
                className="text-xs bg-[#E6FEE6] text-[#04A14B] px-2 py-1 rounded-full"
              >
                {z.NameFa}
              </span>
            ))}
          </div>
        </div>
      )}

      {uncheckedZones.length > 0 && (
        <div>
          <h4 className="font-medium text-[#101117] mb-3">
            نواحی بررسی‌نشده ({uncheckedZones.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {uncheckedZones.map((z) => (
              <span
                key={z.Id}
                className="text-xs bg-[#F5F6F8] text-[#55565A] px-2 py-1 rounded-full"
              >
                {z.NameFa}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-xs text-[#55565A]">
        {Object.entries(BODY_ZONE_STATUS_LABELS).map(([key, label]) => (
          <span key={key} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{
                backgroundColor:
                  BODY_ZONE_STATUS_COLORS[
                    key as keyof typeof BODY_ZONE_STATUS_COLORS
                  ],
              }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
