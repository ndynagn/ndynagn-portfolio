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
- Public route links/cards explicitly carry the page cursor and a localized label;
  service controls (including language changes) retain the small translucent cursor.
  Text cases also own a CursorBoundary. Navigation derives its page cursor from
  animateRoute, with cursorLabel or the return-link text as its caption.
- anchor-scroll.ts enhances only activated same-document anchors: 600–1200ms cubic
  easing, computed scroll-margin and document clamping. PageRuntime owns hash/focus
  and replacement/history/route/unmount aborts; the operation owns one frame and
  manual-input/resize/preference cleanup. Reduced motion settles the target at once.
