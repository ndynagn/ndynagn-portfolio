# Portfolio capabilities

Read root and source rules. Each feature owns one cohesive capability; introduce
the following responsibilities only when the feature actually implements them.

## Boundaries and model ownership

- Presentation owns rendering, focused hooks, screen state and form values. Data
  owns requests, storage adapters, DTOs, payload schemas and explicit mappers.
- A simple feature may call its typed data interface directly. Add domain for
  framework-independent business invariants/operations, not endpoint forwarding,
  DTO mapping or cache coordination. With domain, dependencies are
  `presentation -> domain <- data`; composition assembles implementations.
- Without domain, application models, operation inputs and safe operation errors
  live in named neutral feature-root files. They import no React, Next.js, Axios,
  storage or data/presentation implementations. Move them into domain if it becomes
  their owner; do not retain duplicate models or create generic types/models folders.
- Expose only necessary public contracts, with separate server/client/neutral entry
  points where needed. Cross-feature imports use those entries, never another
  feature's internal data/presentation modules. Avoid cycles and mixed barrels.
- Current repository content remains owned by the content feature. It does not
  need HTTP, Query, a CMS or repository interfaces just because they are supported.
- Keep private implementations inside their feature until the reuse criteria in
  [shared rules](../shared/AGENTS.md) apply. Choose the nearest common owner; reuse
  within one feature does not by itself justify promoting code to global shared.

## DTOs and validation

- Keep request/response contracts explicit. Data owns API payloads and their Zod
  schemas; infer DTO types from existing schemas rather than maintaining duplicate
  handwritten declarations. Do not export unused types.
- Validate external data at the receiving boundary. Keep private schemas and short
  mappers near the request; extract a named DTO module when another module consumes it.
- Preserve backend field names in DTOs and map explicitly into application models.
  UI receives application models, not wire payloads. Schema transforms must not
  conceal DTO-to-application mapping.
- Form values come from the feature's form schema and stay separate from operation
  inputs, even if fields currently match. Operation inputs never depend on presentation.
- Preserve the source conventions for missing/null/empty values, enums, dates and
  units. Block an affected field's integration until missing semantics are confirmed;
  do not substitute undocumented defaults or inferred conversions.

## Errors and asynchronous operations

- Data converts transport failures into safe application-visible operation errors.
  Raw Axios errors, request configuration, credentials and response internals never
  leave data. Shared transport owns mechanics; features own business error mapping.
- Failed requests are not successful empty collections, production mocks or silent
  fallbacks. Map backend errors to fields only under a confirmed error contract;
  unknown failures remain visible as general errors with safe user-facing information.
- Before implementing an integration, confirm its endpoint, request/response/error
  contract and required access context. Do not invent base URLs, credentials,
  authentication, refresh, retries, caching or recovery behavior.
- For each async operation define its trigger, owner, repeated invocation,
  overlap/replacement, cancellation, stale-response handling and recovery. State
  explicitly when a scenario does not apply. Durable outcomes belong in state,
  not transient notifications or an assumed event-library guarantee.
- Keep lasting integration decisions with the owning feature contract. Add a tracked
  contract document only when a real integration requires one; local rules link to
  that owner instead of duplicating it. Temporary blockers remain in the task.

## State and forms

| State                                                     | Owner                                                                |
| --------------------------------------------------------- | -------------------------------------------------------------------- |
| Local UI state                                            | React state at the nearest common consumer                           |
| Local state machine                                       | Focused presentation reducer when needed                             |
| Client server data, cache and network mutations           | TanStack Query                                                       |
| Editable values, field errors, validation and submission  | TanStack Form with feature-owned Zod schemas through Standard Schema |
| Applied filters, sorting and pagination, when implemented | URL; unsubmitted drafts stay local                                   |
| Derived values                                            | Compute from authoritative inputs                                    |

- Axios stays in data transport, not JSX. Do not mirror Query data into local state,
  Context or another store for display. Context distributes access to an owner;
  a new global store requires a decision naming its state, consumers, lifetime and
  concrete limitation of existing owners.
- Query keys include every result-affecting parameter and nonsecret access context,
  never credentials. The feature contract specifies freshness and cache updates or
  invalidation after mutations; do not assign undocumented universal defaults.
- Render accessible field/general errors and validation/submission states. Prevent
  unintended duplicate submission. When submitting a Query mutation from a form,
  await `mutation.mutateAsync` so Form submission state covers the request.
- Initialize editor drafts on opening a record; background refetch must not overwrite
  edits. Define reset, record replacement, unsaved changes and successful-save behavior
  before implementing the editor. Keep URL decoding/validation in the owning feature.
