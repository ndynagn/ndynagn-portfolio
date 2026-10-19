# Animation foundation

- Motion owns coordinated/interactive animations; CSS owns simple transitions.
  Do not add another animation engine or intercept native scrolling by default.
- Give each animated property one owner per element. Use separate wrapper elements
  when a CSS effect and Motion need independent transforms.
- Keep browser code in narrow client wrappers with server-rendered children.
  Essential content must be visible in initial HTML and usable with scripts blocked.
- Respect OS reduced motion. Avoid autoplay/parallax/large transforms in that mode.
  Prefer opacity/transform over layout animation; avoid unbounded perpetual work.
- Subscribe to live preference changes, including exiting items. Entering reduced
  motion stops and settles active value/layout animations without remounting content.
  AnimatedItems uses Motion's document-wide projection reset for this OS-wide change;
  it currently owns every layout-projection consumer. Recheck that scope when adding one.
- Keep item projection mounted across preference changes; live controls/transitions
  own reduction instead of Motion's mount-captured flags. Complete immediate exits
  after AnimatePresence's layout bookkeeping, while settling values before paint.
- MeasuredTrack animates selection changes for 420 ms; geometry synchronization
  (resize, fonts, compaction, visibility and initialization) is immediate and deduplicated.
- Wrappers clean up subscriptions and must not delay navigation or focus.
- SceneTransition demonstrates 600/650 ms cover/reveal on technical scenes only;
  never await it for routing or focus. Theme/scene effects share transition-lock.
  Pointer activation starts at the click; keyboard activation uses the control center.
  Clamp the stored origin into the current viewport before resizing its diagonal cover.
- CursorBoundary uses explicit target attributes, one pending frame and no polling.
  Retain the native cursor for text/disabled targets and remove suppression on
  leave, blur, hidden documents, preference changes and cleanup.
