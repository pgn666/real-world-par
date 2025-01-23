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

export type ArticleInput = {
  body: string;
  description: string;
  tagList: Array<string>;
  title: string;
};
