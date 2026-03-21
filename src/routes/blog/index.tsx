import { createFileRoute } from '@tanstack/react-router'
import { BlogCard } from '#/components/blog/BlogCard'
import { TagFilter } from '#/components/blog/TagFilter'
import { getAllPosts, getAllTags } from '#/lib/content/posts'
import { siteMetadata } from '#/lib/site'

type BlogSearch = {
  tag?: string
}

export const Route = createFileRoute('/blog/')({
  validateSearch: (search): BlogSearch => ({
    tag:
      typeof search.tag === 'string' && search.tag.trim()
        ? search.tag.trim().toLowerCase()
        : undefined,
  }),
  loaderDeps: ({ search }) => ({ tag: search.tag }),
  loader: async ({ deps }) => {
    const [posts, tags] = await Promise.all([
      getAllPosts(deps.tag),
      getAllTags(),
    ])

    return {
      activeTag: deps.tag,
      posts,
      tags,
    }
  },
  head: ({ loaderData }) => {
    const title = loaderData?.activeTag
      ? `${loaderData.activeTag} posts | ${siteMetadata.shortTitle}`
      : `Blog | ${siteMetadata.shortTitle}`

    const description = loaderData?.activeTag
      ? `Browse ${loaderData.activeTag} articles from ${siteMetadata.title}.`
      : siteMetadata.description

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
      ],
    }
  },
  component: BlogIndexPage,
})

function BlogIndexPage() {
  const { posts, tags, activeTag } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 pb-24 pt-14">
      <section className="rise-in max-w-2xl">
        <p className="section-label mb-5">Archive</p>
        <h1 className="heading-serif text-4xl font-semibold leading-tight text-(--ink) sm:text-5xl">
          All writing.
        </h1>
        <p className="mt-3 text-base leading-7 text-(--ink-2)">
          Essays, notes, and practical fragments on product thinking and
          frontend craft.
        </p>
        {tags.length > 0 && (
          <div className="mt-6">
            <TagFilter tags={tags} activeTag={activeTag} />
          </div>
        )}
      </section>

      <div className="my-10 h-px bg-(--line)" />

      <section className="space-y-3">
        {posts.length ? (
          posts.map((post, index) => (
            <div
              key={post.slug}
              className="rise-in"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <BlogCard post={post} />
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-(--line) bg-(--surface) px-6 py-10 text-center">
            <p className="text-sm text-(--ink-2)">
              No posts match this filter.{' '}
              <a href="/blog" className="text-(--violet)">
                Clear filter
              </a>
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
