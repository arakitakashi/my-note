import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    likes: z.number().optional(),
  }),
});

export const collections = {
  blog,
};
