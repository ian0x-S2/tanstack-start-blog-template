import { Link } from '@tanstack/react-router'
import { siteMetadata } from '#/lib/site'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-14 border-b border-(--line) bg-(--header-bg) backdrop-blur-md">
      <div className="page-wrap flex h-full items-center gap-1 px-4">
        <Link
          to="/"
          className="shrink-0 px-1 text-sm font-semibold text-(--ink) no-underline"
        >
          {siteMetadata.shortTitle}
        </Link>

        <nav className="ml-auto flex items-center gap-0.5">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            About
          </Link>
          <a href="/rss.xml" className="nav-link">
            RSS
          </a>
        </nav>

        <div className="ml-2 flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
