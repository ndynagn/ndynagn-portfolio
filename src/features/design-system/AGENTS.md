# Development visual workbench

- This is a labeled technical fixture, not a portfolio page. Production
  returns HTTP 404; never include it in public navigation, sitemap or metadata URLs.
- Server composition owns static samples. Client demos receive localized labels,
  not profile/project records or the asset catalogue.
- Demonstrate visual mechanisms and their failure modes using existing Button and
  native markup. Do not add reusable card/gallery/filter controls for the demo.
- The buttons-and-links section consumes shared Button/TextLink and owns localized
  fixture labels, native destinations and the theme action. Keep foundation samples
  unchanged.
- The labels section consumes TechnologyTag, StatusLabel, CurrentLabel and the
  portfolio visual entry's FlutterBadge. Labels are static source fixtures, not
  public records. The narrow photo demo owns network failure, opaque mode and
  source-relative placement; the component owns neither image state nor layout.
  Preserve foundation and buttons/links examples; cards/gallery stay deferred.
- Navigation samples use the portfolio navigation public entry, LanguageLinks and
  ThemeToggle. Each fixture owns its local scroll progress, active section and unique
  anchors. Do not subscribe to document scroll or install source hash routing.
  Keep menu behavior progressive, local backdrop samples clearly technical, and all
  earlier samples unchanged. Use localhost for development: 127.0.0.1 is not in the
  current Next dev-origin allowlist and cannot initialize the HMR/runtime reliably.
- Verify intermediate and reverse motion frames, not only final hover positions.
  Gallery-size fixtures use Lucide chevrons; they do not implement a gallery.
- Keep initial text and media visible without JS. Temporary production fixtures
  must be removed before the final build and final diff check.
- Compare surface/control/badge over photo, page and contrasting backdrops using
  existing materials and static markup. Keep readable ink at the caller and provide
  a readable backing for the decorative photograph's network-failure path.
