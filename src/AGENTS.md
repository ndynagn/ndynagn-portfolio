# Source conventions and models

Scope: all source code. Read root rules and the applicable descendant instructions.

## TypeScript and model construction

- Keep TypeScript strict. Use type-only imports/exports and explicit public inputs
  and results. Avoid `any`, unjustified assertions and non-null assertions.
- Use `interface` for object contracts; `type` for unions, tuples, computed types
  and schema inference. Plain data uses objects; classes require behavior or runtime
  identity, including errors. Do not migrate unrelated correct declarations.
- Public model fields, nested objects and collections expose readonly access unless
  mutation is part of their contract. Local construction and library-managed form
  drafts may mutate. TypeScript readonly does not freeze values at runtime.
- Keep private types near their only consumer and component props with the component.
  Extract a named contract when independent modules need it; do not split nested
  objects into standalone models without an independent responsibility.
- Treat external payloads as `unknown` and validate them with Zod at their receiving
  boundary. A type assertion is not runtime validation. Feature rules own schema,
  DTO, mapping and application-model placement; validate confirmed constraints only.
- Preserve missing/null/empty values and enum meaning. Confirm date formats, units
  and timezones when behavior depends on them rather than inventing conversions.

## Code organization

- Use PascalCase for components/types, camelCase for values/functions and
  lower-kebab-case for ordinary paths. Preserve Next.js special filenames.
- Group imports as external packages, other project scopes through `@/`, then local
  imports. Types remain in their source group. Preserve side-effect/CSS execution order.
- Separate semantic phases and independent declarations with a blank line. Use
  braces for control-flow bodies; short expression callbacks may stay expressions.
- Keep independently owned components/hooks in focused files; small private helpers
  remain with their owner. Prefer named exports except where Next.js requires defaults.
- Call hooks unconditionally, keep rendering pure and give effects/subscriptions an
  owner and cleanup. Compute derived values instead of synchronizing duplicate state.
  Do not add mechanical memoization with React Compiler enabled.
- Any effect-dependency lint exception explains the captured values, why rerunning
  is incorrect and what change requires review. Do not disable the rule for a file.
- Preserve JSX whitespace and prop/spread order when refactoring. Use the root
  formatter settings.

## Comments, contracts and exceptions

- Document significant public contracts and non-obvious behavior with JSDoc where
  useful. Explain purpose, meaningful inputs/nullability, observable results,
  expected failures, side effects and lifecycle constraints only where relevant.
  Obvious private helpers need no ceremonial comments or repeated parameter types.
- Keep contracts on their authoritative declarations. Implementation comments
  explain intent and tradeoffs without duplicating the contract. Update affected
  comments, callers and owning documentation together when behavior changes.
- TODO/FIXME entries identify the unresolved issue and removal condition; add an
  owner or source when known. They do not authorize invented requirements or silent
  weakening of a contract.
- Record lasting architecture exceptions at their owner with their scope, rationale
  and removal condition. Do not create a separate execution report for an exception.
