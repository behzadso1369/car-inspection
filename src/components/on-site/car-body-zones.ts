import type { BodyReportZone, BodyZoneStatus } from "@/types/on-site";

/** Stable keys for body diagram panels */
export type CarBodyPanelKey =
  | "hood"
  | "roof"
  | "trunk"
  | "front_bumper"
  | "rear_bumper"
  | "fl_fender"
  | "fr_fender"
  | "rl_fender"
  | "rr_fender"
  | "fl_door"
  | "fr_door"
  | "rl_door"
  | "rr_door"
  | "left_sill"
  | "right_sill";

/**
 * Clickable hotspots aligned to `/body-map/vehicle.png`
 * inside SVG viewBox `0 0 500 420` (image at x=100 y=30 w=300 h=370).
 * Coordinates adapted from car-paint-map-kfs (MIT).
 */
export const PANEL_HOTSPOTS: Record<
  CarBodyPanelKey,
  { x: number; y: number; w: number; h: number; rx?: number; label: string }
> = {
  hood: { x: 194, y: 73, w: 140, h: 60, rx: 10, label: "کاپوت" },
  roof: { x: 211, y: 226, w: 140, h: 160, rx: 10, label: "سقف" },
  trunk: { x: 199, y: 324, w: 140, h: 60, rx: 8, label: "صندوق" },
  front_bumper: { x: 199, y: 44, w: 120, h: 25, rx: 8, label: "سپر جلو" },
  rear_bumper: { x: 197, y: 363, w: 120, h: 25, rx: 8, label: "سپر عقب" },
  fl_fender: { x: 120, y: 77, w: 50, h: 40, rx: 8, label: "گلگیر جلو راننده" },
  fr_fender: { x: 350, y: 78, w: 50, h: 40, rx: 8, label: "گلگیر جلو شاگرد" },
  rl_fender: { x: 120, y: 304, w: 50, h: 40, rx: 8, label: "گلگیر عقب راننده" },
  rr_fender: { x: 350, y: 304, w: 50, h: 40, rx: 8, label: "گلگیر عقب شاگرد" },
  fl_door: { x: 120, y: 131, w: 50, h: 80, rx: 8, label: "درب جلو راننده" },
  fr_door: { x: 299, y: 131, w: 50, h: 80, rx: 8, label: "درب جلو شاگرد" },
  rl_door: { x: 120, y: 218, w: 50, h: 80, rx: 8, label: "درب عقب راننده" },
  rr_door: { x: 299, y: 218, w: 50, h: 80, rx: 8, label: "درب عقب شاگرد" },
  left_sill: { x: 120, y: 210, w: 20, h: 90, rx: 4, label: "رکاب راننده" },
  right_sill: { x: 360, y: 210, w: 20, h: 90, rx: 4, label: "رکاب شاگرد" },
};

/** Intrinsic size of `/body-map/vehicle_damage_*.png` atlases */
export const DAMAGE_ATLAS_SIZE = { width: 334, height: 270 } as const;

/**
 * Sprite cuts from damage sheets (same atlas layout for paint / local_paint / changed).
 * `bgX` / `bgY` are CSS background-position offsets (often negative);
 * atlas crop origin is `(-bgX, -bgY)`.
 */
export const PANEL_SPRITES: Partial<
  Record<CarBodyPanelKey, { bgX: number; bgY: number; w: number; h: number }>
> = {
  front_bumper: { bgX: 0, bgY: -246, w: 107, h: 24 },
  hood: { bgX: 0, bgY: 0, w: 112, h: 82 },
  roof: { bgX: -122, bgY: -115, w: 74, h: 54 },
  trunk: { bgX: 0, bgY: -207, w: 106, h: 29 },
  rear_bumper: { bgX: -116, bgY: -207, w: 107, h: 24 },
  fl_fender: { bgX: -304, bgY: -173, w: 30, h: 45 },
  fr_fender: { bgX: -304, bgY: -118, w: 30, h: 45 },
  fl_door: { bgX: -122, bgY: 0, w: 81, h: 105 },
  rl_door: { bgX: -213, bgY: -96, w: 81, h: 86 },
  fr_door: { bgX: 0, bgY: -92, w: 81, h: 105 },
  rr_door: { bgX: -213, bgY: 0, w: 81, h: 86 },
  rl_fender: { bgX: -304, bgY: -59, w: 30, h: 49 },
  rr_fender: { bgX: -304, bgY: 0, w: 30, h: 49 },
};

