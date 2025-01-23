import {ArticleRepository} from "./article";
import {Kysely} from "kysely";
import {DB} from "./dbTypes";

export const sqlArticleRepository = (db: Kysely<DB>): ArticleRepository => {
    return {
        async create(article) {
            await db.insertInto('article').values(article).execute();
            if (article.tagList.length > 0) {
                await db.insertInto('tags').values(article.tagList.map(tag => ({
                    name: tag,
                    articleId: article.id
                }))).execute();
            }
        },
        async update(article) {
            await db.updateTable('article').set(article).where('article.id', '=', article.id).execute();
        },
        async findBySlug(slug) {
            return null;
        },
    };
};