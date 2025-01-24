export type Article = {
    body: string;
    description: string;
    tagList: Array<string>;
    title: string;
    slug: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ArticleRepository = {
    create(article: Article): Promise<void>;
    update(article: Article): Promise<void>;
    findBySlug(slug: string): Promise<Article | null>;
    deleteAll(): Promise<void>;
};
