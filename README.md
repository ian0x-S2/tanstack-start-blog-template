# Northstar Journal

Minimal blog built with TanStack Start, React 19, TypeScript, and Markdown.

## Overview

- Markdown posts in `content/posts`
- Routes powered by TanStack Router
- Styling with Tailwind CSS v4
- Ready for Cloudflare Workers deployment

## Requirements

- Bun

## Getting Started

```bash
bun install
bun run dev
```

## Scripts

```bash
bun run dev
bun run build
bun run preview
bun run test
bun run lint
bun run format
bun run check
bun run deploy
```

## Content

Each post should use this frontmatter:

```md
---
title: "Título do post"
date: "2026-03-21"
description: "Resumo curto"
tags: ["design", "product"]
published: true
---
```

Files in `content/posts` become routes at `/blog/:slug`.

## Structure

- `src/routes` - application routes
- `src/components` - UI and blog components
- `src/lib/content` - post parsing and rendering

## License

Starter project for use and customization.
