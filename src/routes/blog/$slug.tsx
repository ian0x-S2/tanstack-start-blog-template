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
    <main className="page-wrap px-4 pb-20 pt-12 sm:pt-16">
      <article className="hero-panel rise-in rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Journal entry</p>
        <h1 className="display-title max-w-4xl text-4xl leading-[1.05] font-semibold text-(--sea-ink) sm:text-6xl">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-(--sea-ink-soft) sm:text-lg">
          {post.description}
        </p>
        <div className="mt-8">
          <PostMeta
            date={post.date}
            readingTimeMinutes={post.readingTimeMinutes}
            tags={post.tags}
          />
        </div>
      </article>

      <section className="island-shell mt-8 rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
        <div
          className="editorial-prose prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>
    </main>
  )
}

function PostNotFound() {
  return (
    <main className="page-wrap px-4 pb-20 pt-16">
      <section className="hero-panel rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <p className="island-kicker mb-3">Missing post</p>
        <h1 className="display-title text-4xl font-semibold text-(--sea-ink) sm:text-5xl">
          That article does not exist.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-(--sea-ink-soft)">
          The slug may be wrong, or the post may have been removed from the
          bundled content collection.
        </p>
      </section>
    </main>
  )
}
