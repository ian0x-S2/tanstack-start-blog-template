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
    <main className="page-wrap px-4 pb-16 pt-14">
      <section className="hero-panel rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">Minimal, simple, elegant</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          A restrained blog template for words that need room.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Built for essays, notes, and thoughtful updates. Markdown-authored,
          route-driven, and designed to feel calm on first read.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/blog"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            Browse the archive
          </a>
          <a
            href="/rss.xml"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            RSS feed
          </a>
        </div>
      </section>

      {latestPost ? (
        <section className="mt-8 rise-in" style={{ animationDelay: '120ms' }}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="island-kicker mb-2">Latest entry</p>
              <h2 className="display-title m-0 text-3xl font-semibold text-[var(--sea-ink)] sm:text-4xl">
                Start with the newest piece.
              </h2>
            </div>
          </div>
          <BlogCard post={latestPost} priority="featured" />
        </section>
      ) : null}

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="island-shell rounded-[2rem] p-6 sm:p-8">
          <p className="island-kicker mb-3">What this template includes</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Bundled markdown', 'Posts live in the repo and ship with the build.'],
              ['Lean metadata', 'Home, archive, and articles expose clean SEO defaults.'],
              ['Simple taxonomy', 'Tags are optional, URL-driven, and easy to extend.'],
              ['Publishing extras', 'RSS and sitemap come from the same content index.'],
            ].map(([title, description], index) => (
              <article
                key={title}
                className="feature-card rise-in rounded-2xl p-5"
                style={{ animationDelay: `${index * 80 + 180}ms` }}
              >
                <h3 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
                  {title}
                </h3>
                <p className="m-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="island-shell rounded-[2rem] p-6 sm:p-8">
          <p className="island-kicker mb-3">Recent writing</p>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <article key={post.slug} className="border-b border-[var(--line)] pb-4 last:border-b-0 last:pb-0">
                <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">{post.date}</p>
                <a href={post.url} className="text-lg font-semibold text-[var(--sea-ink)] no-underline">
                  {post.title}
                </a>
                <p className="mt-2 mb-0 text-sm leading-7 text-[var(--sea-ink-soft)]">
                  {post.description}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}
