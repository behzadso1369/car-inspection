import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { PAGE_SEO, generateFAQSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ApiHelper } from "@/helper/api-request";
import { serverApiHelper, serverFetch } from "@/helper/server-fetcher";
import { FaqClient } from "./FaqClient";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata(PAGE_SEO.faq.path, {
  title: PAGE_SEO.faq.title,
  description: PAGE_SEO.faq.description,
  keywords: PAGE_SEO.faq.keywords,
});

async function getFaqData() {
  const catRes = await serverApiHelper.get<{ FAQ_Category?: any[] }>(
    "GetFAQ_CategoryData",
    revalidate
  );
  const categories = catRes?.FAQ_Category ?? [];

  const questionsByCategory: Record<string, any[]> = {};
  await Promise.all(
    categories.map(async (cat: any) => {
      const endpoint = `${ApiHelper.get("GetFAQWithCategoryId")}?CategoryId=${cat.Id}`;
      const res = await serverFetch<{ FAQ?: any[] }>(endpoint, {
        next: { revalidate },
      });
      questionsByCategory[String(cat.Id)] = res?.FAQ ?? [];
    })
  );

  return { categories, questionsByCategory };
}

export default async function FAQPage() {
  const { categories, questionsByCategory } = await getFaqData();

  const allFaqs = Object.values(questionsByCategory)
    .flat()
    .filter((q: any) => q?.Question && q?.Answer)
    .map((q: any) => ({ question: q.Question, answer: q.Answer }));

  return (
    <>
      {allFaqs.length > 0 && <JsonLd data={generateFAQSchema(allFaqs)} />}
      <FaqClient
        initialCategories={categories}
        initialQuestionsByCategory={questionsByCategory}
      />
    </>
  );
}
