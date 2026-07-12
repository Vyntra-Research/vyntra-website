import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/research";
import { isLocale, type Locale } from "@/i18n/config";

export const runtime = "nodejs";
export const alt = "Vyntra Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "pt";
  const post = getPostBySlug(slug, locale);
  const title = post?.title ?? "Vyntra Research";
  const subtitle = post?.subtitle ?? "";
  const eyebrow = locale === "en" ? "VYNTRA RESEARCH" : "VYNTRA RESEARCH";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000",
          color: "#f2f2f2",
          padding: "72px",
          fontFamily: "monospace",
          border: "2px solid rgba(255,255,255,0.18)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#f2f2f2",
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              color: "#9a9a9a",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 28, color: "#9a9a9a", maxWidth: 940 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 280,
              height: 2,
              backgroundColor: "rgba(255,255,255,0.25)",
            }}
          />
          <div style={{ fontSize: 22, color: "#9a9a9a" }}>
            {post?.author ? `@${post.author}` : "vyntra.sh"}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
