import { Link } from '@tanstack/react-router'
import type { PostSummary } from '#/lib/content/schema'
import { PostMeta } from './PostMeta'

type BlogCardProps = {
  post: PostSummary
  priority?: 'featured' | 'default'
}

export function BlogCard({ post, priority = 'default' }: BlogCardProps) {
  return (
    <article className={priority === 'featured' ? 'blog-card blog-card-featured' : 'blog-card'}>
      <PostMeta
        date={post.date}
        readingTimeMinutes={post.readingTimeMinutes}
        tags={post.tags}
      />
      <h2
        className={
          priority === 'featured'
            ? 'heading-serif mt-3 text-2xl font-semibold leading-snug text-[var(--ink)] sm:text-3xl'
            : 'heading-serif mt-3 text-xl font-semibold leading-snug text-[var(--ink)] sm:text-2xl'
        }
      >
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="no-underline hover:text-[var(--violet)] transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 mb-5 text-[14px] leading-6 text-[var(--ink-2)] line-clamp-3">
        {post.description}
      </p>
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--violet)] no-underline hover:opacity-80"
      >
        Read article
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}