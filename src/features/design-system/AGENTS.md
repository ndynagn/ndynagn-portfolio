# Development visual workbench

- This is a labeled technical fixture, not a portfolio page. Production
  returns HTTP 404; never include it in public navigation, sitemap or metadata URLs.
- Server composition owns static samples. Client demos receive localized labels,
  not profile/project records or the asset catalogue.
- Demonstrate visual mechanisms and their failure modes using approved UI-kit
  consumers and native markup. Gallery controls remain a later stage.
- The buttons-and-links section consumes shared Button/TextLink and owns localized
  fixture labels, native destinations and the theme action. Keep foundation samples
  unchanged.
- The labels section consumes TechnologyTag, StatusLabel, CurrentLabel and the
  portfolio visual entry's FlutterBadge. Labels are static source fixtures, not
  public records. The narrow photo demo owns network failure, opaque mode and
  source-relative placement; the component owns neither image state nor layout.
  Preserve foundation and buttons/links examples; gallery stays deferred.
- Navigation samples use the portfolio navigation public entry, LanguageLinks and
  ThemeToggle. Each fixture owns its local scroll progress, active section and unique
  anchors. Do not subscribe to document scroll or install source hash routing.
  Keep menu behavior progressive, local backdrop samples clearly technical, and all
  earlier samples unchanged. Use localhost for development: 127.0.0.1 is not in the
  current Next dev-origin allowlist and cannot initialize the HMR/runtime reliably.
- Project-card samples consume portfolio/cards with server-only archive fixtures.
  They own simple standard/featured grids, counter labels and local destinations,
  not published records or reusable grid/filter behavior. Preserve earlier samples.
  Include long/new project data and empty titleLines to exercise data-only reuse.
- Project-filter samples reuse server-rendered card nodes and archive-only category
  metadata. Public professional/pet records remain unchanged. kitCategory in the URL
  owns selection (unknown means all); SSR and native GET forms work without JS.
  The client subscribes to popstate and its own history updates with cleanup, not
  duplicated React selection state. Keep stable item IDs and existing AnimatedItems
  timing/inert exits. Native history retains the mounted grid, focus and scroll.
- Project-cover samples consume portfolio/covers as full-width static server nodes.
  Archive periods/taglines belong to technical fixtures only. Pass headingLevel 3
  for source covers, 4 below the technical-example heading; retain one page h1.
  Cover metadata does not alter prior card/filter outputs or public content records.
  Keep source title lines/final decorative period and include an empty-lines long
  sample. Do not add card hover, links, gallery or case-page composition.
- Verify intermediate and reverse motion frames, not only final hover positions.
  Gallery-size fixtures use Lucide chevrons; they do not implement a gallery.
- Keep initial text and media visible without JS. Temporary production fixtures
  must be removed before the final build and final diff check.
- Compare surface/control/badge over photo, page and contrasting backdrops using
  existing materials and static markup. Keep readable ink at the caller and provide
  a readable backing for the decorative photograph's network-failure path.
