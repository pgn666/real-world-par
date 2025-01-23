import express from "express";
import omit from "lodash.omit";
import { incrementIdGenerator } from "./incrementIdGenerator";
import { NotFoundError } from "./errorHandlers";
import { inMemoryArticleRepository } from "./inMemoryArticleRepository";
import { createArticle } from "./createArticle";
import { ArticleInputSchema } from "./parseArticleInput";
import { updateArticle } from "./updateArticle";

export const articleRouter = express();

const articleIdGenerator = incrementIdGenerator(String);
const articleRepository = inMemoryArticleRepository();

articleRouter.post("/api/articles", async (req, res, next) => {
  // HTTP
  const input = ArticleInputSchema.parse(req.body.article);

  // Article Service
  const article = await createArticle(
    articleRepository,
    articleIdGenerator,
    () => new Date()
  )(input);

  // HTTP
  res.json({ article: omit(article, "id") });
});

articleRouter.put("/api/articles/:slug", async (req, res, next) => {
  const input = ArticleInputSchema.parse(req.body.article);
  const slug = req.params.slug;

  // Article Service
  const article = await updateArticle(articleRepository, () => new Date())(
    slug,
    input
  );

  // HTTP
  res.json({ article: omit(article, "id") });
});

articleRouter.get("/api/articles/:slug", async (req, res, next) => {
  const slug = req.params.slug;

  const existingArticle = articleRepository.findBySlug(slug);
  if (!existingArticle) {
    throw new NotFoundError(`Article with slug ${slug} does not exist`);
  }
  res.json({ article: omit(existingArticle, "id") });
});
