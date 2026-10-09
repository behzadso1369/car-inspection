type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

const SCHEMA_ORG_CONTEXT = "https://schema.org";

/**
 * آیا HTML محتوای بلاگ از قبل JSON-LD / schema.org دارد (مثلاً داخل تگ script).
 */
export function htmlContainsSchemaOrg(html: string): boolean {
  if (!html) return false;
  if (/application\/ld\+json/i.test(html)) return true;
  return (
    /<script\b/i.test(html) &&
    /\bschema\.org\b/i.test(html) &&
    /@context/i.test(html)
  );
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, "\u00A0")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec: string) =>
      String.fromCodePoint(parseInt(dec, 10))
    );
}

function extractJsonFromSchemaField(raw: string): string {
  const trimmed = raw.trim();
  const scriptMatch = trimmed.match(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
  );
  return scriptMatch ? scriptMatch[1].trim() : trimmed;
}

function tryParseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/**
 * رشتهٔ Schema از API را به آبجکت(های) JSON-LD schema.org تبدیل می‌کند.
 */
export function parseSchemaStringToJsonLd(schema: string): JsonLdValue | null {
  if (!schema?.trim()) return null;

  let text = decodeHtmlEntities(extractJsonFromSchemaField(schema.trim()));

  let parsed = tryParseJson(text);

  // بعضی APIها کل JSON را دوباره stringify می‌کنند
  if (typeof parsed === "string") {
    parsed = tryParseJson(decodeHtmlEntities(extractJsonFromSchemaField(parsed)));
  }

  if (parsed == null || typeof parsed !== "object") return null;
  return parsed as JsonLdValue;
}

function normalizeContext(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeContext(item));
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = { ...(value as Record<string, unknown>) };
    const ctx = obj["@context"];
    if (ctx == null || ctx === "") {
      obj["@context"] = SCHEMA_ORG_CONTEXT;
    } else if (typeof ctx === "string" && ctx === "schema.org") {
      obj["@context"] = SCHEMA_ORG_CONTEXT;
    }
    if (Array.isArray(obj["@graph"])) {
      obj["@graph"] = (obj["@graph"] as unknown[]).map((node) =>
        normalizeContext(node)
      );
    }
    return obj;
  }
  return value;
}

/**
 * فیلد Schema (رشته از سرور) را از پاسخ GetBlogDetail به JSON-LD آمادهٔ JsonLd تبدیل می‌کند.
 */
export function parseBlogSchemaFromApi(
  post: Record<string, unknown>
): JsonLdValue | null {
  const raw =
    post.Schema ?? post.schema ?? post.BlogPostSchema ?? post.BlogSchema;
  if (raw == null || raw === "") return null;

  if (typeof raw === "string") {
    const parsed = parseSchemaStringToJsonLd(raw);
    if (!parsed) return null;
    return normalizeContext(parsed) as JsonLdValue;
  }

  if (typeof raw === "object") {
    return normalizeContext(raw) as JsonLdValue;
  }

  return null;
}

export function normalizeJsonLdItems(
  value: JsonLdValue
): Array<Record<string, unknown>> {
  const normalized = normalizeContext(value);

  if (Array.isArray(normalized)) {
    return normalized.filter(
      (item): item is Record<string, unknown> =>
        item != null && typeof item === "object" && !Array.isArray(item)
    );
  }

  const obj = normalized as Record<string, unknown>;
  if (Array.isArray(obj["@graph"])) {
    return (obj["@graph"] as unknown[]).filter(
      (item): item is Record<string, unknown> =>
        item != null && typeof item === "object" && !Array.isArray(item)
    );
  }

  return [obj];
}