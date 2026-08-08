export const FESTIVAL_DISCOUNT = 1_000_000;

export function getInspectionPrices(data: {
  OurPrice?: number;
  AdditionalCost?: number;
}) {
  const fullPrice =
    data?.AdditionalCost && data.AdditionalCost > 0
      ? (data.OurPrice ?? 0) + data.AdditionalCost
      : (data.OurPrice ?? 0);

  return {
    fullPrice,
    discountedPrice: Math.max(0, fullPrice - FESTIVAL_DISCOUNT),
  };
}

export function formatDiscountBadge(discountAmount: number) {
  if (discountAmount >= 1_000_000 && discountAmount % 1_000_000 === 0) {
    const millions = discountAmount / 1_000_000;
    return `${millions.toLocaleString("fa-IR")} میلیون هدیه`;
  }
  return `${discountAmount.toLocaleString("fa-IR")} هدیه`;
}

export function persistInspectionPrices(
  fullPrice: number,
  discountedPrice: number,
  method: string
) {
  if (typeof window === "undefined") return;
  localStorage.setItem("inspectionFullPrice", String(fullPrice));
  localStorage.setItem("inspectionPrice", String(discountedPrice));
  localStorage.setItem("inspectionMethod", method);
}

export function readStoredInspectionPrices() {
  if (typeof window === "undefined") {
    return { fullPrice: 0, discountedPrice: 0, method: "" };
  }
  return {
    fullPrice: Number(localStorage.getItem("inspectionFullPrice") || 0),
    discountedPrice: Number(localStorage.getItem("inspectionPrice") || 0),
    method: localStorage.getItem("inspectionMethod") || "",
  };
}
