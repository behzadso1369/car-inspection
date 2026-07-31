import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { PAGE_SEO, generateFAQSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllFaqsByCategory } from "@/lib/faq-data";
import { FaqClient } from "./FaqClient";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata(PAGE_SEO.faq.path, {
  title: PAGE_SEO.faq.title,
  description: PAGE_SEO.faq.description,
  keywords: PAGE_SEO.faq.keywords,
});

async function getFaqData() {
  return getAllFaqsByCategory(revalidate);
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
