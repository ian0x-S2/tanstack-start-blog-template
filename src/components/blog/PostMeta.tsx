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
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[13px] text-(--ink-3)">
      <time dateTime={date}>{formatLongDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingTimeMinutes} min read</span>
      {tags.length > 0 && (
        <>
          <span aria-hidden="true">·</span>
          {tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </>
      )}
    </div>
  )
}