import { ApiHelper } from "@/helper/api-request";
import instance from "@/helper/interceptor";
import {
  brandModelSearchTerm,
  extractBrandFromCarName,
} from "@/lib/car-price/carBrandGroup";
import { normalizeText } from "@/lib/car-price/text";

export function latinModelTokens(carName: string): string[] {
  const normalized = normalizeText(carName);
  const parts = normalized.match(/[a-z0-9]+/g) ?? [];
  const out = new Set<string>();

  for (const part of parts) {
    if (part.length >= 2) out.add(part);
  }

  for (let i = 0; i < parts.length - 1; i++) {
    const merged = `${parts[i]}${parts[i + 1]}`;
    if (merged.length >= 2 && merged.length <= 10) out.add(merged);
  }

  const compact = normalized.replace(/[^a-z0-9]/g, "");
  if (compact.length >= 2 && compact.length <= 10) out.add(compact);

  return [...out];
}

export function searchTermsFromCarName(carName: string, searchTerm?: string) {
  const raw = [searchTerm, carName]
    .map((value) => String(value || "").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const normalized = raw.map((value) => normalizeText(value)).filter(Boolean);
  const shortened = normalized
    .map((value) => value.split(" ").slice(0, 2).join(" "))
    .filter(Boolean);

  const fromPriceName = carName
    ? [
        brandModelSearchTerm(carName),
        extractBrandFromCarName(carName),
        normalizeText(carName).split(" ").slice(0, 3).join(" "),
        ...latinModelTokens(carName),
      ]
    : [];

  return [...new Set([...raw, ...normalized, ...shortened, ...fromPriceName])];
}

export function pickCarGroup(
  groups: any[],
  carName: string,
  searchTerm?: string,
) {
  if (!groups.length) return null;

  const queries = [searchTerm, carName, ...latinModelTokens(carName)]
    .map((value) => normalizeText(value || ""))
    .filter(Boolean);

  let best = groups[0];
  let bestScore = -1;

  for (const item of groups) {
    const name = normalizeText(item.Name || "");
    if (!name) continue;

    let score = 0;
    for (const query of queries) {
      if (name === query) score = Math.max(score, 1000);
      else if (query.includes(name)) score = Math.max(score, 600 + name.length);
      else if (name.includes(query)) score = Math.max(score, 500 + query.length);
      else {
        const overlap = query
          .split(" ")
          .filter((token) => token.length > 1 && name.includes(token)).length;
        score = Math.max(score, overlap * 40);
        for (const token of latinModelTokens(query)) {
          if (token.length >= 2 && name.includes(token)) {
            score = Math.max(score, 450 + token.length);
          }
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return bestScore > 0 ? best : groups[0];
}

async function searchAllData(terms: string) {
  return instance.get(
    `${ApiHelper.get("GetAllData")}?terms=${encodeURIComponent(terms)}`,
  ) as Promise<{ Results?: any[] }>;
}

async function groupsForBrand(brandId: number) {
  const res = (await instance.get(
    `${ApiHelper.get("GetCarGroupWithBrandId")}?CarBrandId=${brandId}`,
  )) as { CarGroups?: any[] };
  return res?.CarGroups ?? [];
}

/** گروه‌های کارشناسی: مستقیم از جستجو، یا از روی برند وقتی فقط برند برگشته */
export async function fetchCarGroupCandidates(
  carName: string,
  searchTerm?: string,
): Promise<any[]> {
  const seen = new Set<number>();
  const collected: any[] = [];

  const add = (list: any[]) => {
    for (const item of list) {
      if (item?.Id && !seen.has(item.Id)) {
        seen.add(item.Id);
        collected.push(item);
      }
    }
  };

  for (const candidate of searchTermsFromCarName(carName, searchTerm)) {
    const res = await searchAllData(candidate);
    const results = res?.Results ?? [];
    const direct = results.filter((item) => item.IsCarBrand === 0);
    if (direct.length) {
      add(direct);
      return collected;
    }

    const brands = results.filter((item) => item.IsCarBrand === 1);
    for (const brand of brands.slice(0, 3)) {
      add(await groupsForBrand(brand.Id));
    }
    if (collected.length) return collected;
  }

  for (const token of latinModelTokens(carName)) {
    const res = await searchAllData(token);
    const direct = (res?.Results ?? []).filter((item) => item.IsCarBrand === 0);
    if (direct.length) {
      add(direct);
      return collected;
    }
  }

  return collected;
}

export async function resolveInspectionCarGroup(
  carName: string,
  searchTerm?: string,
) {
  const groups = await fetchCarGroupCandidates(carName, searchTerm);
  return pickCarGroup(groups, carName, searchTerm);
}

export async function startInspectionForCar(options: {
  carName: string;
  searchTerm?: string;
  carGroupId?: number;
  carGroupName?: string;
}) {
  const { carName, searchTerm, carGroupId, carGroupName } = options;
  const term = (searchTerm || carName).trim();

  if (carGroupId) {
    localStorage.setItem("CarGroupId", String(carGroupId));
    localStorage.setItem("CarGroupName", carGroupName || carName);
  } else {
    const group = await resolveInspectionCarGroup(carName, term);
    if (!group?.Id) {
      return { ok: false as const, reason: "not_found" as const };
    }
    localStorage.setItem("CarGroupId", String(group.Id));
    localStorage.setItem("CarGroupName", String(group.Name));
  }

  try {
    const orderRes: any = await instance.post(ApiHelper.get("CreateOrder"), {
      carGroupId: Number(localStorage.getItem("CarGroupId")),
    });
    if (orderRes?.orderId) {
      localStorage.setItem("OrderId", orderRes.orderId);
    }
  } catch (orderErr) {
    console.error("Error creating order:", orderErr);
  }

  return { ok: true as const };
}
