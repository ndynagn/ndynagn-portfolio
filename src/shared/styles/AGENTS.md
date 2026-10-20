# Visual foundations

- Read source styling rules. Tailwind owns routine geometry, typography and states.
  Modules own related material selectors/pseudo-elements in the components layer.
- tokens.css owns shared semantic roles and design typography. Private measurements
  remain at the component. Preserve readable text separately from decorative colors.
- GlassSurface is only a material boundary; consumers own placement and semantics.
  Photo filters, dimming, glass and text must be separate layers. Consumers own
  text contrast, including the solid accessibility fallback.
- Surface, control and badge own complete edge/filter/shadow recipes; variants must
  not inherit another material's saturation or elevation. Keep solid fallback and
  accessibility preference overrides for every translucent recipe.
- Preserve source blur radii (surface/badge 24px, control 15px) and the neutral
  badge tint #a0a19755. Consumers own border radius; material alpha is source-specific.
- Preserve the scoped prefix-first exception until production CSS tests demonstrate
  the optimizer no longer needs it. No new loader or global component selectors.
- Deferred UI-kit styles stay in the integration map, not unused production CSS.
