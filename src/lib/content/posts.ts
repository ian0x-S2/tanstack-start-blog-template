import { postFrontmatterSchema, type PostSummary } from './schema'
import {
  estimateReadingTime,
  parseMarkdownDocument,
  renderMarkdown,
} from './markdown'

const markdownModules = import.meta.glob<string>('/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function getSlugFromPath(filePath: string) {
  return filePath.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase()
}

const postsPromise = Promise.all(
  Object.entries(markdownModules).map(async ([filePath, source]) => {
    const slug = getSlugFromPath(filePath)
    const { content, data } = parseMarkdownDocument(source)
    const frontmatter = postFrontmatterSchema.parse({
      ...data,
      tags: Array.isArray(data.tags)
        ? data.tags.map((tag) => normalizeTag(String(tag)))
        : [],
    })

    const html = await renderMarkdown(content)

    return {
      ...frontmatter,
      slug,
      body: content,
      html,
      readingTimeMinutes: estimateReadingTime(content),
      url: `/blog/${slug}`,
    } satisfies PostSummary
  }),
).then((posts) =>
  posts
    .filter((post) => post.published)
    .sort((left, right) => right.date.localeCompare(left.date)),
)

export async function getAllPosts(tag?: string) {
  const posts = await postsPromise

  if (!tag) {
    return posts
  }

  const normalizedTag = normalizeTag(tag)
  return posts.filter((post) => post.tags.includes(normalizedTag))
}

export async function getFeaturedPosts(limit = 3) {
  const posts = await postsPromise
  return posts.slice(0, limit)
}

export async function getPostBySlug(slug: string) {
  const posts = await postsPromise
  return posts.find((post) => post.slug === slug) ?? null
}

export async function getAllTags() {
  const posts = await postsPromise

  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) =>
    a.localeCompare(b),
  )
}