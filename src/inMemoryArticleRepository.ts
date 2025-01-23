import { Article, ArticleRepository } from "./article";

export const inMemoryArticleRepository = (): ArticleRepository => {
  const articles: Record<string, Article> = {};

  return {
    create: (art) => {
      articles[art.id] = art;
    },
    findBySlug: (slug) => {
      return (
        Object.values(articles)
          .filter((art) => art.slug === slug)
          .pop() ?? null
      );
    },

    update(art) {
      articles[art.id] = art;
    },
  };
};
