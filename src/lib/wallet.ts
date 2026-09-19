import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import type {
  ChargePlan,
  ChargeStart,
  CheckoutPreview,
  OrderMoveResult,
  WalletBalance,
  WalletGiftPreview,
  WalletTransaction,
} from "@/types/wallet";

export function formatToman(amount: number | null | undefined) {
  const value = Number(amount ?? 0);
  return `${value.toLocaleString("fa-IR")} تومان`;
}

export function transactionAmountClass(amount: number) {
  if (amount < 0) return "text-[#DC2626]";
  if (amount > 0) return "text-[#157347]";
  return "text-[#55565A]";
}

export function formatSignedToman(amount: number) {
  const abs = formatToman(Math.abs(amount));
  if (amount > 0) return `+ ${abs}`;
  if (amount < 0) return `− ${abs}`;
  return abs;
}

export const walletApi = {
  getBalance() {
    return instance.get(ApiHelper.get("WalletBalance")) as Promise<WalletBalance>;
  },
  getTransactions(pageNumber = 1, pageSize = 20) {
    return instance.get(
      `${ApiHelper.get("WalletTransactions")}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ) as Promise<WalletTransaction[]>;
  },
  getChargePlans() {
    return instance.get(ApiHelper.get("WalletChargePlans")) as Promise<ChargePlan[]>;
  },
  getGiftPreview(carGroupId: number, carInspectionTypeId?: number | null) {
    const params = new URLSearchParams({ carGroupId: String(carGroupId) });
    if (carInspectionTypeId) {
      params.set("carInspectionTypeId", String(carInspectionTypeId));
    }
    return instance.get(
      `${ApiHelper.get("WalletGiftPreview")}?${params.toString()}`
    ) as Promise<WalletGiftPreview>;
  },
  startCharge(planId: number) {
    return instance.post(ApiHelper.get("WalletCharge"), { planId }) as Promise<ChargeStart>;
  },
  getCheckoutPreview(orderId: number) {
    return instance.get(
      ApiHelper.get("WalletCheckoutPreview", String(orderId))
    ) as Promise<CheckoutPreview>;
  },
  applyToOrder(orderId: number, useWallet: boolean) {
    return instance.post(ApiHelper.get("WalletApplyToOrder", String(orderId)), {
      useWallet,
    }) as Promise<CheckoutPreview>;
  },
  verifyPayment(trackId: string | number) {
    return instance.post(ApiHelper.get("PaymentVerify"), {
      trackId: String(trackId),
    });
  },
};

export function redirectToGateway(url: string) {
  window.location.assign(url);
}

export function handleOrderMoveResult(res: OrderMoveResult | null | undefined) {
  if (!res) return false;

  if (res.paidFullyByWallet) {
    window.location.assign(`/payment/success?orderId=${res.orderId}`);
    return true;
  }

  if (res.requiresPayment && res.paymentUrl) {
    redirectToGateway(res.paymentUrl);
    return true;
  }

  if (res.isEndFlow && res.paymentUrl && !res.paidFullyByWallet) {
    redirectToGateway(res.paymentUrl);
    return true;
  }

  return false;
}

export function readCheckoutContext() {
  if (typeof window === "undefined") {
    return { orderId: 0, carGroupId: 0, carInspectionTypeId: null as number | null };
  }
  const orderId = Number(localStorage.getItem("OrderId") || 0);
  const carGroupId = Number(localStorage.getItem("CarGroupId") || 0);
  const storedType = localStorage.getItem("CarInspectionTypeId");
  return {
    orderId,
    carGroupId,
    carInspectionTypeId: storedType ? Number(storedType) : null,
  };
}
