import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Astro 5 "content layer": the glob loader reads Markdown from disk.
// The schema gives you typed, validated frontmatter — TypeScript will
// complain if a post is missing a title or uses the wrong type.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog };
