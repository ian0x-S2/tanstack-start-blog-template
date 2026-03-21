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
    <main className="page-wrap px-4 pb-16 pt-12 sm:pt-16">
      <section className="hero-panel rise-in rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Archive</p>
        <h1 className="display-title max-w-3xl text-4xl leading-tight font-semibold text-[var(--sea-ink)] sm:text-6xl">
          Essays, notes, and practical fragments.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
          A small journal for product thinking, frontend systems, and the craft
          of making interfaces feel clear.
        </p>
        <div className="mt-8">
          <TagFilter tags={tags} activeTag={activeTag} />
        </div>
      </section>

      <section className="mt-8 grid gap-5">
        {posts.length ? (
          posts.map((post, index) => (
            <div key={post.slug} className="rise-in" style={{ animationDelay: `${index * 70}ms` }}>
              <BlogCard post={post} />
            </div>
          ))
        ) : (
          <article className="blog-card">
            <p className="island-kicker mb-3">No matches</p>
            <p className="m-0 max-w-xl text-base leading-7 text-[var(--sea-ink-soft)]">
              There are no posts for this tag yet. Try another filter or return
              to the full archive.
            </p>
          </article>
        )}
      </section>
    </main>
  )
}
