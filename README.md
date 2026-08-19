# Basecase · IT consulting & build studio

Next.js 14 (App Router) + Prisma. Implements the design prototype
`Basecase Website.dc.html` from the Claude Design project
[57357cfd](https://claude.ai/design/p/57357cfd-a778-451f-972f-b931ddbcd380).

## Run it

Storage is **Neon Postgres** (free tier), so there is no local database file — dev and
prod both talk to Neon. Create a project at [neon.com](https://neon.com), then:

```bash
npm install
# put your two Neon strings in .env (see the comments in that file)
npx prisma db push     # creates the Brief table
npm run dev            # http://localhost:3000
```

To keep test submissions out of production data, create a **branch** in the Neon
dashboard and point your local `.env` at the branch string instead of `main`.

The prototype's five views map to real routes: `/`, `/services`, `/about`,
`/contact`, `/admin/briefs`.

## File map

```
app/
  layout.jsx              root shell: fonts, nav, footer, LocalBusiness JSON-LD
  globals.css             design tokens + every component style
  page.jsx                / home (hero, capabilities, catalog teaser, process, why, CTA)
  services/page.jsx       /services core capabilities + filterable catalog
  about/page.jsx          /about origin story + "what that buys you"
  contact/page.jsx        /contact intake form
  admin/briefs/page.jsx   /admin/briefs inbox (server-rendered from Prisma)
  admin/briefs/clear/     DELETE clear-all — under /admin so basic auth covers it
  api/briefs/route.js     POST only — the public intake endpoint, write-only
  sitemap.js robots.js    SEO endpoints
components/
  Nav.jsx                 client: sticky nav + mobile drawer
  Footer.jsx
  ServiceGrid.jsx         SVC-01…SVC-06 spec cards
  Catalog.jsx             client: filter pills + grouped chips
  IntakeForm.jsx          client: validation, POST, confirmation state
  BriefsTable.jsx         client: search, CSV export, two-click clear all
lib/
  data.js                 all site content (services, catalog, steps, contact details)
  validate.js             shared client/server validation + reference generator
  prisma.js               Prisma singleton
  notify.js               emails each new brief via Resend (best effort, never throws)
  rate-limit.js           in-memory POST limiter (best effort only, see the file)
prisma/schema.prisma      Brief model (services stored as JSON)
middleware.js             HTTP basic auth on /admin/*
```

## Where to edit what

- **Copy and services** → `lib/data.js` (single source for both the site and the form options)
- **Colours, type, spacing** → the `:root` tokens at the top of `app/globals.css`
- **Validation wording** → `MESSAGES` in `lib/validate.js` (used by form and API alike)
- **Reference format** `BC-YYYYMMDD-XXXX` → `makeRef()` in `lib/validate.js`

## Differences from the prototype

Three deliberate departures, all noted inline in the code:

1. **Archivo loads as a variable font** (`axes: ['wdth']`, no `weight`). The display
   type sets `font-stretch` at 112% / 118% / 108% / 70%; pinning static weights would
   drop the `wdth` axis and flatten every heading.
2. **The `LocalBusiness` JSON-LD omits the postal address** while any address field in
   `CONTACT` is still a `[bracketed]` placeholder, rather than publishing junk to
   Google's structured-data index. Fill all five fields in and the block appears.
3. **The /about opening sentence was corrected on the facts.** The prototype reads "We are
   engineers arrived with master's degrees, good overseas experience" — ungrammatical, and
   wrong: the master's degrees were earned at an Australian university, and the professional
   experience is what was gained overseas. Rewritten accordingly. The recursive "no local
   experience without a job requiring local experience" beat is kept, since the whole brand
   rests on it.

`FOUNDERS` exists in the prototype's logic class but is never rendered by its template,
so there is no founder section here either. The founder bios and 4:5 portrait slots
mentioned in the design project's README are still unbuilt on both sides.

## Placeholders to replace

| Where | What |
|---|---|
| `lib/data.js` → `CONTACT.address` | street address (also feeds the JSON-LD, see above) |
| `lib/data.js` → `BUDGETS` | confirm bands against the real pricing floor |
| `lib/data.js` → `SERVICES[].dur` | confirm delivery durations |
| `.env` | `ADMIN_USER` / `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL` |
| `middleware.js` | basic auth is a stopgap; move to a real login before storing client data |
| `app/layout.jsx` | OpenGraph image (add `app/opengraph-image.png`) |

Email and phone are live (`basecase02@gmail.com`, `+61 424090855`), carried over from the
prototype's footer.

## Where the form data goes

`POST /api/briefs` → validate → insert one `Brief` row in Neon Postgres → email the
brief to `BRIEF_TO` via Resend. The database is the source of truth; the email is a
convenience and is allowed to fail silently. `/admin/briefs` server-renders straight
from Postgres on every request, and its "Download CSV" button exports whatever the
search box is currently showing.

## The security boundary

One rule: **anything that reads or deletes briefs lives under `/admin/`**, which
[middleware.js](middleware.js) gates with basic auth. The single exception is
`POST /api/briefs`, which is write-only and must stay public so the contact form works
for visitors.

| Endpoint | Auth | Method |
|---|---|---|
| `/api/briefs` | none, by design | `POST` only — 405 for anything else |
| `/admin/briefs` | basic auth | inbox UI |
| `/admin/briefs/clear` | basic auth | `DELETE` clear-all |

An earlier version exposed `GET` and `DELETE` on `/api/briefs` with no auth at all,
which let anyone dump every lead or wipe the table. If you add an endpoint that returns
brief data, put it under `/admin/` — a sibling path is not covered, and browsers also
won't forward the cached basic-auth credentials to one.

## Deploying to Vercel

**1. Database.** Vercel dashboard → Storage → Neon. It provisions the database and
injects connection strings into the project. Map them in Settings → Environment
Variables so Prisma sees the names it expects:

| Prisma expects | Set it to |
|---|---|
| `DATABASE_URL` | the **pooled** string (host contains `-pooler`), with `?sslmode=require&pgbouncer=true&connect_timeout=15` |
| `DIRECT_URL` | the **unpooled** string, with `?sslmode=require` |

Getting these backwards is the classic failure: an unpooled `DATABASE_URL` will run
fine in testing and then exhaust Postgres connections under concurrent traffic.

**2. Create the table**, once, from your machine with the deploy env loaded:

```bash
npx prisma db push
```

**3. Remaining environment variables:**

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | from [resend.com](https://resend.com) → API Keys |
| `BRIEF_TO` | `basecase02@gmail.com` |
| `BRIEF_FROM` | leave unset until a domain is verified (see below) |
| `ADMIN_USER` / `ADMIN_PASSWORD` | the `/admin/briefs` gate — **change these** |
| `NEXT_PUBLIC_SITE_URL` | the real https URL, e.g. `https://basecase.com.au` |

`npm run build` already runs `prisma generate` first, which Vercel requires — its
dependency cache would otherwise serve a stale client after a schema change.

### Resend: the one gotcha

Until you verify a sending domain, Resend only allows `onboarding@resend.dev` as the
sender, **and it will only deliver to the email address the Resend account was opened
with**. So either open the account with `basecase02@gmail.com`, or verify a domain and
set `BRIEF_FROM` to something like `Basecase <briefs@yourdomain.com>`. If
`RESEND_API_KEY` is unset the send is skipped cleanly and the brief still saves.

## Production notes

- **Neon's free compute autosuspends after 5 minutes idle.** The first request after a
  quiet period pays roughly a second of wake-up. Free tier is 0.5 GB and 100 CU-hours
  per month, far beyond what an intake form uses.
- **`lib/rate-limit.js` does not really work on Vercel.** It counts in one instance's
  memory, and Vercel runs many. It stops accidental double-submits, not spam. Back it
  with Vercel KV / Upstash Redis if the form starts attracting bots.
- **Nothing throttles or captchas the form beyond that**, so if spam appears, that is
  the first thing to add.
- `middleware.js` is HTTP basic auth. It is fine for keeping the inbox private, but it
  is not a real login — replace it before storing client data you would mind leaking.
- Fonts load through `next/font` (self-hosted at build time), so there is no render-blocking request and no layout shift.
