const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.carmacheck.com/api/";

export type DealerRegistrationPayload = {
  phoneNumber: string;
  dealerName: string;
  agencyName: string;
  address?: string;
  lat?: number;
  lng?: number;
  website: string;
};

export type DealerRegistrationApiResponse = {
  isSuccess: boolean;
  statusMessage: string;
  resultObject: { id: number } | string | null;
};

export function normalizeIranMobile(input: string): string {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  let normalized = input.trim();
  for (let i = 0; i < persianDigits.length; i++) {
    normalized = normalized.replaceAll(persianDigits[i]!, String(i));
  }
  const digits = normalized.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("98")) {
    return `0${digits.slice(2)}`;
  }
  if (digits.length === 10 && digits.startsWith("9")) {
    return `0${digits}`;
  }
  return digits;
}

export function validateDealerRegistration(
  payload: DealerRegistrationPayload,
): Record<string, string> {
  const errors: Record<string, string> = {};
  const phone = normalizeIranMobile(payload.phoneNumber);
  if (!/^09\d{9}$/.test(phone)) {
    errors.phoneNumber = "شماره موبایل باید با 09 و ۱۱ رقم باشد.";
  }

  const dealerName = payload.dealerName.trim();
  const agencyName = payload.agencyName.trim();

  const dealerValid =
    dealerName.length >= 2 && dealerName.length <= 120;
  const agencyValid =
    agencyName.length >= 2 && agencyName.length <= 120;

  if (!dealerValid && !agencyValid) {
    errors.dealerName =
      "حداقل یکی از «نام نمایشگاه» یا «نام نمایندگی» (۲ تا ۱۲۰ کاراکتر) را وارد کنید.";
  } else {
    if (dealerName.length > 0 && !dealerValid) {
      errors.dealerName = "نام نمایشگاه باید بین ۲ تا ۱۲۰ کاراکتر باشد.";
    }
    if (agencyName.length > 0 && !agencyValid) {
      errors.agencyName = "نام نمایندگی باید بین ۲ تا ۱۲۰ کاراکتر باشد.";
    }
  }

  const address = payload.address?.trim() ?? "";
  if (address.length > 500) {
    errors.address = "آدرس حداکثر ۵۰۰ کاراکتر است.";
  }

  const hasAddress = address.length > 0;
  const hasCoords =
    payload.lat != null &&
    payload.lng != null &&
    !Number.isNaN(payload.lat) &&
    !Number.isNaN(payload.lng);

  if (!hasAddress && !hasCoords) {
    errors.address = "آدرس متنی یا موقعیت روی نقشه را وارد کنید.";
  }

  if (hasCoords) {
    if (payload.lat! < -90 || payload.lat! > 90) {
      errors.lat = "عرض جغرافیایی نامعتبر است.";
    }
    if (payload.lng! < -180 || payload.lng! > 180) {
      errors.lng = "طول جغرافیایی نامعتبر است.";
    }
  }

  return errors;
}

export function buildDealerRegistrationBody(
  input: Omit<DealerRegistrationPayload, "website"> & { website?: string },
): DealerRegistrationPayload {
  const phoneNumber = normalizeIranMobile(input.phoneNumber);
  let dealerName = input.dealerName.trim();
  let agencyName = input.agencyName.trim();
  if (dealerName && !agencyName) {
    agencyName = dealerName;
  } else if (agencyName && !dealerName) {
    dealerName = agencyName;
  }

  const body: DealerRegistrationPayload = {
    phoneNumber,
    dealerName,
    agencyName,
    website: input.website?.trim() ?? "",
  };

  const address = input.address?.trim();
  if (address) {
    body.address = address;
  }

  if (input.lat != null && input.lng != null) {
    body.lat = input.lat;
    body.lng = input.lng;
  }

  return body;
}

export async function submitDealerRegistration(
  body: DealerRegistrationPayload,
): Promise<{
  httpStatus: number;
  data: DealerRegistrationApiResponse;
}> {
  const res = await fetch(`${API_BASE}DealerRegistration/Submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as DealerRegistrationApiResponse;
  return { httpStatus: res.status, data };
}
