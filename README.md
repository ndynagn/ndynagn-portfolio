# ndynagn portfolio

A bilingual personal portfolio built with Next.js App Router, React Compiler,
strict TypeScript, Tailwind CSS v4, shadcn/ui (new-york/Radix) and Motion.
The public home and project catalogue compose the migrated UI kit in Russian and
English. Eight published projects link to server-rendered text case studies;
the full visual case-page and gallery composition remains a later phase.

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
validation, plus CSS lint policy boundaries. Server-only tests use the `react-server`
export condition.
The package declares ES modules for native Node tests and tooling; linting rejects
warnings as well as errors.
`next/font` downloads the existing Geist fonts at build time; network access is
required for the first uncached production build. There is no CI/CD or hosting setup.

## Ownership and content

- `src/app`: routing, layouts, metadata routes and composition.
- `src/features/content`: readonly content models, records and server lookups.
- `src/features/portfolio`: server-rendered home and case presentation.
- `src/shared`: UI, animation, i18n, SEO and browser analytics.

Read the root and applicable local `AGENTS.md` files before changing an area.
Rules and documentation live in Git; no ignored local standards are required.

Edit `src/features/content/portfolio.json` to add approved public material, including
through GitHub's file editor. Rebuild to publish changes; visitors never request
GitHub. `records.ts` validates JSON server-side with Zod. Invalid fields, duplicate
IDs/slugs and missing featured references fail the build with a field path.
Application contracts are in `models.ts`. Keep UI copy in typed RU/EN dictionaries
under `src/shared/i18n`; editorial translations stay in JSON. A null profile and
empty collections remain valid and never synthesize public facts.

- Profile translations contain the public name, headline, summary and an optional
  local CV download path. Put approved downloadable files under `public/`.
- Experience records separate common organization/period data from translated
  role descriptions. Social links have a shared destination and localized labels.
- Projects have a stable, unique lower-kebab-case slug, kind (`professional` or
  `pet`), technologies and optional website/source links. Each translation has
  a title, summary, text sections and an explicit `published` flag.
- A published project appears in the localized catalogue and at
  `/{locale}/projects/{slug}`; the home uses the explicit featured selection. Missing/unpublished translations are not available.
  Text is rendered as escaped React content, not executable MDX or raw HTML.
- Rebuild to publish repository content. Only approved public material belongs
  here, including any unpublished translations: do not commit private drafts.

The catalogue is at `/{locale}/projects`. Its native GET form uses
`?category=all|commerce|service`; unknown or repeated values select all projects.
Filtering renders on the server and works without JavaScript. App Router owns
enhanced history and server requests; existing Motion components animate cards.
Categories are independent of professional/pet. Counts include only published
translations. `featuredSlugs` explicitly owns the home selection and order.

The supplied CV updated on 20 October 2026 replaces the previous PDF at
`/documents/gennady-nagibin-resume.pdf` byte-for-byte. It is Russian in both site
locales. SMD employment ended in October 2026; there is no current-workplace badge.
University graduation is expected in 2028. Public roles use Middle positioning
and conservative CV contribution claims. The architectural photo keeps its credit;
project screenshots and their OOMI/Potlucky provenance remain unchanged.

No CMS, database, authentication, network data client or global-state library is installed.
Zod validates repository JSON; no browser form or backend transport is introduced.

## Selected integration standards

Technology selection does not mean a package is installed. Zod has its first real
consumer in repository JSON validation; the other libraries remain selected for
future consumers.
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

Read [styling rules](src/styling-rules.md) before changing styles, UI or animation.
Tailwind is the default; colocated plain CSS Modules own complex local effects.
Global CSS owns imports, semantic tokens, themes and base accessibility. Modules
use the components layer and bypass the Tailwind loader; they consume CSS variables
without importing global CSS or using Tailwind directives. No preprocessor or
runtime styling library is required.

