import { createFileRoute, notFound } from '@tanstack/react-router'
import { PostMeta } from '#/components/blog/PostMeta'
import { getPostBySlug } from '#/lib/content/posts'
import { getAbsoluteUrl, siteMetadata } from '#/lib/site'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      throw notFound()
    }

    return { post }
  },
  headers: () => ({
    'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=604800',
  }),
  staleTime: 5 * 60_000,
  gcTime: 30 * 60_000,
  head: ({ loaderData, params }) => {
    const fallbackTitle = `Post | ${siteMetadata.shortTitle}`
    const title = loaderData?.post.title
      ? `${loaderData.post.title} | ${siteMetadata.shortTitle}`
      : fallbackTitle
    const description = loaderData?.post.description ?? siteMetadata.description
    const url = getAbsoluteUrl(`/blog/${params.slug}`)

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        {
          property: 'article:published_time',
          content: loaderData?.post.date,
        },
      ],
    }
  },
  notFoundComponent: PostNotFound,
  component: BlogPostPage,
})

function BlogPostPage() {
  const { post } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 pb-24 pt-12">
      {/* Back link */}
      <div className="mb-10">
        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-(--ink-3)hover:text-(--ink-2)"
        >
          <span aria-hidden="true">←</span>
          All posts
        </a>
      </div>

      {/* Article header */}
      <header className="rise-in max-w-180">
        <PostMeta
          date={post.date}
          readingTimeMinutes={post.readingTimeMinutes}
          tags={post.tags}
        />
        <h1 className="heading-serif mt-4 text-4xl font-semibold leading-[1.1] text-(--ink) sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-(--ink-2) sm:text-lg">
          {post.description}
        </p>
      </header>

      <div className="my-10 h-px max-w-180 bg-(--line)" />

      {/* Content */}
      <article
        className="editorial-prose prose max-w-180 prose-neutral dark:prose-invert rise-in"
        style={{ animationDelay: '100ms' }}
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  )
}

function PostNotFound() {
  return (
    <main className="page-wrap px-4 pb-24 pt-14">
      <p className="section-label mb-4">Not found</p>
      <h1 className="heading-serif text-3xl font-semibold text-(--ink)">
        That article doesn’t exist.
      </h1>
      <p className="mt-3 text-sm text-(--ink-2)">
        The slug may be wrong, or the post was removed.{' '}
        <a href="/blog" className="text-(--violet) hover:underline">
          Browse all posts
        </a>
        .
      </p>
    </main>
  )
}
