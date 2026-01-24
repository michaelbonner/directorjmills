# Director Jmills Sanity Studio (v3)

This is the Sanity Studio for Director Jmills, a portfolio website for a film director. The studio manages content for work items (films/videos), pages, and image galleries.

## Sanity v3

This studio uses Sanity v3 with React 18.

## Development

```bash
npm run dev
```

The studio will be available at http://localhost:3333

## Build

```bash
npm run build
```

## Deploy

```bash
npm run deploy
```

## Content Management

### Work Items

Work items (films/videos) use the `order` field for display order. Set numeric values to control the positioning in the frontend.

### Media Library

Images are managed through the Media Library plugin. Access it through the asset picker in any image field.

## Migration Notes

Migrated from Sanity v2 to v3 on January 23, 2026.

- Backup available: `backup-pre-v3-migration.tar.gz`
- Removed plugins: dashboard-widget-vercel, order-documents, google-maps-input
- Upgraded plugins: sanity-plugin-media to v3
- Manual ordering preserved via `order` field

## Resources

- [Read "getting started" in the docs](https://www.sanity.io/docs/introduction/getting-started)
- [Join the community Slack](https://slack.sanity.io/)
- [Extend and build plugins](https://www.sanity.io/docs/building-plugins)
