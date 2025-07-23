import { glob } from "astro/loaders"
import { defineCollection, getCollection, z } from "astro:content"

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tldr: z.string(),
    draft: z.boolean().default(false),
  }),
})

export const getPosts = async () =>
  (await getCollection("blog")).filter((post) =>
    import.meta.env.PROD ? !post.data.draft : true,
  )

export const collections = { blog }
