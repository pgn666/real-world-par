import { z } from "zod";

export const ArticleInputSchema = z.object({
  title: z.string().min(1),
  body: z.string(),
  description: z.string(),
  tagList: z.array(z.string()),
});

export type ArticleInput = z.infer<typeof ArticleInputSchema>;

export const UpdateArticleSchema = ArticleInputSchema.partial();
export type UpdateArticleInput = z.infer<typeof UpdateArticleSchema>;

