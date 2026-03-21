import { z } from 'zod'

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().date(),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  published: z.boolean().default(true),
})

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>

export type PostSummary = PostFrontmatter & {
  slug: string
  body: string
  html: string
  readingTimeMinutes: number
  url: string
}