import { createFileRoute } from '@tanstack/react-router'
import { getAllPosts } from '#/lib/content/posts'
import { getAbsoluteUrl, siteMetadata } from '#/lib/site'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: async () => {
        const posts = await getAllPosts()

        const items = posts
          .map(
            (post) => `
              <item>
                <title>${escapeXml(post.title)}</title>
                <link>${getAbsoluteUrl(post.url)}</link>
                <guid>${getAbsoluteUrl(post.url)}</guid>
                <description>${escapeXml(post.description)}</description>
                <pubDate>${new Date(post.date).toUTCString()}</pubDate>
              </item>`,
          )
          .join('')

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
          <rss version="2.0">
            <channel>
              <title>${escapeXml(siteMetadata.title)}</title>
              <link>${siteMetadata.url}</link>
              <description>${escapeXml(siteMetadata.description)}</description>
              ${items}
            </channel>
          </rss>`

        return new Response(xml, {
          headers: {
            'content-type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        })
      },
    },
  },
})
