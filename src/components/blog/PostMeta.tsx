import type { PostSummary } from '#/lib/content/schema'
import { formatLongDate } from '#/lib/utils'

type PostMetaProps = {
  date: PostSummary['date']
  readingTimeMinutes: PostSummary['readingTimeMinutes']
  tags: PostSummary['tags']
}

export function PostMeta({
  date,
  readingTimeMinutes,
  tags,
}: PostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--sea-ink-soft)]">
      <span>{formatLongDate(date)}</span>
      <span aria-hidden="true" className="text-[var(--line-strong)]">
        / 
      </span>
      <span>{readingTimeMinutes} min read</span>
      {tags.length ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}