import fs from "fs";
import path from "path";

type ContentType = "works" | "writing";
export type ContentStatus = "draft" | "published";

export type BaseFrontmatter = {
  slug: string;
  title: string;
  summary: string;
  tags?: string[];
  featured?: boolean;
  status?: ContentStatus;
};

export type WorkFrontmatter = BaseFrontmatter & {
  category?: string;
  date?: string;
  url?: string;
};

export type WritingFrontmatter = BaseFrontmatter & {
  published_at?: string;
  cover_image?: string;
};

export type ContentItem<T> = {
  frontmatter: T;
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function coerceFrontmatterValue(value: string): unknown {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const jsonCandidate = trimmed.replace(/'/g, "\"");
    try {
      const parsed = JSON.parse(jsonCandidate);
      if (Array.isArray(parsed)) {
        return parsed.map((entry) => String(entry));
      }
    } catch {
      return trimmed
        .slice(1, -1)
        .split(",")
        .map((entry) => entry.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    }
  }
  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

// NOTE: This is a minimal parser; replace with a full frontmatter library when dependencies are added.
function parseFrontmatter(source: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const lines = source.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") {
    return { data: {}, content: source.trim() };
  }

  const data: Record<string, unknown> = {};
  let i = 1;
  for (; i < lines.length; i += 1) {
    const line = lines[i];
    if (line?.trim() === "---") {
      i += 1;
      break;
    }
    if (!line?.trim()) continue;
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();
    data[key] = coerceFrontmatterValue(rawValue);
  }

  return { data, content: lines.slice(i).join("\n").trim() };
}

function normalizeBaseFrontmatter(data: Record<string, unknown>): BaseFrontmatter {
  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag))
    : undefined;

  return {
    slug: String(data.slug ?? ""),
    title: String(data.title ?? ""),
    summary: String(data.summary ?? ""),
    tags,
    featured: data.featured === true,
    status: data.status === "published" ? "published" : "draft",
  };
}

function normalizeWorkFrontmatter(data: Record<string, unknown>): WorkFrontmatter {
  return {
    ...normalizeBaseFrontmatter(data),
    category: data.category ? String(data.category) : undefined,
    date: data.date ? String(data.date) : undefined,
    url: data.url ? String(data.url) : undefined,
  };
}

function normalizeWritingFrontmatter(
  data: Record<string, unknown>
): WritingFrontmatter {
  return {
    ...normalizeBaseFrontmatter(data),
    published_at: data.published_at ? String(data.published_at) : undefined,
    cover_image: data.cover_image ? String(data.cover_image) : undefined,
  };
}

function readContentFiles<T>(
  type: ContentType,
  normalize: (data: Record<string, unknown>) => T
): ContentItem<T>[] {
  const dir = path.join(CONTENT_ROOT, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = parseFrontmatter(raw);
      const slugFromFile = file.replace(/\.md$/, "");
      const normalized = normalize({
        ...data,
        slug: typeof data.slug === "string" && data.slug ? data.slug : slugFromFile,
      });
      return { frontmatter: normalized, content };
    });
}

function filterPublished<T extends { status?: ContentStatus }>(
  items: ContentItem<T>[]
): ContentItem<T>[] {
  return items.filter((item) => item.frontmatter.status === "published");
}

function getDateValue(frontmatter: { published_at?: string; date?: string }) {
  if (frontmatter.published_at) return frontmatter.published_at;
  if (frontmatter.date) return frontmatter.date;
  return "";
}

function sortByDate<T extends { published_at?: string; date?: string }>(
  items: ContentItem<T>[]
): ContentItem<T>[] {
  return [...items].sort((a, b) =>
    getDateValue(b.frontmatter).localeCompare(getDateValue(a.frontmatter))
  );
}

function readWorks(): ContentItem<WorkFrontmatter>[] {
  return readContentFiles("works", normalizeWorkFrontmatter);
}

function readWriting(): ContentItem<WritingFrontmatter>[] {
  return readContentFiles("writing", normalizeWritingFrontmatter);
}

export function getWorks(): ContentItem<WorkFrontmatter>[] {
  return sortByDate(filterPublished(readWorks()));
}

export function getWriting(): ContentItem<WritingFrontmatter>[] {
  return sortByDate(filterPublished(readWriting()));
}

export function getFeaturedWorks(): ContentItem<WorkFrontmatter>[] {
  return getWorks().filter((item) => item.frontmatter.featured);
}

export function getFeaturedWriting(): ContentItem<WritingFrontmatter>[] {
  return getWriting().filter((item) => item.frontmatter.featured);
}

export function getWorkSlugs(): string[] {
  return getWorks().map((item) => item.frontmatter.slug);
}

export function getWritingSlugs(): string[] {
  return getWriting().map((item) => item.frontmatter.slug);
}

export function getWorkBySlug(slug: string): ContentItem<WorkFrontmatter> | null {
  const match = readWorks().find((item) => item.frontmatter.slug === slug);
  if (!match || match.frontmatter.status !== "published") return null;
  return match;
}

export function getWritingBySlug(
  slug: string
): ContentItem<WritingFrontmatter> | null {
  const match = readWriting().find((item) => item.frontmatter.slug === slug);
  if (!match || match.frontmatter.status !== "published") return null;
  return match;
}
