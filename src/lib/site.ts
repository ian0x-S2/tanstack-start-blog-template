export const siteMetadata = {
  title: 'Northstar Journal',
  shortTitle: 'Northstar',
  description:
    'A minimal, elegant blog template for thoughtful writing, notes, and essays.',
  url: 'https://example.com',
  author: 'Your Name',
} as const

export function getAbsoluteUrl(path: string) {
  return new URL(path, siteMetadata.url).toString()
}