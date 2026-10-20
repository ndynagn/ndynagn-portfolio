# Project covers

- ProjectCover is static server presentation exported through portfolio/covers.
  Consumers supply readonly localized text, period, counter, platform, palette and
  title lines. Never read a catalogue, derive project IDs, translate or count here.
- Preserve a separate case-header structure, not a card variant or a universal
  artwork builder. Reuse PaletteSurface without changing palette tokens/materials.
- headingLevel defaults to 1; workbench consumers explicitly use 3. Missing/empty
  titleLines fall back to title. Retain spaces between block lines for accessible
  heading text; only the final decorative period is aria-hidden and 70% opaque.
- Match source container-relative type to the header content box, including its
  own padding. Normalize the source 760px boundary to 768px. Use rem text bounds
  and minimum heights; enlarged/long text may grow height without clipping.
- No links, tab stops, cursor targets, card hover or page-transition mechanisms.
  Metadata is opaque. Retain system foreground/background/edge in forced colors.
- Keep subpixel-antialiased on the header: source font smoothing is auto, while
  the application root uses antialiased. This local inherited reset restores source
  stroke rendering for cover text only; do not change global smoothing or weights.
