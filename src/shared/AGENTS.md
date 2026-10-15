# Shared technical modules

- Shared modules never import app or features. Use named scopes for real owners,
  not generic common/core/utils folders or mixed server/client barrels.
- Keep private helpers near their owner. Extract a private implementation into
  reusable code after a second independent consumer demonstrates stable reuse,
  choosing the nearest common scope. Repeated rows in one list are one consumer.
  The deliberately selected UI/animation foundation remains an explicit exception.
- Server-only configuration stays protected from client imports. Public environment
  variables are build-time browser-visible configuration, never credentials.
- When a confirmed backend integration needs it, implement shared Axios transport
  mechanics here. Do not create an empty HTTP module or introduce a parallel client.
  Feature endpoints, DTO schemas/mappers and business recovery never belong here.
  This selected transport foundation may start with its first real integration;
  it is not speculative extraction of a feature's private implementation.
- Expose transport failures to feature data for its safe operation-error mapping;
  do not convert failures into successful empty results or infer retry/refresh policy.
- SDK adapters for analytics/animation and direct access to local server data do not
  require Axios or Query. The selected backend stack is not a universal wrapper for
  every browser API, vendor SDK or framework-owned request.
