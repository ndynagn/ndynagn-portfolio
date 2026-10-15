# Portfolio engineering rules

This is a bilingual personal portfolio: a landing-style home page and addressable
project case studies. Content lives in the repository. Read this file and every
applicable descendant `AGENTS.md` before editing; local rules add unique constraints.
Instructions and documentation are tracked and written in English.

## Structure and dependencies

- Preserve Next.js App Router, React Compiler, strict TypeScript, Tailwind v4 and
  the pinned pnpm version. Read the installed Next.js guides before framework edits.
- `src/app` owns routes, layouts, metadata and composition; `src/features` owns
  portfolio capabilities; `src/shared` owns reusable UI and named technical modules.
- Dependencies flow from app to features/shared and from features to shared.
  Shared never imports app/features. Use explicit feature public entries across scopes.
- Server Components are the default. Keep client boundaries narrow and never pass
  secrets, server dependencies or the complete content catalogue to browser code.
- Introduce modules, layers and dependencies only for implemented responsibilities.
  No speculative domain/repository abstractions or global state. The integration
  libraries below are selected standards, installed with their first real consumer.

## Integration stack and detailed rules

- Axios owns backend transport; TanStack Query owns client server-state/cache and
  network mutations; TanStack Form owns editable forms; Zod owns runtime validation.
  Form schemas integrate through Standard Schema. App Router remains the router.
- Do not automatically introduce React Hook Form, TanStack Router or another HTTP
  client. Integration policy comes from a confirmed feature contract, not examples.
- Before adding/upgrading a dependency, inspect installed versions, Node/pnpm
  requirements, server/client compatibility, React Compiler support and bundle impact.
  Pin new direct dependencies to exact versions; update the lockfile only through
  pnpm. Do not bulk-change existing version ranges or copy reference-project versions.
- Read [source conventions](src/AGENTS.md) for TypeScript and model construction,
  [feature rules](src/features/AGENTS.md) for DTOs, validation, errors and state,
  [shared rules](src/shared/AGENTS.md) for transport boundaries, and
  [app rules](src/app/AGENTS.md) for server/client composition.

## Implementation

- Apply the detailed source conventions to new and modified code; do not rewrite
  unrelated code to enforce them retroactively.
- Keep data separate from rendering. Components render inputs and forward actions;
  React state owns local interactions. Document non-obvious behavior at its owner.
- Use semantic HTML, accessible names, keyboard focus and responsive layouts.
  Essential content and navigation work without JavaScript. Shared UI uses shadcn.
- Prettier owns formatting: four spaces in TS/TSX/CSS, two in JSON/YAML/Markdown,
  single TypeScript quotes, semicolons and 100-column wrapping. Format affected files.

## Delivery

- Inspect Git status before edits, preserve unrelated work and inspect the final diff.
  Prefer targeted patches for authored text and generators for generated output.
- Significant work starts with an agreed plan covering scope, dependencies and
  behavior. Split large work into independently understandable increments; keep
  plans, questions, progress and results in this chat. Simple local changes need no
  separate plan document or approval gate; do not repeatedly reconfirm accepted scope.
- Record blockers with the missing information/decision, confirmed source, affected
  behavior, owner when known and exact unblock condition. Continue independent work.
  Temporary blockers stay in the task; lasting constraints belong to their owner.
- Verify formatting, lint, typecheck and production build. Check visible UI in a
  browser at mobile/desktop sizes, including keyboard and reduced motion behavior.
  Report checks actually performed and outstanding limitations in chat.
- Add focused tests for behavioral boundaries when useful; do not inherit CRM-specific
  test gates or deployment requirements. Never fabricate content or APIs.
- Keep root rules compact. Put module-specific invariants in that module's
  `AGENTS.md`; update README for setup/content/configuration changes. No permanent
  execution logs, empty documentation packages or mandatory per-task spec files.
- Keep secrets out of Git, logs and public environment variables. Commit, push and
  deployment are separate actions requiring task authorization.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
