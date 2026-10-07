/**
 * Résumé files are stored in Cloudflare R2 via the gmg-resumes Worker (owned by
 * the careers-app repo), keyed by application id. Uploads happen straight from
 * the browser; the CRM reads them back from the URL recorded on the application.
 *
 * If NEXT_PUBLIC_RESUME_WORKER_URL isn't set, the resume field is hidden and
 * applications are submitted without one.
 */

const WORKER_URL = (process.env.NEXT_PUBLIC_RESUME_WORKER_URL || "").replace(/\/+$/, "");
// Ships in the client bundle — keeps resumes unlisted, not truly private.
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_RESUME_ACCESS_TOKEN || "";

export const isResumeStorageEnabled = Boolean(WORKER_URL);

export const RESUME_MAX_BYTES = 5 * 1024 * 1024;

const RESUME_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/** MIME type for an accepted resume file, or undefined if it isn't PDF/DOC/DOCX. */
export function resumeContentType(file: File): string | undefined {
  // Derive from the extension: some OS/browser combos report "" for .doc/.docx.
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return RESUME_TYPES[ext];
}

/** Public URL a stored resume is served from (recorded on the application). */
export function resumeUrl(id: string): string {
  return WORKER_URL ? `${WORKER_URL}/resumes/${id}` : "";
}

/** Persist a resume file under an application id. Resolves false if the upload failed. */
export async function saveResume(id: string, file: File): Promise<boolean> {
  if (!WORKER_URL) return true;
  try {
    const res = await fetch(`${WORKER_URL}/resumes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": resumeContentType(file) ?? "application/octet-stream",
        "X-Resume-Name": encodeURIComponent(file.name),
      },
      body: file,
    });
    if (!res.ok) console.error(`Failed to save resume ${id}: HTTP ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error(`Failed to save resume ${id}:`, err);
    return false;
  }
}
