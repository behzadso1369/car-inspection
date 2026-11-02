import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import type { InstallmentStart, VehicleKind } from "@/types/digipay";

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

export async function startDigipayInstallment(
  orderId: number,
  vehicleKind: VehicleKind = 1
): Promise<boolean> {
  const endpoint =
    vehicleKind === 2
      ? `${ApiHelper.get("PaymentInstallmentMotorcycle")}/${orderId}`
      : `${ApiHelper.get("PaymentInstallment")}/${orderId}`;

  const data = (await instance.post(endpoint, {})) as InstallmentStart | null | undefined;
  if (!data) {
    return false;
  }

  if (data.paidFullyByWallet || data.requiresPayment === false) {
    window.location.assign(paymentSuccessUrl(orderId, vehicleKind));
    return true;
  }

  if (!data.paymentUrl) {
    return false;
  }

  window.location.assign(data.paymentUrl);
  return true;
}
