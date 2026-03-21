import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '#/lib/content/posts'
import { getAbsoluteUrl } from '#/lib/site'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const posts = await getAllPosts()
        const urls = ['/', '/blog', ...posts.map((post) => post.url)]

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${urls
              .map(
                (path) => `
                  <url>
                    <loc>${getAbsoluteUrl(path)}</loc>
                  </url>`,
              )
              .join('')}
          </urlset>`

        return new Response(xml, {
          headers: {
            'content-type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        })
      },
    },
  },
})