# Repository content

- This module is the single source for profile/CV, experience, links and projects.
  Keep common identifiers/technical fields separate from localized copy.
- Store public approved material only. Do not invent a biography, results, employers,
  dates or projects. Empty collections and an absent profile are intentional.
- Project slugs are stable lower-kebab-case URL segments. Professional/pet projects
  share the same model and detail route. Each translation owns its publication flag.
- Missing/unpublished translations are unavailable, not silently replaced by another
  language. Cards, case pages, metadata, language links and sitemap use the same lookup.
- portfolio.json is the public editorial source, editable through GitHub. records.ts
  validates it server-side with content-schema.ts before exposing readonly models.
  This is the implemented runtime-validation consumer: malformed fields, duplicate
  IDs/slugs and missing featured references fail explicitly with field paths.
  JSON shares the application contract; no transport DTO or HTTP adapter exists.
- featuredSlugs owns explicit selection/order; categories commerce/service are
  independent from professional/pet. Palette, title lines and labels are data.
- The CV supplied on 21 October 2026 supersedes the source archive PDF. Preserve
  its bytes and updated inventory hash. SMD ended in October 2026; no current badge
  or inferred ongoing project dates. OmSTU graduation is expected in 2028.
- Load records server-side and pass only necessary display values across client
  boundaries. Changes are published by rebuilding; no Query cache or HTTP adapter
  is needed for the current repository content.
- design-assets.ts is a byte/hash inventory of supplied public resources, not
  published records. Preserve original bytes, the font license and provenance;
  OOMI screenshots must not be presented as Potlucky screenshots.
