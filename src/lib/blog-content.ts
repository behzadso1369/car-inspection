export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * پردازش محتوای HTML بلاگ در سمت سرور (بدون نیاز به DOMParser مرورگر).
 * به هر <h2> یک id پایدار می‌دهد و فهرست مطالب (TOC) را می‌سازد تا محتوا
 * در HTML رندرشده‌ی سرور حاضر باشد و برای موتورهای جست‌وجو قابل خزش شود.
 */
export function processBlogContent(htmlContent: string): {
  processed: string;
  toc: TocItem[];
} {
  if (!htmlContent) return { processed: "", toc: [] };

  const toc: TocItem[] = [];
  let index = 0;

  const processed = htmlContent.replace(
    /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_match, attrs: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const id = `section-${index++}`;
      toc.push({ id, text, level: 2 });
      // حذف id قبلی (در صورت وجود) و جایگذاری id پایدار
      const cleanedAttrs = attrs.replace(
        /\s+id\s*=\s*("[^"]*"|'[^']*')/gi,
        ""
      );
      return `<h2${cleanedAttrs} id="${id}">${inner}</h2>`;
    }
  );

  return { processed, toc };
}
