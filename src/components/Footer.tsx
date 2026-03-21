import { siteMetadata } from '#/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} {siteMetadata.author}. All rights reserved.
        </p>
        <p className="island-kicker m-0">{siteMetadata.title}</p>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <a
          href="/blog"
          className="rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
        >
          Archive
        </a>
        <a
          href="/rss.xml"
          className="rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
        >
          RSS
        </a>
        <a
          href="/sitemap.xml"
          className="rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
        >
          Sitemap
        </a>
      </div>
    </footer>
  )
}
