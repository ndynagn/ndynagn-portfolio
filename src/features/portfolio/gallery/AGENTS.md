# Project gallery

- Export only ProjectGallery and readonly display contracts through portfolio/gallery.
  Consumers own localized groups, globally unique image IDs, captions, dimensions,
  project names and editorial section headings. Never read the catalogue or branch
  on project IDs here. Empty groups are omitted; an empty gallery renders nothing.
- The narrow client capability owns rails and the modal. Initial SSR includes native
  original-image links, dimensions, captions and lazy thumbnails. Enhance only plain
  primary activation; preserve modified clicks and downloads. Use unoptimized Next
  Image for already prepared source WebP assets; retain their bytes and dimensions.
- Radix-backed shadcn Dialog owns modality, Escape, portal and focus containment.
  Return focus to the actual opener with preventScroll, or the local root if removed.
  Do not copy the source manual focus trap or body-overflow mutation. Its z-50
  portal is above the existing scene (40) and decorative cursor (45); it uses native
  cursor handling and does not add a new global stacking role.
- Flatten only supplied groups for cyclic viewing. Selection changes reset zoom and
  image status; keyed viewers and request generations reject stale load/error events.
  Retry remounts the requested image. Keep scroll/resize/load listeners and observers
  cleaned up; reduced motion interrupts ongoing smooth rail scrolling.
- Preserve source Manrope, local auto smoothing, 768px adaptation, thumbnail scale
  1.025/400ms, affordance 5px/200ms and .85 rail step. Give focus the same effects.
  Disable geometric motion with reduced motion. Meaningful counters/captions use
  readable colors instead of decorative source opacity.
  The local enlarge-offset property keeps the 5px motion amplitude fixed when text
  grows; its transition explicitly includes the individual translate property.
  The rail's negative padding compensation intentionally bleeds into consumer
  gutters to preserve focus outlines. Validate viewport overflow separately from
  the containing block's scrollWidth. Caption counters cannot shrink; only the
  duplicate decorative thumbnail fallback is clipped, never the real figcaption.
- The enlarge affordance owns a local 12px blur, prefix-first declarations and solid
  fallback. Reduced transparency and forced colors reset both filters. Do not change
  shared materials. The viewer retains its own dark palette and system-color fallback.
- Keep zoomed images block-aligned to the source stage's left padding, including
  when the original image is narrower than desktop space. Preserve access to both
  edges when it is wider than the viewport.
- Enlarged/long modal text must not consume the image stage or escape the dialog.
  Keep at least min(8rem,25dvh) for the stage; toolbar/footer tracks may shrink and
  scroll locally. Their inner content stays naturally sized so flex alignment cannot
  create unreachable negative overflow. Let toolbar controls wrap when text needs
  the row; a single-image caption can use the width freed by absent paging controls.
