# Application composition

- Use the installed Next.js documentation for route, caching and metadata APIs.
- The root layout lives under `[locale]` so server HTML has the correct language.
  `/` redirects to `/ru`; unsupported locales and missing translations return 404.
- The accepted experimental `globalNotFound` flag gives unmatched routes a complete
  document despite the dynamic locale root. Its bilingual fallback uses `lang=ru`
  and an English `lang=en` block with native home links. It owns theme bootstrap,
  observation, noindex/nofollow and the existing SVG favicon independently of the
  locale layout; never mount route effects, cursor or analytics in this fallback.
- Locale metadata and the global fallback declare `/favicon.svg` through Metadata
  API. Keep its supplied bytes unchanged and preserve page-owned titles.
- Routes compose feature entry points. Keep content records and analytics mechanics
  outside route files. Metadata and rendered content resolve the same project.
- Prerender supported locales and published projects with `generateStaticParams`
  and `dynamicParams = false`. Unknown records must return an actual HTTP 404.
- Case static params enumerate complete published locale/slug pairs. Returning
  only child slugs per parent locale lost valid RU cases when EN was empty in
  Next.js 16.4.1. Verify the complete build manifest and an asymmetric fixture.
- The public projects index intentionally renders per request from searchParams
  for correct native GET filtering without JS. Home and case prerendering remains.
  Its canonical excludes filter queries; sitemap lists only base locale catalogues
  with published projects. PageRuntime is mounted once under locale layout Suspense.
  PortfolioCursor wraps public content at this persistent layout level so route
  commits preserve the decorative dot and native-cursor suppression. Its boundary
  covers at least the viewport, including empty space beneath short case pages.
- Cache Components and Partial Prefetching are deliberately disabled: Next.js 16.4
  does not support `dynamicParams = false` with Cache Components, and streaming a
  missing case produced an HTTP 200 during acceptance. Do not re-enable them without
  verifying empty-catalogue builds and missing-route status codes. Keep React Compiler.
- Canonical/hreflang/OG URLs require a configured real `SITE_URL`. Technical home
  placeholders are always noindex; only published content enters the sitemap.
- Global CSS owns Tailwind imports, semantic tokens and base styles, not feature UI.
- Compose document theme initialization/observation once, including routes without
  controls. The design-system workbench is development-only and returns HTTP 404
  in production; never add it to public navigation or the sitemap. Production
  rewrites its RU/EN URLs to the framework's global 404 entry before matching
  files, avoiding the language-less error shell from a prerendered page rejection.
- The locale root layout imports global CSS once, before component imports that
  register CSS Modules. Global CSS declares properties/theme/base/components/utilities
  precedence before its imports. Preserve that order in production output; route
  navigation must not depend on unloading a global stylesheet.
- Server composition calls feature server entry points directly when data is already
  available on the server; do not force an internal HTTP round trip. Pass only safe
  React-serializable application values to client components, not DTOs or services.
- Introduce a narrow Query provider only with a real client server-state consumer.
  Isolate QueryClient instances per server request and keep the browser instance
  stable across renders. Server prefetching requires explicit hydration and a
  feature-owned freshness/invalidation policy; never share a server client globally.
- Route handlers and Server Actions adapt framework inputs to feature operations.
  Validate external inputs at the boundary and enforce authorization server-side
  for protected operations when introduced. UI guards do not provide authorization.