`pnpm lint` runs `pnpm lint:js` (ESLint) and `pnpm lint:css` (Stylelint) sequentially.
Stylelint checks CSS syntax, naming, duplicates, nesting, specificity, important
declarations and explicit typography units, with Tailwind and CSS Module syntax
handled explicitly. Prettier owns indentation, wrapping and whitespace; declaration
grouping remains a review rule. None of these check commands rewrites files.
Stylelint does not inspect JSX utilities/inline styles, resolve cross-file tokens,
or replace browser checks of layout, accessibility and compatibility. Scoped lint
exceptions require a reason and must remain necessary. For a focused CSS check:

```bash
pnpm exec stylelint src/app/globals.css --max-warnings 0
```

`components.json` maps shadcn primitives to `src/shared/ui`. Generate additional
components with `pnpm exec shadcn add <component>`, review the diff and format the
affected files. The generator may import the npm `cn` package; use the local
`@/shared/ui/cn` helper instead and remove an added duplicate dependency.

The visual foundation provides local Manrope, semantic light/dark design tokens,
native frosted materials, one document theme owner and scoped animation mechanisms.
The OS is the default. A saved explicit choice is applied before paint; denied
storage keeps the current document usable. Public navigation reuses ThemeToggle.

The page header owns document scroll observation and active sections; the kit's
local scrollers remain independent. Native anchors retain focus and no-JS behavior.
PageRuntime enhances explicit route links and cards with the existing 600/650ms
cover/reveal sequence. It waits for route commit before reveal, bounds that wait,
and shares the theme transition lock. Reduced motion/coarse pointers use ordinary
navigation. Preference changes, hidden documents, history and unmount clean up the
effect; modified clicks, downloads and external links retain native behavior.
The adapter delegates the declared analytics actions without sending contact values.

With `pnpm dev`, open `/ru/design-system` or `/en/design-system` for the technical
workbench. It demonstrates glass/photo/theme combinations, opaque fallback, actual
image-load failure, cursor modes, local cover/reveal, measured indicator/scroll
progress, Motion filtering, hover/focus and local scroll snap. The route returns
HTTP 404 in production and is not part of the sitemap or public navigation.
Read [the style integration map](docs/style-integration.md) for source ownership,
parameters, adaptations, compatibility and the complete selector inventory.

GlassSurface preserves complete source recipes: surface/badge use 24px blur with
1.3 saturation; control uses 15px without added saturation or shadows. Badge uses
the original #a0a19755 tint, border and shadows. Consumers own text contrast,
geometry and solid-fallback ink. The workbench compares all three materials over
photo/page/contrasting backdrops; background text makes blur visible. A failed
decorative matrix photo reveals a readable solid backing. No universal blur radius,
new material API or animation mechanism is introduced.

The supplied 88 resources are byte-identical in `public`, inventoried separately in
`src/features/content/design-assets.ts` with size/SHA-256. They do not publish
profile/project records. Preserve Manrope OFL and image provenance, including the
OOMI/Potlucky distinction. Public originals are excluded from formatting.

shadcn/Radix is used for complex real controls needing focus, Escape, portals or
keyboard contracts, and other primitives with a demonstrated benefit. Styling,
glass, typography, layout, cursor and animation do not require shadcn wrappers.
The first UI-kit increment adds Button pill/round variants and native TextLink
variants at `/ru/design-system#buttons-links` (also available in EN). Tab and hover
show interactive states; disabled examples, wrapping labels, circular sizes and
the existing 15px control material are included. Theme actions belong to the demo.
Motion uses the source ease curve, including orb's 400ms rotation and the links'
300ms movement. New controls use a 2px focus outline with a 7px offset; native
disabled buttons retain hit testing without hover feedback or animation.
The labels increment at `/ru/design-system#labels` (also in EN) adds static
technology tags, contextual status dots, current-workplace labels and FlutterBadge.
These are source fixtures, not published profile facts. FlutterBadge reuses the
existing badge material; the photo demo owns placement, failure and opaque mode.
Its two-line caption is fully opaque for readable fallback contrast, and rem-based
circle dimensions support text enlargement. Other UI-kit components and page
composition remain later stages. No dependency
was added, and the CSS loader remains unchanged.

