# Yandex Metrica

- Browser analytics is Yandex Metrica, not the mobile AppMetrica SDK.
- Enable only in production with a valid `NEXT_PUBLIC_YANDEX_METRIKA_ID`.
  No ID or development means no tag injection, queue, requests or event dispatch.
- Initialize once per browser document/counter. Use `defer: true` and send explicit
  page hits after navigation; deduplicate effect replays, not genuine return visits.
- Webvisor is off. Send named events with bounded typed fields, no contact details,
  arbitrary query strings or personal data. Analytics failures never break the UI.
- SDK access stays behind the typed adapter. Provider remounts do not reinitialize
  the tag. Validate with an intercepted transport; real dashboard acceptance requires
  a real counter and remains separate from local smoke checks.
