import fs from "node:fs";
import path from "node:path";

export type ResearchPost = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  date: string | null;
  body: string;
  readingTime: number;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "research");
const SEP = /^-{3,}\s*$/;

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ParsedMeta = Pick<ResearchPost, "title" | "subtitle" | "author" | "date">;

function parseMeta(block: string): ParsedMeta {
  const lines = block
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !SEP.test(l));

  let title = "";
  let subtitle = "";
  let author = "";
  let date: string | null = null;

  for (const line of lines) {
    const h = line.match(/^#\s+(.+)$/);
    if (h && !title) {
      title = h[1].trim();
      continue;
    }
    const a = line.match(/^@(.+)$/);
    if (a) {
      author = a[1].trim();
      continue;
    }
    const d = line.match(/^(\d{4}-\d{2}-\d{2})$/);
    if (d) {
      date = d[1];
      continue;
    }
    if (!subtitle) subtitle = line;
  }

  return { title, subtitle, author, date };
}

function parse(raw: string): ResearchPost {
  const lines = raw.split(/\r?\n/);
  let start = -1;
  let end = -1;
  for (let i = 0; i < lines.length; i++) {
    if (SEP.test(lines[i])) {
      if (start === -1) start = i;
      else {
        end = i;
        break;
      }
    }
  }

  let meta: ParsedMeta;
  let body: string;

  if (start !== -1 && end !== -1) {
    meta = parseMeta(lines.slice(start + 1, end).join("\n"));
    body = lines.slice(end + 1).join("\n").replace(/^\s*\n/, "");
  } else {
    const fallbackTitle = raw.match(/^#\s+(.+)$/m)?.[1] ?? "Sem título";
    meta = { title: fallbackTitle, subtitle: "", author: "", date: null };
    body = raw;
  }

  const title = meta.title || "Sem título";
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return { ...meta, title, slug: slugify(title), body, readingTime };
}

export function getAllPosts(): ResearchPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((f) =>
    parse(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8")),
  );
  return posts.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getPostBySlug(slug: string): ResearchPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}
