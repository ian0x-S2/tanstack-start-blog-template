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
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--ink-3)] hover:text-[var(--ink-2)]"
        >
          <span aria-hidden="true">←</span>
          All posts
        </a>
      </div>

      {/* Article header */}
      <header className="rise-in max-w-[720px]">
        <PostMeta
          date={post.date}
          readingTimeMinutes={post.readingTimeMinutes}
          tags={post.tags}
        />
        <h1 className="heading-serif mt-4 text-4xl font-semibold leading-[1.1] text-[var(--ink)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--ink-2)] sm:text-lg">
          {post.description}
        </p>
      </header>

      <div className="my-10 h-px max-w-[720px] bg-[var(--line)]" />

      {/* Content */}
      <article
        className="editorial-prose prose max-w-[720px] prose-neutral dark:prose-invert rise-in"
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
      <h1 className="heading-serif text-3xl font-semibold text-[var(--ink)]">
        That article doesn’t exist.
      </h1>
      <p className="mt-3 text-sm text-[var(--ink-2)]">
        The slug may be wrong, or the post was removed.{' '}
        <a href="/blog" className="text-[var(--violet)] hover:underline">
          Browse all posts
        </a>
        .
      </p>
    </main>
  )
}
