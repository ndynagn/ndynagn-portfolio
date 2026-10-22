# Portfolio presentation

- Server entry points compose local content with shared primitives. Keep home and
  project details server-rendered; interactive effects are optional enhancements.
- A missing published profile uses the technical home fallback. Never replace
  unavailable profile facts with fictional content.
- Hide empty sections; never replace missing records with fictional case studies.
- Language links preserve the case slug when that translation is published, otherwise
  link to the target language home. Use content-owned publication lookups.
- Details render safe text/paragraphs, not executable MDX or unsanitized HTML.
- Cases compose ProjectCover, facts, contributions, optional engineering story,
  localized ProjectGallery, technologies, existing public links, next case and
  ContactSection. Their PageShell retains published language alternatives and
  links back to the catalogue. Hide empty sections and their navigation targets.
- Case gallery display mapping omits unavailable group/image translations. Pass
  only localized display groups to the client gallery, never the full catalogue.
  Next-case links use the next published locale record in catalogue order, wrap
  cyclically, hide with a single record and inherit the destination palette.
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
- Route effects support mouse, keyboard and touch. Reduced motion bypasses them;
  pointer capabilities do not. While a route effect is active, same-document anchor
  activation must not change hash/focus or start scrolling. Pathname changes cancel
  previous-document anchor work even when navigation originated outside this adapter.
- Home composition localizes work/education/courses once for both section rendering
  and navigation. Omit empty localized sections and their links. The hero CTA uses
  native #work when featured projects exist, otherwise the localized catalogue when
  projects are published, and is absent when there are no published projects.
- During a route effect, one pointer/resize subscription spans cover, route arrival
  and reveal. A ref owns the latest position; one pending animation frame updates
  overlay CSS geometry without React renders or phase-boundary resets. Resize
  clamps that position and recalculates full coverage. Idle/unmount cancels the frame.
- HomePhoto owns independent image/filter/dimming/content siblings and the badge's
  deliberate overlap. Errors retain geometry and a readable opaque badge.
- The home uses the supplied portrait with localized alt text and no stock-photo
  credit or architectural caption. Architecture remains available to kit demos.
- Route overlay titles use data-transition-label with the localized destination
  name, independently of control text, accessible names and cursor captions.
- Public route links/cards explicitly carry the page cursor and a localized label;
  service controls (including language changes) retain the small translucent cursor.
  PortfolioCursor in the locale layout owns one persistent CursorBoundary across
  home/catalogue/case commits; page shells must not remount it. The technical
  design-system route retains its independent boundary. Navigation derives its page
  cursor from animateRoute, with cursorLabel or the return-link text as its caption.
- anchor-scroll.ts enhances only activated same-document anchors: 600–1200ms cubic
  easing, computed scroll-margin and document clamping. PageRuntime owns hash/focus
  and replacement/history/route/unmount aborts; the operation owns one frame and
  manual-input/resize/preference cleanup. Reduced motion settles the target at once.
