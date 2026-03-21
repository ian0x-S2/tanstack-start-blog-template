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
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          A quiet foundation for publishing on the web.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          {siteMetadata.title} is built as a simple writing template: markdown
          posts in the repo, clean routes, readable typography, and just enough
          structure to publish without turning the blog into a framework demo.
        </p>
      </section>
    </main>
  )
}
