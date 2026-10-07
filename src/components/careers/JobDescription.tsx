import { isHtml, sanitizeJobHtml } from "@/lib/careers/job-html";

const HEADERS = [
  "About the Role:",
  "About the role:",
  "What You'll Do:",
  "What you'll do:",
  "Key Responsibilities",
  "Responsibilities",
  "Requirements",
  "Who You Are:",
  "Must-Have",
  "Must Have",
  "Should-Have",
  "Should Have",
  "Nice to Have",
  "Nice-to-Have",
  "Nice to have",
  "Work Mode:",
  "Location:",
];

const CONNECTORS = new Set(["of", "and", "the", "for", "with", "to", "a", "in", "by", "or", "on", "at", "as", "&"]);

/**
 * Heuristic that decides whether a plain-text line is a section heading
 * (so it can be rendered bold). Keeps full sentences as normal paragraphs.
 */
function isHeader(line: string): boolean {
  const t = line.trim();
  if (!t || t.length > 60) return false;
  if (/[.,;]$/.test(t)) return false;
  if (/^[A-Z]\)\s+/.test(t)) return true; // "A) Customer Satisfaction ..."
  const words = t.split(/\s+/);
  if (/^\d+\.\s+[A-Z]/.test(t) && words.length <= 7) return true; // "1. Primary Responsibilities"
  if (/:$/.test(t)) return true; // short label ending with ":"
  if (words.length < 2 || words.length > 7) return false;
  const significant = words.filter((w) => /^[A-Z(]/.test(w) || CONNECTORS.has(w.toLowerCase()));
  return significant.length >= Math.ceil(words.length * 0.6);
}

/** Renders a job description written in the CRM: rich-text HTML (sanitised) or legacy plain text. */
export default function JobDescription({ text }: { text: string }) {
  if (!text) return <p className="text-white/55">No description available.</p>;

  if (isHtml(text)) {
    return (
      <div
        className="space-y-3 text-[15px] leading-7 text-white/75 [&_a]:text-gold [&_a]:underline [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-white/20 [&_blockquote]:pl-3 [&_blockquote]:italic [&_h1]:mt-6 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-5 [&_h3]:font-semibold [&_h3]:text-white [&_h4]:mt-4 [&_h4]:font-semibold [&_h4]:text-white [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:marker:text-gold"
        dangerouslySetInnerHTML={{ __html: sanitizeJobHtml(text) }}
      />
    );
  }

  let normalized = text.replace(/\t/g, " ").replace(/●\s*/g, "\n● ").replace(/○\s*/g, "\n○ ");
  for (const h of HEADERS) {
    const esc = h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    normalized = normalized.replace(new RegExp(esc, "g"), "\n\n" + h);
  }
  const lines = normalized
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return (
    <div className="space-y-3 text-[15px] leading-7 text-white/75">
      {lines.map((line, i) => {
        if (line.startsWith("●")) {
          return (
            <p key={i} className="pt-2 font-semibold text-gold">
              {line.replace(/^●\s*/, "")}
            </p>
          );
        }
        if (line.startsWith("○")) {
          return (
            <p key={i} className="flex gap-2.5 pl-3">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-gold/70" />
              <span>{line.replace(/^○\s*/, "")}</span>
            </p>
          );
        }
        if (isHeader(line)) {
          return (
            <p key={i} className="pt-3 text-base font-semibold text-white">
              {line}
            </p>
          );
        }
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}
