import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

type ParsedFrontmatterValue = boolean | string | string[]

type ParsedMarkdown = {
  content: string
  data: Record<string, ParsedFrontmatterValue>
}

function stripQuotes(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }

  return value
}

function parseFrontmatterValue(rawValue: string): ParsedFrontmatterValue {
  const trimmedValue = rawValue.trim()

  if (trimmedValue === 'true') {
    return true
  }

  if (trimmedValue === 'false') {
    return false
  }

  if (trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) {
    return trimmedValue
      .slice(1, -1)
      .split(',')
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean)
  }

  return stripQuotes(trimmedValue)
}

export function parseMarkdownDocument(source: string): ParsedMarkdown {
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---\n?/)

  if (!frontmatterMatch) {
    return {
      content: source,
      data: {},
    }
  }

  const data: Record<string, ParsedFrontmatterValue> = {}

  for (const line of frontmatterMatch[1].split('\n')) {
    const separatorIndex = line.indexOf(':')

    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)

    if (!key) {
      continue
    }

    data[key] = parseFrontmatterValue(value)
  }

  return {
    content: source.slice(frontmatterMatch[0].length),
    data,
  }
}

export async function renderMarkdown(markdown: string) {
  const result = await remark().use(remarkGfm).use(remarkHtml).process(markdown)

  return result.toString()
}

export function estimateReadingTime(markdown: string) {
  const wordCount = markdown
    .replace(/[#*_>`~-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(1, Math.round(wordCount / 220))
}