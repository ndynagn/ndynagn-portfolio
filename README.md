# ndynagn portfolio

A bilingual personal portfolio built with Next.js App Router, React Compiler,
strict TypeScript, Tailwind CSS v4, shadcn/ui (new-york/Radix) and Motion.
The initial home is an explicit technical placeholder; real CV and case studies
are intentionally absent. Visual design and editorial content are a later phase.

## Getting started

Use Node.js 24 or newer and the pinned pnpm 12.9.1.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open [localhost:3000](http://localhost:3000). `/` permanently redirects to `/ru`.
Both `/ru` and `/en` are available. Unsupported locales and unavailable project
translations return 404. Language links retain a case when its translation is
published and otherwise lead to that language's home. The root HTML layout lives
under `[locale]` to render the correct `lang` without a client-side patch.
Home locales and published cases are prerendered with `generateStaticParams` and
`dynamicParams = false`; unknown slugs return an actual HTTP 404, including with an
empty catalogue. Cache Components and Partial Prefetching are disabled because
Next.js 16.4 does not support `dynamicParams = false` with Cache Components and
streaming missing cases returned HTTP 200 in verification. React Compiler remains enabled.

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

`format` and `format:check` accept explicit paths; without paths they cover the
project. Formatting is separate from build. Native Node tests cover analytics
initialization, navigation deduplication, events, provider failures and SEO origin
validation. Server-only tests use the `react-server` export condition.
`next/font` downloads the existing Geist fonts at build time; network access is
required for the first uncached production build. There is no CI/CD or hosting setup.

## Ownership and content

- `src/app`: routing, layouts, metadata routes and composition.
- `src/features/content`: readonly content models, records and server lookups.
- `src/features/portfolio`: server-rendered home and case presentation.
- `src/shared`: UI, animation, i18n, SEO and browser analytics.

Read the root and applicable local `AGENTS.md` files before changing an area.
Rules and documentation live in Git; no ignored local standards are required.

Edit `src/features/content/records.ts` to add approved public material. Contracts
are in `models.ts`. Profile is initially `null`; experience, links and projects are
empty. Do not add fictional examples. Keep UI copy in the typed RU/EN dictionaries
under `src/shared/i18n`; content translations stay in the content feature.

- Profile translations contain the public name, headline, summary and an optional
  local CV download path. Put approved downloadable files under `public/`.
- Experience records separate common organization/period data from translated
  role descriptions. Social links have a shared destination and localized labels.
- Projects have a stable, unique lower-kebab-case slug, kind (`professional` or
  `pet`), technologies and optional website/source links. Each translation has
  a title, summary, text sections and an explicit `published` flag.
- A published project appears on the localized home and at
  `/{locale}/projects/{slug}`. Missing/unpublished translations are not available.
  Text is rendered as escaped React content, not executable MDX or raw HTML.
- Rebuild to publish repository content. Only approved public material belongs
  here, including any unpublished translations: do not commit private drafts.

No CMS, database, authentication, network data client or global state is installed.

## Selected integration standards

Technology selection does not mean a package is installed. The following libraries
are selected for future consumers; none is installed by this documentation update.
Install the relevant dependency with the first real implementation and confirmed
contract rather than adding providers, adapters or empty layers in advance.

| Responsibility                                  | Selected library               |
| ----------------------------------------------- | ------------------------------ |
| Backend transport                               | Axios                          |
| Client server data, cache and network mutations | TanStack Query                 |
| Editable values, field state and submission     | TanStack Form                  |
| External payload and form validation            | Zod; forms use Standard Schema |

App Router remains the router; local UI state belongs to React and derived values
are computed. Do not automatically add React Hook Form, TanStack Router, another
HTTP client or a global state manager. Repository content and existing vendor SDKs
do not require this backend stack.

Read [source conventions](src/AGENTS.md) for model construction and
[feature rules](src/features/AGENTS.md) for DTO schemas, explicit mapping, safe API
errors, async lifecycle and state ownership. Transport mechanics belong to shared;
feature contracts own endpoints, authentication, retries, freshness and recovery.
No backend, credentials or error response format is selected by these standards.

## UI and animation

`components.json` maps shadcn primitives to `src/shared/ui`. Generate additional
components with `pnpm exec shadcn add <component>`, review the diff and format the
affected files. The generator may import the npm `cn` package; use the local
`@/shared/ui/cn` helper instead and remove an added duplicate dependency.

Semantic neutral tokens follow the OS light/dark theme. No theme picker is included.
MotionSurface is a narrow client wrapper around server-rendered content with an
optional hover transform and `reducedMotion="user"`. Content starts visible and
navigation works without JavaScript. Use CSS for simple transitions and Motion for
coordinated effects. Preserve reduced motion, visible focus and native scrolling.

## SEO configuration

Set `SITE_URL` to the real public HTTP(S) origin, without credentials, a path,
query or fragment. Unset/local development origins produce no public canonical,
language alternatives, OG URL or sitemap records; malformed origins fail explicitly.

The technical home stays `noindex` until a profile translation is published.
Published pages with a configured public origin get canonical, language alternatives
and Open Graph metadata. Sitemap entries include only published translations;
there are no fabricated case URLs or structured data. `robots.txt` allows crawling
so crawlers can read each page's `noindex`; it advertises the sitemap only with
a configured public origin. OG artwork and final SEO copy belong to the design/content phase.

## Yandex Metrica

Set `NEXT_PUBLIC_YANDEX_METRIKA_ID` to a positive numeric counter ID **before building**.
This is a public identifier, not an API secret. Without a valid ID, or during
development, no analytics script or queue is created. Changing build-time public
configuration requires a rebuild.

The tag loads after hydration, initializes once per document with `defer: true`,
and receives explicit pathname pageviews (no query/hash). Repeated React effects
are deduplicated; leaving and returning to a page counts as another visit.
Webvisor, click maps and automatic outbound-link tracking are disabled. A failed
tag does not break the page or block links. Ad-blocked visits may not be measured.

`trackEvent` in `src/shared/analytics/browser.ts` is the typed API for future client
handlers: `cv_download`, `project_open`, `contact_click`. It accepts only the
declared locale/slug/link-ID fields; never add contact data or arbitrary query values.
The current scaffold has no real CV/contact targets and does not fabricate goals.
Create the corresponding goals in the real counter when these handlers are added.

For integration acceptance, run a production build with the counter ID, check
initial load, client navigation, return visits and a blocked tag, then confirm
receipt in the actual Metrica dashboard. Unit/transport checks do not establish
dashboard delivery. Real-counter verification remains pending until an ID is supplied.
