import express from "express";

import makeSlug from "slug";
import omit from "lodash.omit";
import merge from "lodash.merge";
import { incrementIdGenerator } from "./incrementIdGenerator";
import { NotFoundError } from "./NotFoundError";
import { Article } from "./article";
import { inMemoryArticleRepository } from "./inMemoryArticleRepository";

export const articleRouter = express();

const articleIdGenerator = incrementIdGenerator(String);
const articleRepository = inMemoryArticleRepository();

articleRouter.post("/api/articles", async (req, res, next) => {
  const input = req.body.article;

  const now = new Date();
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

  res.json({ article: omit(article, "id") });
});

articleRouter.put("/api/articles/:slug", async (req, res, next) => {
  const articleInput = req.body.article;
  const slug = req.params.slug;
  const existingArticle = articleRepository.findBySlug(slug);
  if (!existingArticle) {
    throw new NotFoundError(`Article with slug ${slug} does not exist`);
  }
  const article = merge(existingArticle, articleInput);
  const now = new Date();
  article.updatedAt = now;
  article.slug = makeSlug(article.title);

  articleRepository.update(article);
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
