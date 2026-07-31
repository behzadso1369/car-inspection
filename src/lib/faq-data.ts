import { ApiHelper } from "@/helper/api-request";
import { serverApiHelper, serverFetch } from "@/helper/server-fetcher";

export type FaqItem = {
  Id?: number | string;
  Question: string;
  Answer: string;
};

export type FaqCategory = {
  Id: number | string;
  Name: string;
};

export async function getFaqCategories(revalidate = 3600) {
  const catRes = await serverApiHelper.get<{ FAQ_Category?: FaqCategory[] }>(
    "GetFAQ_CategoryData",
    revalidate
  );
  return catRes?.FAQ_Category ?? [];
}

export async function getFaqByCategoryId(categoryId: string, revalidate = 3600) {
  const endpoint = `${ApiHelper.get("GetFAQWithCategoryId")}?CategoryId=${categoryId}`;
  const res = await serverFetch<{ FAQ?: FaqItem[] }>(endpoint, {
    next: { revalidate },
  });
  return (res?.FAQ ?? []).filter((item) => item?.Question && item?.Answer);
}

export async function getAllFaqsByCategory(revalidate = 3600) {
  const categories = await getFaqCategories(revalidate);
  const questionsByCategory: Record<string, FaqItem[]> = {};

  await Promise.all(
    categories.map(async (cat) => {
      questionsByCategory[String(cat.Id)] = await getFaqByCategoryId(
        String(cat.Id),
        revalidate
      );
    })
  );

  return { categories, questionsByCategory };
}

export async function getFaqsByCategoryName(categoryName: string, revalidate = 3600) {
  const categories = await getFaqCategories(revalidate);
  const category = categories.find(
    (cat) =>
      cat.Name?.trim() === categoryName.trim() ||
      cat.Name?.includes(categoryName)
  );

  if (!category) return [];

  return getFaqByCategoryId(String(category.Id), revalidate);
}

export function pickFaqSample(
  questionsByCategory: Record<string, FaqItem[]>,
  limit = 5
) {
  const merged = Object.values(questionsByCategory).flat();
  return merged.slice(0, limit);
}

export async function getFaqPreviewItems(limit = 5, revalidate = 3600) {
  const { questionsByCategory } = await getAllFaqsByCategory(revalidate);
  return pickFaqSample(questionsByCategory, limit);
}
