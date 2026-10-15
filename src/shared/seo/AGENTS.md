# Search metadata

- Use Next.js Metadata APIs on the server. Derive metadata from the rendered record.
- SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment;
  localhost/private development origins cannot enable public indexing.
- Without a real origin, omit canonical, hreflang, OG URLs and sitemap entries.
  A technical placeholder stays noindex even with an origin configured.
- Emit only available published language alternatives. Never put placeholders,
  missing projects or invented structured data into search-facing output.
