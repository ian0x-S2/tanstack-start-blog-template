import { siteMetadata } from '#/lib/site'

export default function Footer() {
  return (
    <footer className="site-footer mt-24  px-4 py-8">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="m-0 text-[13px] text-(--ink-3)" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} {siteMetadata.author}
        </p>
        <div className="flex items-center gap-0.5">
          <a href="/blog" className="nav-link">Archive</a>
          <a href="/rss.xml" className="nav-link">RSS</a>
          <a href="/sitemap.xml" className="nav-link">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}
