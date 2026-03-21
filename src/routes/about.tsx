import { createFileRoute } from '@tanstack/react-router'
import { siteMetadata } from '#/lib/site'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: `About | ${siteMetadata.shortTitle}` },
      { name: 'description', content: siteMetadata.description },
    ],
  }),
  component: About,
})

function About() {
  return (
    <main className="page-wrap px-4 pb-24 pt-14">
      <section className="rise-in max-w-2xl">
        <p className="section-label mb-5">About</p>
        <h1 className="heading-serif text-4xl font-semibold leading-tight text-(--ink) sm:text-5xl">
          A quiet foundation for publishing on the web.
        </h1>
        <p className="mt-5 text-base leading-7 text-(--ink-2)">
          {siteMetadata.title} is built as a simple writing template: markdown
          posts in the repo, clean routes, readable typography, and just enough
          structure to publish without turning the blog into a framework demo.
        </p>
        <div className="mt-8 rounded-xl border border-(--line) bg-(--surface) px-6 py-5">
          <ul className="m-0 space-y-2 text-sm text-(--ink-2) list-none p-0">
            {[
              'Bundled Markdown — posts live in the repo and ship with the build.',
              'Tags are optional, URL-driven, and easy to extend.',
              'RSS and sitemap are generated from the same content index.',
              'Dark and light mode — no flash, system-aware.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-(--violet)" aria-hidden="true">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
