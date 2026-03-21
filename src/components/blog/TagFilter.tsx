import { Link } from '@tanstack/react-router'

type TagFilterProps = {
  tags: string[]
  activeTag?: string
}

export function TagFilter({ tags, activeTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        to="/blog/"
        search={{}}
        className={activeTag ? 'tag-filter' : 'tag-filter is-active'}
      >
        All posts
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          to="/blog/"
          search={{ tag }}
          className={activeTag === tag ? 'tag-filter is-active' : 'tag-filter'}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}