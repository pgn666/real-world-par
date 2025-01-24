import { createDb } from "./db";
import { Config } from "./config";
import { articlesCompositionRoot } from "./articles/application/articlesCompositionRoot";
import { createArticlesRouter } from "./articles/api/articlesRouter";

export const appCompositionRoot = (config: Config) => {
  const db = config.DATABASE_URL ? createDb(config.DATABASE_URL) : null;
  const articlesModule = articlesCompositionRoot(db);
  const articlesRouter = createArticlesRouter(articlesModule);
  const clean = () => articlesModule.articleRepository.deleteAll();

  return { articlesRouter, clean };
};
