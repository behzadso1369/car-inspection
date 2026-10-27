const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.carmacheck.com/api/";

/** کلید AES-256-GCM مشترک با API سایت (CarNewPrice) */
const CAR_NEW_PRICE_KEY_B64 = "mBtxFQz7Y8SEYagLC6JTBWc4Y6G/YTYYKPtiBNpsCK0=";

export type CarNewPriceEncryptedObject = {
  alg?: string;
  iv: string;
  data: string;
};

export type CarNewPriceItem = {
  id: number;
  carName: string;
  carPrice: number;
  carPriceText: string;
  lastYear: string;
  source: string;
};

export type CarNewPriceSelectPayload = {
  items: CarNewPriceItem[];
  total: number;
};

type CarNewPriceApiEnvelope = {
  isSuccess: boolean;
  statusMessage: string;
  resultObject: CarNewPriceEncryptedObject;
};

export type LoadCarNewPriceSelectParams = {
  terms?: string;
  source?: string;
  lastYear?: string;
  pageNumber?: number;
  pageSize?: number;
};

function apiUrl(relativePath: string) {
  const base = API_BASE.endsWith("/") ? API_BASE : `${API_BASE}/`;
  return `${base}Site/CarNewPrice/${relativePath}`;
}

function b64ToBytes(b64: string) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export async function decryptCarNewPrice(
  resultObject: CarNewPriceEncryptedObject,
): Promise<unknown> {
  if (!resultObject?.iv || !resultObject?.data) {
    throw new Error("پاسخ رمزشده نیست");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    b64ToBytes(CAR_NEW_PRICE_KEY_B64),
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64ToBytes(resultObject.iv) },
    key,
    b64ToBytes(resultObject.data),
  );

  return JSON.parse(new TextDecoder().decode(plain));
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchSiteJson(url: string, retries = 2): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url);
    if (res.status === 429 && attempt < retries) {
      await sleep(1500 * (attempt + 1));
      continue;
    }
    return res;
  }
  throw new Error("RATE_LIMIT");
}

export async function loadCarNewPriceSelect(
  params: LoadCarNewPriceSelectParams = {},
): Promise<CarNewPriceSelectPayload> {
  const {
    terms = "",
    source = "",
    lastYear = "",
    pageNumber = 1,
    pageSize = 1000,
  } = params;

  const qs = new URLSearchParams({
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
  });
  if (terms) qs.set("terms", terms);
  if (source) qs.set("source", source);
  if (lastYear) qs.set("lastYear", lastYear);

  const res = await fetchSiteJson(`${apiUrl("Select")}?${qs}`);
  if (res.status === 429) {
    throw new Error("RATE_LIMIT");
  }

  const json = (await res.json()) as CarNewPriceApiEnvelope;
  if (!json.isSuccess) {
    throw new Error(json.statusMessage || "خطا در دریافت قیمت خودرو");
  }

  const payload = (await decryptCarNewPrice(
    json.resultObject,
  )) as CarNewPriceSelectPayload;

  return {
    items: payload.items ?? [],
    total: payload.total ?? payload.items?.length ?? 0,
  };
}

/** همان منطق قبلی صفحه برای قیمت پایه نمایشی */
export function displayBasePriceFromItem(price: number, source: string) {
  return source === "hamrah" ? price + 400_000_000 : price;
}
