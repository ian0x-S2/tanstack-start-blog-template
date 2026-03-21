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
