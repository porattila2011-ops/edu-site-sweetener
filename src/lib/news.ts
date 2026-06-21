export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  tag: string | null;
  image_url: string | null;
  published_at: string; // YYYY-MM-DD
}

/** Formats a YYYY-MM-DD date string into Hungarian "2026. 01. 12." form. */
export function formatNewsDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${y}. ${m}. ${d}.`;
}
