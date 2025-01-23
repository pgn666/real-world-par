import { z } from "zod";
// joi
// runtime schema


// value
export const ArticleInput = z.object({
    title: z.string().min(1),
    body: z.string(),
    description: z.string(),
    tagList: z.array(z.string()),
});
// type
export type ArticleInput = z.infer<typeof ArticleInput>;
// compile time type
// const result = ArticleInput.parse({});