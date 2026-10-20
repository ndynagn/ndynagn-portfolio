# Portfolio visual data

- This scope owns named source palettes, not project records, routes or publication.
- PaletteSurface is a color boundary for existing technical consumers. Do not turn
  it into a card/cover component before the UI-kit stage.
- Literal palette colors remain in the owned Module, never duplicated in JS.
- FlutterBadge owns the source SVG and existing badge material, not image loading,
  placement or profile data. Keep its two-line label, rem-based 98/100/123px circle
  and opaque escape hatch. Caption opacity stays 1 for readable fallback contrast;
  photo consumers supply the local text shadow. No hover or focus behavior.
