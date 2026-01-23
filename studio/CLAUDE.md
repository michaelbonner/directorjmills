# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Sanity v2 Content Studio for "Director Jmills", a portfolio website for a film director. The studio manages content for a portfolio site featuring work items (films/videos), an about/contact page, a home page, a work page, and a stills page.

**Project Configuration:**
- Project ID: `lm6942hb`
- Dataset: `production`
- Sanity Version: v2 (legacy version using the `part:` system)

## Development Commands

```bash
# Start the Sanity Studio development server
npm start

# Build the studio for production
npm build

# Deploy schema changes to Sanity (v2 CLI)
npx sanity@latest schema deploy
```

## Architecture

### Sanity v2 Parts System

This project uses Sanity v2's legacy "parts" system (not the modern v3 API). Key characteristics:

- **Parts Resolution:** Imports use `part:` syntax (e.g., `part:@sanity/base/schema-creator`)
- **Configuration:** `sanity.json` (not `sanity.config.ts`) defines project settings and parts
- **Schema Registration:** Schemas are registered via the parts system in `sanity.json` pointing to `./schemas/schema`

### Schema Structure

All schemas are located in `/schemas/`:

- **schema.js** - Main schema registration file that imports and combines all document types
- **Document Types:**
  - `homePage` - Landing page with SEO, poster image, and Vimeo video ID
  - `aboutPage` - Contact/bio page with photo, bio, representation, and awards sections
  - `workPage` - Work portfolio listing page
  - `stillsPage` - Photography/stills gallery page
  - `workItem` - Individual work/film entries (the main content type)
- **blockContent** - Reusable rich text field definition with headings, links, bullet lists, and embedded images

### Work Item Schema

The `workItem` document type is the core content model for portfolio pieces:

- Required kebab-case slug validation (lowercase, numbers, hyphens only)
- Vimeo video integration via video ID
- Configurable aspect ratios (width/height from 1-16)
- Short hover clips (mp4 and ogv formats)
- Poster image with hotspot support
- Credits array (sortable role/value pairs)
- SEO fields (title, description)
- Order field for manual sorting (hidden in UI)

### Custom Integrations

**Dashboard:** Configured in `dashboardConfig.js` with Vercel deployment widget

**Asset Sources:** Custom asset source in `parts/assetSources.js` using `sanity-plugin-media` for media library management

**Plugins:**
- `@sanity/google-maps-input` - Maps input
- `@sanity/dashboard` + `sanity-plugin-dashboard-widget-vercel` - Dashboard with Vercel deployments
- `sanity-plugin-media` - Enhanced media library
- `sanity-plugin-order-documents` - Manual document ordering

## Schema Patterns

### Vimeo Video Integration
Videos use a `video_id` string field. The ID is extracted from URLs like:
```
https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479
```

### Slug Validation
The `workItem` schema includes custom kebab-case validation:
```javascript
validation: (Rule) =>
  Rule.required().custom((slug) => {
    if (!slug || !slug.current) {
      return "Slug is required";
    }
    const kebabCasePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!kebabCasePattern.test(slug.current)) {
      return "Slug must be in kebab-case format...";
    }
    return true;
  })
```

### Preview Configurations
Document types include custom preview configurations in their `prepare()` functions. For example, `workItem` combines client name and title in the preview.

## Important Notes

- This is a **Sanity v2** project - API patterns differ significantly from v3
- The studio uses React 17 and styled-components v5
- TypeScript config is only for editor support; transpilation is handled by Babel
- No test suite is currently configured
- Work items use an `order` field (hidden) for manual sorting via the order-documents plugin

## Upgrading Considerations

If upgrading to Sanity v3:
- Replace `sanity.json` with `sanity.config.ts`
- Convert `part:` imports to direct ESM imports
- Update schema definitions to use `defineType` and `defineField`
- Update plugins to v3-compatible versions
- Migrate from `@sanity/base` to `sanity` package
