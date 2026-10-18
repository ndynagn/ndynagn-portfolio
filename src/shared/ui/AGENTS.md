# Shared UI

- Use shadcn/ui new-york with Radix, semantic neutral light/dark tokens and Lucide.
  Follow the OS theme until a theme-switcher design is accepted.
- `components.json` maps UI and the class-merging helper here. Generate primitives
  with the pinned `pnpm exec shadcn add <component>`, then review imports and format.
- Add primitives for actual consumers. Import components directly; avoid a global
  barrel mixing server-safe and interactive modules. Keep generated component
  families cohesive to make registry updates reviewable.
- Components own presentation only, preserve focus indicators and accessible props,
  and do not load content, send analytics or impose feature behavior.
- Primitives own internal spacing and expose intentional variants; composition owns
  their external placement. Keep class merging in the configured local `cn` helper.
- Primitives do not import Axios, TanStack Query/Form or feature Zod schemas.
  Features adapt values, errors and callbacks to UI props and own validation rules;
  labels and errors must be associated with their fields when forms are introduced.
