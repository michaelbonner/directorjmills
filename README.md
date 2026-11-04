# Director Jmills Site

The project is built in 2 parts

1. `web` - The public website
1. `studio` - The Sanity CMS

## Public site

Built using Next.js, consumes data from Sanity

### Working on the public site

- Log in to Santiy and get an API token for the [Director Jmills project](https://directorjmills.sanity.studio/)
- `cd` in to web
- Run `cp .env.example .env.local`
- Paste your token in the appropriate place
- Run `npm run dev`

### Deploying your changes to the public site

- Push your code to `master` and wait about a minute for Vercel to build it

### How content changes go live

Pages are cached by Next.js. When a document is published in the CMS, a Sanity webhook POSTs to `/api/revalidate`, which clears the cache so the next visitor sees the new content.

- Webhook: [sanity.io/manage](https://www.sanity.io/manage/project/lm6942hb/api/webhooks) → URL `https://jeremymillerdirector.com/api/revalidate`, dataset `production`, trigger on create/update/delete, with a secret
- The same secret must be set as `SANITY_REVALIDATE_SECRET` in Vercel

## Sanity CMS

We are using Sanity's CMS to power the content creation process.

### Working on the Sanity CMS

- `cd` in to studio
- Run `sanity login`
- Run `npm run start`

### Deploying your changes to the CMS

- `cd` in to studio
- Run `sanity deploy`
