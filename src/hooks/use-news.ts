import { useQuery } from "@tanstack/react-query";
import type { NewsItem } from "@/lib/news";

const NEWS_STORAGE_KEY = "edu-site-news";

export function useNews(limit?: number) {
  return useQuery({
    queryKey: ["news", limit ?? "all"],
    queryFn: async (): Promise<NewsItem[]> => {
      const stored = localStorage.getItem(NEWS_STORAGE_KEY);
      let news: NewsItem[] = stored ? JSON.parse(stored) : [];

      news.sort((a, b) => {
        const dateA = new Date(b.published_at).getTime();
        const dateB = new Date(a.published_at).getTime();
        return dateA - dateB;
      });

      if (limit) news = news.slice(0, limit);
      return news;
    },
  });
}
