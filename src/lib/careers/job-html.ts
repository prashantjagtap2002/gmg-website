import sanitizeHtml from "sanitize-html";

// Exactly what the CRM's JD rich text editor (TipTap StarterKit) produces.
// Anything else in a stored description is dropped, so a tampered database
// row can't run script on the public site.
const ALLOWED_TAGS = ["p", "br", "ul", "ol", "li", "strong", "b", "em", "i", "u", "s", "blockquote", "a", "h1", "h2", "h3", "h4", "h5", "h6"];

/** True for descriptions written with the JD rich text editor (stored as HTML). */
export function isHtml(text: string): boolean {
  return /<\/?(p|ul|ol|li|strong|em|u|s|blockquote|a|br|h[1-6])[\s>]/i.test(text);
}

/** Sanitised HTML for a stored job description (plain-text ones become paragraphs). */
export function sanitizeJobHtml(text: string): string {
  if (!isHtml(text)) {
    const escape = (line: string) => line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return text
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => `<p>${escape(l)}</p>`)
      .join("");
  }
  return sanitizeHtml(text, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer nofollow" }),
    },
  });
}

/** Plain-text summary for the meta description (search result snippet). */
export function summary(description: string): string {
  const text = sanitizeHtml(description, { allowedTags: [], allowedAttributes: {} });
  const clean = text.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  return clean.length > 155 ? `${clean.slice(0, 152).trimEnd()}…` : clean;
}
