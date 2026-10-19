# Repository content

- This module is the single source for profile/CV, experience, links and projects.
  Keep common identifiers/technical fields separate from localized copy.
- Store public approved material only. Do not invent a biography, results, employers,
  dates or projects. Empty collections and an absent profile are intentional.
- Project slugs are stable lower-kebab-case URL segments. Professional/pet projects
  share the same model and detail route. Each translation owns its publication flag.
- Missing/unpublished translations are unavailable, not silently replaced by another
  language. Cards, case pages, metadata, language links and sitemap use the same lookup.
- Local records follow the source model conventions and are checked by TypeScript.
  Do not duplicate them with runtime schemas without a concrete external-data or
  runtime-validation requirement. Imported external content uses the feature's Zod
  boundary and explicit DTO mapping under the parent feature rules.
- Load records server-side and pass only necessary display values across client
  boundaries. Changes are published by rebuilding; no Query cache or HTTP adapter
  is needed for the current repository content.
- design-assets.ts is a byte/hash inventory of supplied public resources, not
  published records. Preserve original bytes, the font license and provenance;
  OOMI screenshots must not be presented as Potlucky screenshots.
