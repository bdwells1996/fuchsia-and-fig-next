# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start Next.js dev server (port 3000)
pnpm build            # Production build
pnpm lint             # Run ESLint
pnpm storybook        # Start Storybook on port 6006
pnpm build-storybook  # Build static Storybook
```

Sanity Studio is accessible at `/studio` when the dev server is running.

## Architecture

This is a **Next.js 16 + Sanity CMS** project using the App Router. The brand is "Fuchsia & Fig".

### Key directories

- `src/app/` — Next.js App Router pages and root layout
- `src/app/studio/` — Embedded Sanity Studio at `/studio` route
- `src/components/` — Shared UI components (Button, Logo, Nav)
- `src/config/` — Static config (nav links)
- `src/sanity/` — All Sanity integration code
  - `sanity/env.ts` — Environment variable validation
  - `sanity/lib/` — Client, live data hook, image URL builder
  - `sanity/schemaTypes/` — Document type definitions
  - `sanity/structure/` — CMS navigation structure
- `src/stories/` — Storybook stories (excluded from TypeScript compilation)
- `.storybook/` — Storybook configuration

### Sanity integration

Environment variables required:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (defaults to current date)
- `SANITY_API_READ_TOKEN` (server-side only)

The root layout (`src/app/layout.tsx`) includes `SanityLive` for real-time content updates. Next.js Image is configured to allow `cdn.sanity.io` as a remote hostname.

Current schema: `collection` — gallery/image collections with title, slug, cover image, and images array.

### Design system

All design tokens and component styles live in `src/app/globals.css`. This is a substantial CSS file (~1000+ lines) with:

- **Color palettes**: Sage, Fig, Violet, Bloom (50–950 scales) plus semantic colors, text colors, surface colors, and borders — all as CSS custom properties
- **Typography**: Abril Fatface (display), Quicksand (headings/body), Geist Mono (code) — loaded via `next/font/google`
- **Component layer**: Utility classes for buttons, cards, forms, badges, navigation, prose, skeletons, avatars, chips, tooltips
- **Animations**: fade-in, fade-up, fade-down, scale-in, bloom-pulse, shimmer keyframes
- **Gradient/shadow utilities**: bloom, fig, sage, violet, brand, hero variants
- **Layout containers**: `container-site` (max 1280px), `container-narrow` (max 768px)

When building new components, use these CSS custom properties and component layer classes rather than hardcoding values.

### Storybook

Storybook uses the `@storybook/nextjs` framework. The preview (``.storybook/preview.tsx`) injects font CSS variables via a `withFonts` decorator and imports `globals.css`, so design system styles are available in stories. The `src/stories/DesignSystem.stories.tsx` file is a comprehensive living reference of all design tokens and components.

### Path alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

### Tooling

- **Linting**: ESLint with flat config (`eslint.config.mjs`) + Biome (`biome.json` if present)
- **Styling**: Tailwind CSS v4 via PostCSS — no `tailwind.config` file; configuration is in CSS
- **No test framework** is configured
