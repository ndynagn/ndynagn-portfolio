# Animation foundation

- Motion owns coordinated/interactive animations; CSS owns simple transitions.
  Do not add another animation engine or intercept native scrolling by default.
- Keep browser code in narrow client wrappers with server-rendered children.
  Essential content must be visible in initial HTML and usable with scripts blocked.
- Respect OS reduced motion. Avoid autoplay/parallax/large transforms in that mode.
  Prefer opacity/transform over layout animation; avoid unbounded perpetual work.
- Wrappers clean up subscriptions and must not delay navigation or focus.
