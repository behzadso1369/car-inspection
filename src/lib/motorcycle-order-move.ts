import { getMotorcycleGroupId } from "@/lib/motorcycle-inspection-storage";

export function getMotorcycleOrderId(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("OrderId");
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function buildMotorcycleMoveBody(
  extra: Record<string, unknown> = {},
  isBack = false
) {
  const orderId = getMotorcycleOrderId();
  const motorcycleGroupId = getMotorcycleGroupId();
  const body: Record<string, unknown> = {
    isBack,
    ...extra,
  };
  if (orderId) body.orderId = orderId;
  if (motorcycleGroupId) body.motorcycleGroupId = motorcycleGroupId;
  return body;
}

export function packageFieldsFromItem(item: {
  Id: number;
  InspectionTypeId: number;
}) {
  return {
    motorcycleInspectionId: item.Id,
    motorcycleInspectionTypeId: item.InspectionTypeId,
  };
}
