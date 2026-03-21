import { Link } from '@tanstack/react-router'
import type { PostSummary } from '#/lib/content/schema'
import { PostMeta } from './PostMeta'

type BlogCardProps = {
  post: PostSummary
  priority?: 'featured' | 'default'
}

export function BlogCard({ post, priority = 'default' }: BlogCardProps) {
  return (
    <article
      className={priority === 'featured' ? 'blog-card blog-card-featured' : 'blog-card'}
    >
      <div className="space-y-4">
        <PostMeta
          date={post.date}
          readingTimeMinutes={post.readingTimeMinutes}
          tags={post.tags}
        />
        <div className="space-y-3">
          <h2 className="display-title text-3xl leading-tight font-semibold text-[var(--sea-ink)] sm:text-4xl">
            <Link to="/blog/$slug" params={{ slug: post.slug }} className="no-underline">
              {post.title}
            </Link>
          </h2>
          <p className="m-0 max-w-2xl text-base leading-7 text-[var(--sea-ink-soft)]">
            {post.description}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline"
        >
          Read article
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}