/** Damage atlas image per zone status */
export function damageSheetForStatus(status: BodyZoneStatus): string {
  switch (status) {
    case "Painted":
      return "/body-map/vehicle_damage_local_paint.png";
    case "Damaged":
      return "/body-map/vehicle_damage_paint.png";
    case "Replaced":
      return "/body-map/vehicle_damage_changed.png";
    default:
      return "/body-map/vehicle_damage_original.png";
  }
}

const PANEL_MATCHERS: { key: CarBodyPanelKey; patterns: RegExp[] }[] = [
  { key: "hood", patterns: [/کاپوت/, /hood/, /bonnet/] },
  { key: "roof", patterns: [/سقف/, /roof/] },
  { key: "trunk", patterns: [/صندوق/, /trunk/, /boot/, /درب\s*صندوق/] },
  {
    key: "front_bumper",
    patterns: [/سپر\s*جلو/, /front.?bumper/, /bumper.?front/],
  },
  {
    key: "rear_bumper",
    patterns: [/سپر\s*عقب/, /rear.?bumper/, /bumper.?rear/],
  },
  {
    key: "fl_fender",
    patterns: [
      /گلگیر\s*جلو\s*(راننده|چپ)/,
      /front.?left.?fender/,
      /fl.?fender/,
      /lf.?fender/,
    ],
  },
  {
    key: "fr_fender",
    patterns: [
      /گلگیر\s*جلو\s*(شاگرد|راست)/,
      /گلگیر\s*(شاگرد|راست)\s*جلو/,
      /front.?right.?fender/,
      /fr.?fender/,
      /rf.?fender/,
    ],
  },
  {
    key: "rl_fender",
    patterns: [
      /گلگیر\s*عقب\s*(راننده|چپ)/,
      /rear.?left.?fender/,
      /rl.?fender/,
      /lf.?quarter/,
      /quarter.?left/,
    ],
  },
  {
    key: "rr_fender",
    patterns: [
      /گلگیر\s*عقب\s*(شاگرد|راست)/,
      /rear.?right.?fender/,
      /rr.?fender/,
      /rf.?quarter/,
      /quarter.?right/,
    ],
  },
  {
    key: "fl_door",
    patterns: [
      /درب\s*جلو\s*(راننده|چپ)/,
      /front.?left.?door/,
      /fl.?door/,
      /lf.?door/,
    ],
  },
  {
    key: "fr_door",
    patterns: [
      /درب\s*جلو\s*(شاگرد|راست)/,
      /front.?right.?door/,
      /fr.?door/,
      /rf.?door/,
    ],
  },
  {
    key: "rl_door",
    patterns: [
      /درب\s*عقب\s*(راننده|چپ)/,
      /rear.?left.?door/,
      /rl.?door/,
      /lr.?door/,
    ],
  },
  {
    key: "rr_door",
    patterns: [
      /درب\s*عقب\s*(شاگرد|راست)/,
      /rear.?right.?door/,
      /rr.?door/,
    ],
  },
  {
    key: "left_sill",
    patterns: [/رکاب\s*(راننده|چپ)/, /left.?sill/, /sill.?left/],
  },
  {
    key: "right_sill",
    patterns: [/رکاب\s*(شاگرد|راست)/, /right.?sill/, /sill.?right/],
  },
];

export function resolvePanelKey(zone: BodyReportZone): CarBodyPanelKey | null {
  const haystack = `${zone.Code} ${zone.NameFa} ${zone.ViewGroup}`;
  for (const { key, patterns } of PANEL_MATCHERS) {
    if (patterns.some((re) => re.test(haystack))) return key;
  }
  return null;
}

export function isDefectStatus(status: BodyZoneStatus): boolean {
  return status === "Painted" || status === "Damaged" || status === "Replaced";
}

export function buildZoneByPanel(
  zones: BodyReportZone[],
): Partial<Record<CarBodyPanelKey, BodyReportZone>> {
  const map: Partial<Record<CarBodyPanelKey, BodyReportZone>> = {};
  for (const zone of zones) {
    const key = resolvePanelKey(zone);
    if (!key) continue;
    const existing = map[key];
    if (
      !existing ||
      (isDefectStatus(zone.Status) && !isDefectStatus(existing.Status))
    ) {
      map[key] = zone;
    }
  }
  return map;
}
