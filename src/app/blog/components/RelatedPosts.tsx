import Image from "next/image";
import Link from "next/link";
import moment from "jalali-moment";

const API_ORIGIN = "https://api.carmacheck.com/";

export type RelatedPost = {
  BlogPostId?: number | string;
  Id?: number | string;
  Title?: string;
  BlogPostTitle?: string;
  ImagePath?: string;
  Excerpt?: string;
  BlogPostDescription?: string;
  CreatedOn?: string;
  CreatedDate?: string;
  BlogPostCanonical?: string;
  Slug?: string;
};

export function relatedPostSlug(item: RelatedPost): string {
  const slug = String(item?.Slug ?? "").trim();
  if (slug && !/^\d+$/.test(slug)) return slug;

  const canonical = String(item?.BlogPostCanonical ?? "");
  const match = canonical.match(/\/blog\/([^/?#]+)\/?$/);
  if (match?.[1] && !/^\d+$/.test(match[1])) return match[1];

  return String(item?.BlogPostId ?? item?.Id ?? "");
}

export function normalizeRelatedPosts(data: unknown): RelatedPost[] {
  if (!data) return [];
  if (Array.isArray(data)) return data.filter(Boolean);

  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const nested =
      obj.RelatedPosts ??
      obj.SearchItems ??
      obj.Posts ??
      obj.PostDetails ??
      obj.Items;
    if (Array.isArray(nested)) return nested.filter(Boolean);
  }

  return [];
}

function imageSrc(path?: string) {
  if (!path) return "/placeholder-blog.jpg";
  return API_ORIGIN + path.replace(/\\/g, "/");
}

function faDate(value?: string) {
  if (!value) return "";
  try {
    return moment(value).locale("fa").format("D MMMM YYYY");
  } catch {
    return "";
  }
}

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (!posts?.length) return null;

  return (
    <section
      className="mt-12 pt-8 border-t border-[#DFDFDF]"
      aria-labelledby="related-posts-title"
    >
      <div className="flex flex-col items-center mb-8">
        <h2
          id="related-posts-title"
          className="text-lg lg:text-2xl font-bold text-[#1E2A38]"
        >
          مقالات مرتبط
        </h2>
        <span className="mt-2 h-[3px] w-16 rounded-full bg-[#3456bb]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((item, index) => {
          const title = item.Title ?? item.BlogPostTitle ?? "";
          const excerpt = item.Excerpt ?? item.BlogPostDescription ?? "";
          const href = `/blog/${relatedPostSlug(item)}`;
          const date = faDate(item.CreatedOn ?? item.CreatedDate);
          const key = String(item.BlogPostId ?? item.Id ?? href);

          return (
            <Link
              key={key}
              prefetch={false}
              href={href}
              aria-label={title}
              className={`block rounded-3xl p-3 transition-shadow border ${
                index === 1
                  ? "border-[#B1B1B3] shadow-[0px_8px_16px_0px_#0000000F]"
                  : "border-transparent hover:border-[#B1B1B3] hover:shadow-[0px_8px_16px_0px_#0000000F]"
              }`}
            >
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={imageSrc(item.ImagePath)}
                  alt={title || "مقاله مرتبط"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-[#1E2A38] text-sm lg:text-base font-medium leading-relaxed line-clamp-2">
                {title}
              </h3>
              {excerpt ? (
                <p className="mt-2 text-[#6B6C70] text-xs lg:text-sm leading-relaxed line-clamp-2">
                  {excerpt}
                </p>
              ) : null}
              {date ? (
                <span className="block mt-3 text-xs text-[#9A9CA1]">{date}</span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
