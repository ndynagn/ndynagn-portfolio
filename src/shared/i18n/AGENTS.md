# Localization

- Supported locales are `ru` and `en`; Russian is the deterministic default.
- Keep UI dictionaries type-compatible and server-only. Content translations belong
  to the content feature. No automatic fallback for an unavailable project translation.
- URL builders own locale prefixes. Language navigation uses ordinary accessible
  links and works without JavaScript; callers supply available target destinations.
