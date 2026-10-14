/** localStorage keys for the motorcycle inspection wizard (vehicleKind = 2). */

export const MOTORCYCLE_GROUP_ID_KEY = "MotorcycleGroupId";
export const MOTORCYCLE_GROUP_NAME_KEY = "MotorcycleGroupName";
export const MOTORCYCLE_INSPECTION_TYPE_ID_KEY = "MotorcycleInspectionTypeId";
export const VEHICLE_KIND_KEY = "VehicleKind";

export function markMotorcycleFlow() {
  if (typeof window === "undefined") return;
  localStorage.setItem(VEHICLE_KIND_KEY, "2");
}

export function getMotorcycleGroupId(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(MOTORCYCLE_GROUP_ID_KEY);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}
