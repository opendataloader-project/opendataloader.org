# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (monorepo-wide)
pnpm install

# Development
pnpm dev --filter v1          # Start Next.js dev server on localhost:3000
pnpm v1 dev                   # Shorthand for above

# Build & Type Check
pnpm build                    # Full monorepo build via Turborepo
pnpm check-types              # TypeScript type checking
pnpm v1 types:check           # Type check with fumadocs-mdx generation

# Lint & Format
pnpm lint                     # ESLint check
pnpm format                   # Prettier format all .ts/.tsx files
```

## Architecture

**Monorepo Structure**: Turborepo + pnpm workspaces. Single app: `apps/v1` (Next.js 16 marketing + docs site).

**Tech Stack**:
- Next.js 16 (App Router) + React 19 + TypeScript 5.9 (strict mode)
- Tailwind CSS 4 + shadcn/ui (Radix primitives)
- Fumadocs for documentation (`content/docs/*.mdx` → `/docs/:slug`)
- Jotai for state management (cookie consent, UI state)
- react-pdf for PDF viewing, Framer Motion for animations

**Key Paths in apps/v1**:
```
src/
├── app/                      # Next.js App Router
│   ├── (home)/              # Marketing homepage (route group)
│   │   └── _components/     # Page-specific components
│   ├── docs/[[...slug]]/    # Fumadocs pages
│   ├── demo/                # PDF demo viewer
│   └── api/                 # API routes (contact, search)
├── components/
│   ├── ui/                  # shadcn/ui primitives
│   └── features/            # Domain components (cookie-consent, tracking, viewers, layout)
├── store/atoms/             # Jotai atoms
├── lib/                     # Utilities (tracking, samples, utils)
└── types/                   # TypeScript types
content/docs/                # MDX source files for documentation
public/figures/              # Static assets for docs
```

**Conventions**:
- Route-specific components go in `_components/` folders next to their page
- Server Components by default; add `"use client"` only for interactivity
- Path alias: `@/*` → `./src/*`
- Import order enforced by Prettier: React → Next → 3rd party → workspace → types → local

## Environment Variables

- `RESEND_API_KEY` - Required for `/api/contact` route. Build will fail without it.
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

## Documentation Authoring

MDX files in `content/docs/` are auto-mapped to `/docs/:slug`. Frontmatter requires `title` and `description`. Sidebar order controlled by `content/docs/meta.json`. Assets go in `public/figures/` with absolute paths (`/figures/image.png`).
