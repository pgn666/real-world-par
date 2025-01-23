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
  create: (art: Article) => void;
  findBySlug: (slug: string) => Article | null;
  update: (art: Article) => void;
};
