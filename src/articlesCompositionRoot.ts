import { Kysely } from "kysely";
import { DB } from "./dbTypes";
import { inMemoryArticleRepository } from "./inMemoryArticleRepository";
import { sqlArticleRepository } from "./sqlArticleRepository";
import { uuidGenerator } from "./uuidGenerator";

export function sqlArticlesCompositionRoot(db: Kysely<DB>) {
    const articleIdGenerator = uuidGenerator;
    const articleRepository =  sqlArticleRepository(db)
    return {
        articleRepository: articleRepository,
        create: () => {},
        update: () => {},
    }

};
export const inMemoryArticlesCompositionRoot = {
    return {
        articleRepository: inMemoryArticleRepository(),
        create: () => {},
        update: () => {},
    }
};
