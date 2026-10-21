# Portfolio presentation

- Server entry points compose local content with shared primitives. Keep home and
  project details server-rendered; interactive effects are optional enhancements.
- The current home is explicitly a technical placeholder until a published profile
  exists. Do not present technical configuration as the eventual portfolio design.
- Hide empty sections; never replace missing records with fictional case studies.
- Language links preserve the case slug when that translation is published, otherwise
  link to the target language home. Use content-owned publication lookups.
- Details render safe text/paragraphs, not executable MDX or unsanitized HTML.
- Portfolio composition owns section rhythm and placement of shared primitives;
  keep feature-specific effects beside their component rather than in global CSS.
- Public home/catalogue compose the kit with approved JSON records, never workbench
  fixtures. The catalogue GET parameter category accepts all/commerce/service;
  unknown/repeated values mean all. The server owns filtering and count derivation,
  App Router owns enhanced history and Motion receives only rendered card nodes.
- PageHeader owns document scroll, active sections and normalized 240px progress.
  Navigation primitives keep their controlled API and local demos stay independent.
- PageRuntime is the persistent App Router adapter for native anchors, explicit
  route links/cards and bounded analytics actions. It reuses scene sequencing and
  the theme lock, accepts normal primary activation only, waits for route commit
  and clears the overlay after at most 8s of waiting. Preference/visibility changes
  finish pending navigation immediately; Back/Forward cancels stale navigation.
  Technical workbench links are excluded. No global state or source hash-router.
- HomePhoto owns independent image/filter/dimming/content siblings and the badge's
  deliberate overlap. Errors retain geometry and a readable opaque badge.
