"use client";

import { useMemo, useState } from "react";
import type { BodyReportZone } from "@/types/on-site";
import {
  BODY_ZONE_STATUS_COLORS,
  BODY_ZONE_STATUS_LABELS,
} from "@/types/on-site";
import {
  type CarBodyPanelKey,
  DAMAGE_ATLAS_SIZE,
  PANEL_HOTSPOTS,
  PANEL_SPRITES,
  buildZoneByPanel,
  damageSheetForStatus,
  isDefectStatus,
} from "./car-body-zones";

interface CarBodyDiagramProps {
  zones: BodyReportZone[];
  selectedZoneId?: number | null;
  onSelectZone?: (zone: BodyReportZone | null) => void;
}

const VEHICLE_SRC = "/body-map/vehicle.png";

export default function CarBodyDiagram({
  zones,
  selectedZoneId,
  onSelectZone,
}: CarBodyDiagramProps) {
  const [internalSelected, setInternalSelected] = useState<number | null>(null);
  const zoneByPanel = useMemo(() => buildZoneByPanel(zones), [zones]);
  const defectZones = useMemo(
    () => zones.filter((z) => isDefectStatus(z.Status)),
    [zones],
  );

  const activeId =
    selectedZoneId !== undefined ? selectedZoneId : internalSelected;
  const activeZone =
    defectZones.find((z) => z.Id === activeId) ??
    (activeId == null ? (defectZones[0] ?? null) : null);

  const handleSelect = (zone: BodyReportZone | null) => {
    if (selectedZoneId === undefined) setInternalSelected(zone?.Id ?? null);
    onSelectZone?.(zone);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E6EBF3] bg-white p-3 sm:p-5">
      <div className="relative mb-2 flex items-start justify-between gap-3 px-1">
        <div>
          <h4 className="text-sm font-semibold text-[#101117] sm:text-base">
            نقشه دوبعدی بدنه
          </h4>
          <p className="mt-0.5 text-[11px] leading-5 text-[#6B6C70] sm:text-xs">
            وسط از بالا · چپ و راست بغل · جلو و عقب — روی قطعه بزنید
          </p>
        </div>
        {defectZones.length > 0 ? (
          <span className="shrink-0 rounded-full bg-[#FFF4E5] px-2.5 py-1 text-[11px] font-medium text-[#C2410C]">
            {defectZones.length} ایراد
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-[#E6FEE6] px-2.5 py-1 text-[11px] font-medium text-[#04A14B]">
            بدون ایراد بدنه
          </span>
        )}
      </div>

      <svg
        viewBox="0 0 500 420"
        className="relative mx-auto block h-auto w-full max-w-[480px]"
        role="img"
        aria-label="نقشه دوبعدی بدنه خودرو"
      >
        <image
          href={VEHICLE_SRC}
          x={100}
          y={30}
          width={300}
          height={370}
          preserveAspectRatio="xMidYMid meet"
        />

        {(Object.keys(PANEL_HOTSPOTS) as CarBodyPanelKey[]).map((key) => {
          const spot = PANEL_HOTSPOTS[key];
          const zone = zoneByPanel[key];
          if (!zone) return null;

          const isDefect = isDefectStatus(zone.Status);
          const isActive = activeZone?.Id === zone.Id;
          const sprite = PANEL_SPRITES[key];
          // Nested SVG crop — avoid foreignObject; Safari/iOS does not scale
          // HTML-in-SVG with the parent viewBox (sprites look exploded/offset).
          const showDamage = Boolean(isDefect && sprite);
          const atlasSrc = showDamage
            ? damageSheetForStatus(zone.Status)
            : null;
          const cropX = sprite ? -sprite.bgX : 0;
          const cropY = sprite ? -sprite.bgY : 0;

          return (
            <g key={key}>
              {showDamage && sprite && atlasSrc && (
                <svg
                  x={spot.x}
                  y={spot.y}
                  width={sprite.w}
                  height={sprite.h}
                  viewBox={`${cropX} ${cropY} ${sprite.w} ${sprite.h}`}
                  overflow="hidden"
                  pointerEvents="none"
                  opacity={isActive ? 1 : 0.48}
                  style={{
                    filter: isActive
                      ? "brightness(1.18) saturate(1.45) contrast(1.08)"
                      : "brightness(0.98) saturate(0.85)",
                    transition: "opacity 0.2s ease, filter 0.2s ease",
                  }}
                >
                  <image
                    href={atlasSrc}
                    xlinkHref={atlasSrc}
                    x={0}
                    y={0}
                    width={DAMAGE_ATLAS_SIZE.width}
                    height={DAMAGE_ATLAS_SIZE.height}
                    preserveAspectRatio="none"
                  />
                </svg>
              )}

              <rect
                x={spot.x}
                y={spot.y}
                width={Math.max(spot.w, sprite?.w ?? 0)}
                height={Math.max(spot.h, sprite?.h ?? 0)}
                rx={spot.rx ?? 6}
                fill="transparent"
                stroke="none"
                className="cursor-pointer"
                onClick={() => handleSelect(zone)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleSelect(zone);
                }}
              >
                <title>
                  {zone.NameFa} — {BODY_ZONE_STATUS_LABELS[zone.Status]}
                </title>
              </rect>
            </g>
          );
        })}
      </svg>

      {defectZones.length > 0 && (
        <div className="relative mt-3 flex flex-wrap justify-center gap-2">
          {defectZones.map((zone) => {
            const color = BODY_ZONE_STATUS_COLORS[zone.Status];
            const isActive = activeZone?.Id === zone.Id;
            return (
              <button
                key={zone.Id}
                type="button"
                onClick={() => handleSelect(zone)}
                className="rounded-full border px-3 py-1 text-[11px] transition-all"
                style={{
                  borderColor: isActive ? color : `${color}55`,
                  backgroundColor: isActive ? `${color}22` : "#fff",
                  color: isActive ? color : "#55565A",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {zone.NameFa}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
