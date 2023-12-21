import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        headerItems: z.boolean().optional(),
        sourceLink: z.string().optional(),
      }),
    }),
  }),
};
