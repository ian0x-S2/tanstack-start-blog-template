import { createFileRoute } from '@tanstack/react-router'
import { BlogCard } from '#/components/blog/BlogCard'
import { getFeaturedPosts } from '#/lib/content/posts'
import { siteMetadata } from '#/lib/site'

export const Route = createFileRoute('/')({
  loader: async () => ({
    featuredPosts: await getFeaturedPosts(3),
  }),
  head: () => ({
    meta: [
      { title: `${siteMetadata.title} | Minimal blog template` },
      { name: 'description', content: siteMetadata.description },
      { property: 'og:title', content: siteMetadata.title },
      { property: 'og:description', content: siteMetadata.description },
      { property: 'og:type', content: 'website' },
    ],
  }),
  component: App,
})

function App() {
  const { featuredPosts } = Route.useLoaderData()
  const [latestPost, ...recentPosts] = featuredPosts

  return (
    <main className="page-wrap px-4 pb-24 pt-14">
      {/* Hero — plain text on page background */}
      <section className="rise-in max-w-2xl">
        <p className="section-label mb-5">{siteMetadata.title}</p>
        <h1 className="heading-serif text-4xl font-semibold leading-[1.12] tracking-tight text-(--ink) sm:text-5xl">
          A minimal blog template for clear writing.
        </h1>
        <p className="mt-4 text-base leading-7 text-(--ink-2) sm:text-lg ">
          Open source, edge-ready, Markdown-driven. Built with TanStack Start
          and React Compiler.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 rounded-md bg-(--violet) px-4 py-2 text-sm font-medium text-white no-underline hover:opacity-90"
          >
            Browse the archive
          </a>
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-2 rounded-md border border-(--line) px-4 py-2 text-sm font-medium text-(--ink-2) no-underline hover:bg-(--surface) hover:text-(--ink)"
          >
            RSS feed
          </a>
        </div>
      </section>

      <div className="my-12 h-px bg-(--line)" />

      {latestPost ? (
        <section className="rise-in" style={{ animationDelay: '80ms' }}>
          <p className="section-label mb-5">Latest entry</p>
          <BlogCard post={latestPost} priority="featured" />
        </section>
      ) : null}

      {recentPosts.length > 0 ? (
        <section className="mt-10 rise-in" style={{ animationDelay: '160ms' }}>
          <p className="section-label mb-5">More writing</p>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
