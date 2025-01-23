import { Article, ArticleRepository } from "./article";
import makeSlug from "slug";
import merge from "lodash.merge";
import { NotFoundError } from "./errorHandlers";
import { UpdateArticleInput } from "./parseArticleInput";

export const updateArticle =
  (articleRepository: ArticleRepository, clock: () => Date) =>
  (slug: string, articleInput: UpdateArticleInput) => {
    const existingArticle = articleRepository.findBySlug(slug);
    if (!existingArticle) {
      throw new NotFoundError(`Article with slug ${slug} does not exist`);
    }
    const article: Article = merge(existingArticle, articleInput);
    const now = clock();
    article.updatedAt = now;
    article.slug = makeSlug(article.title);
    articleRepository.update(article);
    return article;
  };
