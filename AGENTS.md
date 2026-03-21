# AGENTS.md

## Overview

This project defines a modern blog architecture built with:

- **React (React Compiler enabled)**
- **TanStack Start (SSR + routing + data layer)**
- **UI: shadcn/ui + BaseUI**
- **Content: Markdown (MD/MDX)**
- **Bun (runtime + package manager)**

The goal is to maximize performance, developer experience, and maintainability.

---

## Tech Stack

### Core

- React (with React Compiler)
- TanStack Start
- TypeScript
- Bun

### UI

- shadcn/ui (styled components)
- BaseUI (accessible, headless components)

### Content

- Markdown / MDX
- Parsing tools:
  - `gray-matter` (frontmatter)
  - `remark`
  - `rehype`

### State / Data

- TanStack Query
- TanStack Router
- File-based content

---

## Package Management

All dependencies MUST be installed using Bun.

### Rules

- NEVER use:
  - npm
  - yarn
  - pnpm

- ALWAYS use:

```bash
bun add <package>
bun add -d <package>   # dev dependencies
```

### Examples

```bash
bun add @tanstack/react-query
bun add @tanstack/react-router
bun add gray-matter remark rehype
bun add -d typescript @types/node
```

---

## Project Structure

```
/src
  /app
    router.tsx
    providers.tsx

  /components
    ui/            # shadcn
    base/          # BaseUI wrappers
    blog/          # blog-specific components

  /features
    posts/
      components/
      hooks/
      services/

  /lib
    markdown/
      parser.ts
      renderer.tsx

  /routes
    index.tsx
    blog/
      index.tsx
      $slug.tsx

  /styles

/content
  posts/
    my-post.md

/public
```

---

## Content Strategy (Markdown)

Each post must follow this structure:

```md
---
title: "Post Title"
date: "2026-03-21"
description: "Short summary"
tags: ["react", "tanstack"]
---

# Content

Markdown content here...
```

### Rules

- Frontmatter is required
- Slug is derived from filename
- Use MDX when React components are needed inside content

---

## Routing (TanStack)

Routes:

- `/` → homepage
- `/blog` → posts list
- `/blog/:slug` → individual post

### Loader Pattern

```ts
export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    return getPostBySlug(params.slug);
  },
});
```

---

## Data Layer

### Server-first approach

- Content loaded from filesystem
- Cached with TanStack Query

### Hook Pattern

```ts
export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });
}
```

## The project MUST support ISR (Incremental Static Regeneration) to combine:

Static performance (SSG)d
Dynamic freshness (SSR-like updates)

This is critical for blog scalability and SEO.

ISR Strategy
Rendering Modes

Each route MUST explicitly define its rendering strategy:

SSG (Static) → build-time generation
ISR (Revalidated Static) → cached + periodically refreshed
SSR (Dynamic) → always fresh

---

## UI Guidelines

### shadcn/ui

Use for:

- Buttons
- Cards
- Inputs
- Layout primitives

### BaseUI

Use for:

- Complex accessible components
- Headless patterns

### Rule

- Do not duplicate responsibilities
- Create unified wrappers in `/components/ui`

---

## React Compiler

### Enablement

- Use compatible React version
- Enable in bundler (Vite or equivalent supported by Bun)

### Rules

Avoid:

- Object mutation
- Side effects outside hooks

Prefer:

- Pure functions
- Derived state

---

## Performance Strategy

- SSR via TanStack Start
- Streaming when possible
- Route-based code splitting
- Lazy load heavy MDX content

---

## SEO

- Dynamic meta tags per post
- OpenGraph support
- Sitemap generation script

---

## Styling

- TailwindCSS
- Centralized design tokens
- Dark mode by default

---

## UI/UX Guidelines

### Design Language

