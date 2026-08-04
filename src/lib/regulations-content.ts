export type RegulationBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

export type RegulationSection = {
  title: string;
  blocks: RegulationBlock[];
};

export type ParsedRegulations = {
  documentTitle: string;
  updatedAt: string;
  intro: string;
  sections: RegulationSection[];
};

function stripLeadingIndex(line: string) {
  return line.replace(/^\d+\.\s*/, "").trim();
}

function parseSectionBody(rawLines: string[]): RegulationBlock[] {
  const lines = rawLines.map((l) => l.trim()).filter(Boolean);
  const blocks: RegulationBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const bulletMatch = lines[i].match(/^-\s*(.+)$/);
    if (bulletMatch) {
      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].match(/^-\s*(.+)$/);
        if (!m) break;
        items.push(m[1].trim());
        i += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    const numberedMatch = lines[i].match(/^\d+\.\s*(.+)$/);
    if (numberedMatch) {
      const text = numberedMatch[1].trim();
      const nextStartsAtOne = /^1\.\s/.test(lines[i + 1] ?? "");

      if (text.endsWith(":") && nextStartsAtOne) {
        blocks.push({ type: "paragraph", text });
        i += 1;
        continue;
      }

      const items: string[] = [];
      while (i < lines.length) {
        const m = lines[i].match(/^\d+\.\s*(.+)$/);
        if (!m) break;
        const itemText = m[1].trim();
        if (
          items.length > 0 &&
          itemText.endsWith(":") &&
          /^1\.\s/.test(lines[i + 1] ?? "")
        ) {
          break;
        }
        items.push(itemText);
        i += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    blocks.push({ type: "paragraph", text: lines[i] });
    i += 1;
  }

  return blocks;
}

export function parseRegulationsContent(raw: string): ParsedRegulations {
  const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const chunks = normalized.split(/\n(?=\d+\.\s*##\s*)/);

  const preamble = (chunks[0] ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map(stripLeadingIndex);

  const sections: RegulationSection[] = chunks.slice(1).map((chunk) => {
    const [headingLine, ...bodyLines] = chunk.split("\n");
    const title =
      headingLine?.replace(/^\d+\.\s*##\s*/, "").trim() || "ماده";
    return {
      title,
      blocks: parseSectionBody(bodyLines),
    };
  });

  const updatedAt =
    preamble
      .find((line) => line.includes("به‌روزرسانی") || line.includes("بروزرسانی"))
      ?.replace(/^آخرین\s*به‌روزرسانی:\s*/i, "")
      .replace(/^آخرین\s*بروزرسانی:\s*/i, "")
      .trim() || "";

  const intro =
    preamble
      .filter(
        (line, index) =>
          index > 0 &&
          !line.includes("به‌روزرسانی") &&
          !line.includes("بروزرسانی")
      )
      .join(" ") || "";

  return {
    documentTitle: preamble[0] || "قوانین و مقررات کارماچک",
    updatedAt,
    intro,
    sections,
  };
}

/** Converts **bold** markers into safe React-ready HTML snippets. */
export function formatInlineMarkdown(text: string) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
