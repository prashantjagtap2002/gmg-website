// Server-only access to the careers Supabase project (shared with the GMG
// Careers admin CRM, which owns job/application management). Talks to the
// PostgREST API directly so reads can use Next's fetch cache.
// The service_role key bypasses Row Level Security — never import this file
// from a client component.

export function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return url && key ? { url, key } : null;
}

export function supabaseHeaders(key: string, extra?: Record<string, string>): Record<string, string> {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...extra };
}
