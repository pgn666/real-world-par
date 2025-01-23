import slug from "slug";
import { Article, ArticleRepository } from "./article";
import { ArticleInput } from "./parseArticleInput";

type IdGenerator = () => string;

export function createArticle(
  articleRepository: ArticleRepository,
  articleIdGenerator: IdGenerator,
  clock: () => Date
) {
  const makeSlug = (title: string) => slug(title);

  return (input: ArticleInput) => {
    const now = clock();
    const article: Article = {
      body: input.body,
      description: input.description,
      tagList: input.tagList,
      title: input.title,
      slug: makeSlug(input.title),
      id: articleIdGenerator(),
      createdAt: now,
      updatedAt: now,
    };
    articleRepository.create(article);

    return article;
  };
}
