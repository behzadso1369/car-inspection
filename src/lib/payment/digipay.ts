import { API_BASE_URL } from "@/config/api";
import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import type {
  InstallmentQuote,
  InstallmentStart,
  InstallmentVerifyBody,
  VehicleKind,
} from "@/types/digipay";
import { createElement } from "react";
import { toast } from "sonner";

const DIGIPAY_LOGIN_URL = "https://app.mydigipay.com/auth/login";
/** هم‌خوان با پیام بک‌اند اگر کاربر در دیجی‌پی ثبت‌نام/اعتبار نداشته باشد */
const DIGIPAY_NOT_REGISTERED_HINT = "در دیجی‌پی ثبت‌نام نکرده";

const TOAST_MS = 5000;

function isDigipayRegistrationRequiredMessage(message: string | undefined) {
  if (!message) return false;
  return message.includes(DIGIPAY_NOT_REGISTERED_HINT);
}

function showDigipayRegistrationToast(statusMessage: string) {
  toast.custom(
    () =>
      createElement(
        "div",
        {
          dir: "rtl",
          className:
            "font-IranSans flex w-[min(100%,22rem)] flex-col gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 text-right shadow-lg",
        },
        createElement(
          "p",
          { className: "text-sm leading-6 text-[#101117]" },
          statusMessage
        ),
        createElement(
          "a",
          {
            href: DIGIPAY_LOGIN_URL,
            target: "_blank",
            rel: "noopener noreferrer",
            className:
              "block w-full rounded-xl bg-[#003eff] py-3.5 text-center text-base font-bold text-white transition hover:bg-[#0036e0]",
          },
          "ثبت‌نام در دیجی‌پی"
        )
      ),
    { duration: TOAST_MS }
  );
}

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
  const path = `${ApiHelper.get("PaymentInstallmentQuote")}/${orderId}?vehicleKind=${vehicleKind}`;
  const url = `${API_BASE_URL}${path}`;
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const res = await fetch(url, {
      credentials: "include",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      isSuccess?: boolean;
      resultObject?: InstallmentQuote | null;
    };
    if (!json?.isSuccess || !json.resultObject) return null;
    return json.resultObject;
  } catch {
    return null;
  }
}

export async function startDigipayInstallment(
  orderId: number,
  vehicleKind: VehicleKind = 1
): Promise<boolean> {
  const path =
    vehicleKind === 2
      ? `${ApiHelper.get("PaymentInstallmentMotorcycle")}/${orderId}`
      : `${ApiHelper.get("PaymentInstallment")}/${orderId}`;
  const url = `${API_BASE_URL}${path}`;

  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: "{}",
    });

    const json = (await res.json()) as {
      isSuccess?: boolean;
      statusMessage?: string;
      resultObject?: InstallmentStart | null;
    };

    if (!json?.isSuccess) {
      const msg =
        json.statusMessage?.trim() ||
        "شروع پرداخت اقساطی ناموفق بود. لطفاً دوباره تلاش کنید.";
      if (isDigipayRegistrationRequiredMessage(msg)) {
        showDigipayRegistrationToast(msg);
      } else {
        toast.error("خطا", { description: msg, duration: TOAST_MS });
      }
      return false;
    }

    const data = json.resultObject;
    if (!data) {
      toast.error("پاسخ نامعتبر از سرور", { duration: TOAST_MS });
      return false;
    }

    if (data.paidFullyByWallet || data.requiresPayment === false) {
      window.location.assign(paymentSuccessUrl(orderId, vehicleKind));
      return true;
    }

    if (!data.paymentUrl) {
      toast.error("لینک درگاه ساخته نشد", { duration: TOAST_MS });
      toast.message("می‌توانید از «پرداخت آنلاین» (زیبال) استفاده کنید.");
      return false;
    }

    window.location.assign(data.paymentUrl);
    return true;
  } catch {
    toast.error("خطا در ارتباط با سرور", { duration: TOAST_MS });
    return false;
  }
}

export async function verifyDigipayInstallment(body: InstallmentVerifyBody) {
  return instance.post(ApiHelper.get("PaymentInstallmentVerify"), body);
}
