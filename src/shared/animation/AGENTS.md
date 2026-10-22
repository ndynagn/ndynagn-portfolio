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
- Its optional className and indicatorTone preserve legacy defaults (muted).
  Foreground tracks support native direct links with aria-current=location and
  data-track-key: their active background remains readable before JS measures the
  indicator. The CSS owner removes that fallback only when its indicator is ready.
  Native ancestor details toggle events resynchronize geometry immediately; a
  revealed unchanged border box may not trigger ResizeObserver. Clean up that listener.
- Wrappers clean up subscriptions and must not delay navigation or focus.
- MotionSurface's local lift property preserves its fixed 2px source amplitude
  independently of the root font size; reduced motion still removes the lift.
- AnimatedItems accepts an optional className for consumer-owned grid geometry;
  omitted values preserve the original two/four-column defaults and all timings.
- SceneTransition remains a technical-only visual wrapper. The public portfolio
  route adapter reuses runSceneSequence with an async replacement: the adapter owns
  route commit, an 8s wait bound, abort settlement, routing and focus. The sequence
  owns only 600/650ms cover/reveal timing and accepts sync or async replacement.
  This explicit public-route consumer supersedes the technical-only restriction;
  do not make technical demos responsible for history. Theme/scene share transition-lock.
  Pointer activation starts at the click; keyboard activation uses the control center.
  Clamp the stored origin into the current viewport before resizing its diagonal cover.
- CursorBoundary uses explicit target attributes, one pending frame and no polling.
  Public route effects opt into transition-lock's cursor reset. Activation clears
  the hover label/palette and shrinks to the default dot; tracking continues while
  target selection resumes only on pointer movement after release. Other lock users
  retain their default behavior. This visual reset never blurs keyboard focus.
  Retain the native cursor for text/disabled targets and remove suppression on
  leave, blur, hidden documents, preference changes and cleanup.
