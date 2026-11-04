import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import type {
  InstallmentQuote,
  InstallmentStart,
  InstallmentVerifyBody,
  VehicleKind,
} from "@/types/digipay";
import { toast } from "sonner";

export function paymentSuccessUrl(orderId: number, vehicleKind: VehicleKind = 1) {
  const params = new URLSearchParams({
    orderId: String(orderId),
    gateway: "digipay",
  });
  if (vehicleKind === 2) {
    params.set("vehicleKind", "2");
  }
  return `/payment/success?${params.toString()}`;
}

export async function fetchInstallmentQuote(
  orderId: number,
  vehicleKind: VehicleKind = 1
): Promise<InstallmentQuote | null> {
  if (!orderId) return null;
  const url = `${ApiHelper.get("PaymentInstallmentQuote")}/${orderId}?vehicleKind=${vehicleKind}`;
  try {
    const data = (await instance.get(url)) as InstallmentQuote | null | undefined;
    return data ?? null;
  } catch {
    return null;
  }
}

export async function startDigipayInstallment(
  orderId: number,
  vehicleKind: VehicleKind = 1
): Promise<boolean> {
  const endpoint =
    vehicleKind === 2
      ? `${ApiHelper.get("PaymentInstallmentMotorcycle")}/${orderId}`
      : `${ApiHelper.get("PaymentInstallment")}/${orderId}`;

  try {
    const data = (await instance.post(endpoint, {})) as InstallmentStart | null | undefined;
    if (!data) {
      return false;
    }

    if (data.paidFullyByWallet || data.requiresPayment === false) {
      window.location.assign(paymentSuccessUrl(orderId, vehicleKind));
      return true;
    }

    if (!data.paymentUrl) {
      toast.error("لینک درگاه ساخته نشد");
      toast.message("می‌توانید از «پرداخت آنلاین» (زیبال) استفاده کنید.");
      return false;
    }

    window.location.assign(data.paymentUrl);
    return true;
  } catch {
    return false;
  }
}

export async function verifyDigipayInstallment(body: InstallmentVerifyBody) {
  return instance.post(ApiHelper.get("PaymentInstallmentVerify"), body);
}
