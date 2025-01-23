import { Article } from "./article";

export const inMemoryArticleRepository = () => {
  const articles: Record<string, Article> = {};

  return {
    create: (art: Article) => {
      articles[art.id] = art;
    },
    findBySlug: (slug: string) => {
      return (
        Object.values(articles)
          .filter((art) => art.slug === slug)
          .pop() ?? null
      );
    },

    update(art: Article) {
      articles[art.id] = art;
    },
  };
};
