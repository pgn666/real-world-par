import {Article, ArticleRepository} from "./article";
import makeSlug from "slug";
import {Clock} from "./clock";
import {NotFoundError} from "./NotFoundError";
import merge from "lodash.merge";
import {UpdateArticleInput} from "./parseArticleInput";

export const updateArticle =
    (articleRepository: ArticleRepository, clock: Clock) =>
        async (slug: string, articleInput: UpdateArticleInput) => {
            const existingArticle = await articleRepository.findBySlug(slug);
            if (!existingArticle) {
                throw new NotFoundError(`Article with slug ${slug} does not exist`);
            }
            const article: Article = merge(existingArticle, articleInput);
            const now = clock();
            article.updatedAt = now;
            article.slug = makeSlug(article.title);
            await articleRepository.update(article);
            return article;
        };

docker run -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=user -e POSTGRES_DB=conduit
--name conduit -d -p 5432:5432 postgres