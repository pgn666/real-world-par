import { ArticleRepository } from "./article";
import { Kysely } from "kysely";
import { DB, Tags } from "./dbTypes";

export const sqlArticleRepository = (db: Kysely<DB>): ArticleRepository => {
  return {
    async create(article) {
      const { tagList, ...articleProps } = article;
      await db
        .insertInto("article")
        .values({ ...articleProps })
        .execute();
      if (tagList.length > 0) {
        await db
          .insertInto("tags")
          .values(
            tagList.map((tag) => ({
              name: tag,
              articleId: article.id,
            }))
          )
          .execute();
      }
    },
    async update(article) {
      const { tagList, ...articleProps } = article;
      await db
        .updateTable("article as a")
        .set({ ...articleProps })
        .where("a.id", "=", article.id)
        .execute();

      await db.deleteFrom("tags").where("articleId", "=", article.id).execute();

      if (tagList.length > 0) {
        await db
          .insertInto("tags")
          .values(
            tagList.map((tag) => ({
              name: tag,
              articleId: article.id,
            }))
          )
          .execute();
      }
    },
    async findBySlug(slug) {
      const article = await db
        .selectFrom("article")
        .where("slug", "=", slug)
        .selectAll()
        .executeTakeFirst();
      if (!article) return null;
      const tags = await db
        .selectFrom("tags")
        .where("articleId", "=", article.id)
        .selectAll()
        .execute();
      return {
        ...article,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
        tagList: tags.map((tag) => tag.name),
      };
    },
  };
};
