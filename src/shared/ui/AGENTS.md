# Shared UI

- Use shadcn/ui new-york with Radix for real consumers needing complex interaction:
  dialogs, focus management, Escape, portals or keyboard navigation. Use other
  primitives when their contract reduces custom code; explain that benefit when
  adding them. Preserve semantic tokens and Lucide.
- Do not wrap glass, tokens, typography, layout, decorative surfaces, cursors or
  animation in shadcn without that benefit. The UI kit extends Button, native
  TextLink and static TechnologyTag/StatusLabel/CurrentLabel. Theme mechanics stay in
  shared/theme; the workbench consumer owns its demonstration action.
- `components.json` maps UI and the class-merging helper here. Generate primitives
  with the pinned `pnpm exec shadcn add <component>`, then review imports and format.
- Add primitives for actual consumers. Import components directly; avoid a global
  barrel mixing server-safe and interactive modules. Keep generated component
  families cohesive to make registry updates reviewable.
- Components own presentation only, preserve focus indicators and accessible props,
  and do not load content, send analytics or impose feature behavior.
- Pill/round and TextLink preserve the source ease curve and 2px focus outline
  with a 7px offset (system Highlight in forced colors). CSS transitions must
  include the individual rotate/translate properties they animate. Native disabled
  pill/round buttons never animate or receive hover styling, including under CursorBoundary's
  intentional hit-testing override; preserve legacy Button defaults.
- Primitives own internal spacing and expose intentional variants; composition owns
  their external placement. Keep class merging in the configured local `cn` helper.
- Labels render consumer-supplied text, never profile facts. Status context variants
  preserve source mobile geometry; long text may wrap and the decorative dot cannot
  shrink. Do not add focus, live-region semantics, hover or pulse to static labels.
- Primitives do not import Axios, TanStack Query/Form or feature Zod schemas.
  Features adapt values, errors and callbacks to UI props and own validation rules;
  labels and errors must be associated with their fields when forms are introduced.
