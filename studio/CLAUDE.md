# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Sanity v3 Content Studio for "Director Jmills", a portfolio website for a film director. The studio manages content for a portfolio site featuring work items (films/videos), an about/contact page, a home page, a work page, and a stills page.

**Project Configuration:**
- Project ID: `lm6942hb`
- Dataset: `production`
- Sanity Version: v3 (upgraded from v2 on January 23, 2026)

## Development Commands

```bash
# Start the Sanity Studio development server
npm run dev

# Build the studio for production
npm run build

# Deploy studio
npm run deploy
```

## Architecture

### Sanity v3 Configuration

This project uses Sanity v3's modern configuration system:

- **Configuration:** `sanity.config.ts` defines project settings, plugins, and schema
- **Schema Registration:** Schemas exported from `schemas/index.ts`
- **Structure:** Custom desk structure in `structure/index.ts`

### Schema Structure

All schemas are located in `/schemas/`:

- **index.ts** - Main schema export file
- **Document Types:**
  - `homePage` - Landing page with SEO, poster image, and Vimeo video ID
  - `aboutPage` - Contact/bio page with photo, bio, representation, and awards sections
  - `workPage` - Work portfolio listing page
  - `stillsPage` - Photography/stills gallery page
  - `workItem` - Individual work/film entries (the main content type)
- **blockContent** - Reusable rich text field definition with headings, links, bullet lists, and embedded images

All schemas use `defineType` and `defineField` from Sanity v3.

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

**Structure Tool:** Custom desk structure in `structure/index.ts` provides:
- Singleton pages for Home, Work, and Contact pages
- Ordered work items list (sorted by `order` field ascending)
- Document type filtering

**Plugins:**
- `sanity/structure` - Desk tool for content management
- `@sanity/vision` - GROQ query playground
- `sanity-plugin-media` - Enhanced media library (v3 compatible)

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

### Manual Document Ordering
Work items use a manual `order` field (number type, hidden in UI). The desk structure sorts work items by this field in ascending order. Users set numeric values directly in documents to control display order.

### Preview Configurations
Document types include custom preview configurations in their `prepare()` functions. For example, `workItem` combines client name and title in the preview.

## Important Notes

- This is a **Sanity v3** project using React 18
- TypeScript is configured but schemas are still in `.js` format
- Work items use an `order` field (hidden) for manual sorting
- Media library plugin provides enhanced asset management

## Migration History

**Migrated from v2 to v3 on January 23, 2026:**
- Converted from `sanity.json` to `sanity.config.ts`
- Migrated all schemas to use `defineType`/`defineField`
- Upgraded React 17 → 18
- Removed plugins: `sanity-plugin-order-documents`, `sanity-plugin-dashboard-widget-vercel`, `@sanity/google-maps-input`
- Upgraded `sanity-plugin-media` to v3 compatible version
- Removed parts system
- Created custom desk structure for singleton pages and ordering