Inspired by [Linear](https://linear.app) — minimal, neutral, precise. No decorative gradients, no heavy shadows, no pill-shaped buttons everywhere.

### Principles

- **Flat over glossy** — surfaces use subtle fills (`var(--surface)`), not gradients or glow effects
- **Less radius** — use `rounded-md` (6px) for controls, `rounded-xl` (12px) for cards. Never `rounded-full` on interactive elements unless it is a pure icon button
- **Restrained color** — only one accent color (`--violet`). Use it for links, active states, and primary CTAs only
- **No decorative animations** — entry animations are subtle (`rise-in`: 8px Y, 450ms). No parallax, no blur-in, no bounce
- **Typography hierarchy** — display headings use Fraunces serif (`.heading-serif`); all UI text uses Inter Variable

### Design Tokens (CSS variables)

Always use these tokens. Never hardcode colors.

| Token | Purpose |
|---|---|
| `--bg` | Page background |
| `--bg-subtle` | Alternate section background |
| `--surface` | Card / input fill |
| `--surface-hover` | Hover state fill |
| `--line` | Default border / divider |
| `--line-strong` | Emphasized border |
| `--ink` | Primary text |
| `--ink-2` | Secondary text |
| `--ink-3` | Tertiary / placeholder text |
| `--violet` | Accent — links, active, primary CTA |
| `--violet-subtle` | Accent background (tags, badges) |
| `--violet-border` | Accent border |
| `--header-bg` | Navbar background (with opacity) |

### Dark / Light Mode

- System-aware by default (`auto`), user-overridable via ThemeToggle
- Dark background: `#0f0f10` — near-black, not pure black
- Light background: `#ffffff` with `#fafafa` for subtle sections
- Tokens flip automatically; **never write light/dark conditional classes** in components

### Typography

- **Display headings**: `heading-serif` class → Fraunces, `letter-spacing: -0.02em`
- **Body**: Inter Variable, `15px`, `line-height: 1.65`
- **Section labels**: `section-label` class → 11px, uppercase, `--ink-3`
- **Prose content**: `editorial-prose` class wrapping rendered Markdown HTML

### Components

#### Buttons

```tsx
// Primary CTA
<a className="rounded-lg bg-[var(--violet)] px-4 py-2 text-sm font-medium text-white">
  Label
</a>

// Secondary / ghost
<a className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink-2)] hover:bg-[var(--surface)]">
  Label
</a>
```

#### Cards

```tsx
// Use .blog-card CSS class — do not inline card styles
<article className="blog-card">…</article>
<article className="blog-card blog-card-featured">…</article>
```

#### Tags / Badges

```tsx
// .tag-pill — small inline badge (violet tint)
<span className="tag-pill">{tag}</span>

// .tag-filter — clickable filter chip
<a className={active ? 'tag-filter is-active' : 'tag-filter'}>All posts</a>
```

#### Navigation links

```tsx
// Use .nav-link CSS class; add is-active for current route
<Link className="nav-link" activeProps={{ className: 'nav-link is-active' }}>
  Page
</Link>
```

### Layout

- Max content width: `960px` via `.page-wrap`
- Page padding: `px-4 pb-24 pt-14`
- Section separator: `<div className="my-10 h-px bg-[var(--line)]" />`
- Prose max-width: `max-w-[720px]`

### Spacing & Radius Reference

| Use case | Radius |
|---|---|
| Control (button, input, locale chip) | `rounded-md` = 6px |
| Card / panel | `rounded-xl` = 12px |
| Icon-only button | `rounded-md` |
| Tag pill | `rounded` = 4px |

### What to Avoid

- ❌ `rounded-full` on text buttons
- ❌ Hardcoded hex colors in components — use tokens
- ❌ `box-shadow` with colored glows
- ❌ Background gradients on surfaces
- ❌ Old teal/green token names (`--sea-ink`, `--lagoon`, `--chip-bg`, etc.) — these are removed

---

## Extensibility Roadmap

- [ ] Comments (e.g. Giscus)
- [ ] Optional CMS (e.g. Sanity)
- [ ] Full-text search
- [ ] RSS feed
- [ ] Analytics

---

## Coding Standards

- Strict TypeScript
- Functional components only
- Small, pure functions
- Feature-based architecture

---

## Git Workflow

- main → production
- dev → integration
- feature/\* → new features

---

## Commands

```bash
bun install
bun dev
bun build
bun start
```

---

## Principles

- Simplicity over over-engineering
- Performance by default
- Server-first mindset
- Developer experience matters as much as user experience

---

## Notes for Agents

- Always prioritize SSR
- Avoid unnecessary libraries
- Prefer TanStack ecosystem solutions
- Componentize without overengineering
- Markdown is the single source of truth for content

---
