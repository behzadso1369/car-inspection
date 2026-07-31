/** استخراج AddressId از پاسخ CreateUserAddress (فرمت‌های مختلف بک‌اند) */
export function extractAddressId(response: unknown): number | null {
  if (response == null) return null;

  if (typeof response === "number" && Number.isFinite(response)) {
    return response;
  }

  if (typeof response === "string" && response.trim() !== "") {
    const parsed = Number(response);
    return Number.isFinite(parsed) ? parsed : null;
  }

  if (typeof response === "object") {
    const obj = response as Record<string, unknown>;
    const keys = [
      "AddressId",
      "addressId",
      "Id",
      "id",
      "UserAddressId",
      "userAddressId",
    ];

    for (const key of keys) {
      const value = obj[key];
      if (typeof value === "number" && Number.isFinite(value)) return value;
      if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
      }
    }
  }

  return null;
}

export function readStoredAddressId(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("AddressId");
  if (!raw || raw === "undefined" || raw === "null") return null;
  const id = Number(raw);
  return Number.isFinite(id) ? id : null;
}
