# Project cards

- ProjectCard is server presentation exported through portfolio/cards. It accepts
  ready readonly localized display data, href and cursor label; never read the
  catalogue, infer project IDs, count records or decide publication/selection here.
- Standard/featured are presentation variants of one card, not separate families.
  Consumers own grids, heading levels, ordering and stable list keys. Artwork and
  caption are private pieces. Missing/empty titleLines fall back to title.
- Use the existing palette boundary independently from project identity. New project
  data must not require new branches in this component; new colors belong to the
  existing palette owner. No duplicate palette literals or content model changes.
- Keep one anchor, no nested controls and no client boundary. Fragment-only hrefs
  use native a navigation so focus reaches the consumer's target (tabIndex -1).
  Other destinations use Next Link with prefetch false by default.
  Accessible name is title; repeated poster title, kicker, counter and
  arrow are decorative. Source metadata is fully opaque for readable contrast.
- Source ratios are preferred, not fixed heights. Enlarged/long text must grow the
  artwork instead of clipping; preserve container-relative type and rem bounds.
- CSS owns radius 500ms/ease, arrow rotate 350ms/ease and title translate 500ms/
  cubic-bezier(.2,.65,.3,1). Include rotate/translate in transition-property.
  Keyboard focus mirrors hover, reduced motion removes geometry and forced colors
  retains a system outline/edge. Existing cursor/theme/scene owners are unchanged.
