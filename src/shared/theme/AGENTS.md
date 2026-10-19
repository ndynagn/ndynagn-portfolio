# Theme foundation

- The document theme has one owner: bootstrap, stored/system preference, observation
  and updates. A denied write retains the current document choice until reload.
- CSS follows the OS without JS. Only the html attribute hydration difference may
  be suppressed for the trusted pre-paint bootstrap; never suppress content mismatch.
- Render the trusted static bootstrap as a parser-executed inline script in the
  document head. It must apply before paint even if Next.js runtime chunks are
  delayed; never interpolate user text or environment values into its source.
- Every accepted local toggle has a generation. Storage updates (including clear)
  and observer cleanup invalidate it before aborting capture; stale update callbacks
  must never apply or persist their choice. External preferences are read and applied
  without writing them back to storage.
- Theme controls are technical workbench actions using the existing Button. UI-kit
  controls and production page placement are a later stage.
- Circle origins use measured control centers, including keyboard activation.
  Capture/API failures, reduced motion and hidden documents use immediate changes.
- Scene/theme effects share the transition lock. Cleanup, timeout and cancellation
  release it. Simplify demonstrated compositing defects rather than removing glass.
- During `data-theme-reveal`, the theme owner suppresses element and ordinary
  pseudo-element transitions with a scoped important declaration in the base layer.
  This document snapshot integration exception overrides component/utility timing
  so the captured theme has final colors; View Transition pseudo-element animations
  remain enabled. Remove this exception when the snapshot reveal owner is removed.