The navigation increment is at `http://localhost:3000/ru/design-system#navigation`
(also EN). It demonstrates home/catalogue/case link sets in independent local
scrollers, 240px compaction, native mobile details, return links, RU/EN anchors and
the existing theme transition through ThemeToggle. Escape/outside/link selection
and desktop resizing close the menu with appropriate focus restoration. It adds
no public pages or routing. Use localhost for this dev server: the default Next
dev-origin protection rejects 127.0.0.1 runtime/HMR requests; cursor code is unchanged.

Project-card fixtures are at `http://localhost:3000/ru/design-system#project-cards`
(also EN): eight standard cards, three featured cards and long-text examples.
The server-rendered portfolio/cards entry accepts ready readonly display data;
consumers own grids, localized text, ordering, counts and links. New projects do
not require card-specific branches; source palettes remain centralized. Cards use
native links, CSS hover/focus feedback and prefetch=false by default. These fixtures
do not publish catalogue entries or implement case covers or galleries.

Project filters are demonstrated separately at
`http://localhost:3000/ru/design-system#project-filters` (also EN). The controlled
portfolio/filters entry renders source pill buttons with ready count labels;
consumers own filtering, GET forms and destinations. Workbench-only archive categories
all/commerce/service contain 08/04/04 cards and never change public professional/pet
records. Selection lives in kitCategory, supports reload/Back/Forward and native GET
submission without JS. Existing AnimatedItems animates stable server card nodes;
its optional className leaves prior consumers and motion parameters unchanged.

After building, `node scripts/check-built-glass.mjs` checks both backdrop-filter
declarations in actual output. The prefix-first ordering has a scoped, explained
lint exception; the optimizer regression test checks that boundary independently.

Case-cover fixtures are at `http://localhost:3000/ru/design-system#project-covers`
(also EN): eight full-width archive covers and a long-text/empty-titleLines sample.
The server-only portfolio/covers entry accepts readonly display text and a palette;
the consumer owns localization, source periods, counters, title lines and heading
hierarchy. headingLevel defaults to 1; workbench covers use 3 beneath the page h1.
The static header has no links or card hover, grows for enlarged text and preserves
source typography and the decorative final period. These fixtures publish no case
records and do not implement page sections or a gallery.

Content-element fixtures are at `http://localhost:3000/ru/design-system#content-elements`
(also EN). The server-only portfolio/content-elements entry exposes the section
eyebrow row, experience/education entries, definition-list facts and ordered
contributions. Consumers supply readonly display inputs, heading hierarchy and
ready action/status nodes; the existing CurrentLabel, StatusLabel and TextLink
remain their owners. Archive experience, education, course, contact and case text
is technical fixture data, not published records. Plain consumer markup supplies
column widths/gaps and sibling separators; full page sections remain deferred.

Gallery fixtures are at `http://localhost:3000/ru/design-system#gallery` (also EN).
The portfolio/gallery entry accepts readonly localized image groups and control
labels, without catalogue reads. It demonstrates all 40 source screenshots, native
original-image links, .85-width rails and a Radix-backed shadcn modal with cyclic
navigation, zoom, swipe, error/retry and opener focus restoration. OneTouch keeps
GO/PRO groups; Potlucky keeps the OOMI association. Single/empty/long/failure examples
are technical only. Existing assets, content records and public pages stay unchanged.

MotionSurface uses a CSS-only 2px hover lift over 200ms when motion is allowed.
AnimatedItems subscribes to live reduced motion, including exiting items, and stops
active layout projection without remounting content. The measured indicator animates
selection changes only; geometry synchronization is immediate. Theme bootstrap runs
while the head is parsed, and cross-tab preferences invalidate stale transitions.
Content starts visible and navigation works without JavaScript. Use CSS for simple
transitions and Motion for coordinated effects. Preserve visible focus and native scrolling.

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
Public CV, contact and project links now dispatch these declared goals.
Create the corresponding goals in the real counter when these handlers are added.

For integration acceptance, run a production build with the counter ID, check
initial load, client navigation, return visits and a blocked tag, then confirm
receipt in the actual Metrica dashboard. Unit/transport checks do not establish
dashboard delivery. Real-counter verification remains pending until an ID is supplied.
