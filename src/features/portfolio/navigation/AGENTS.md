# Portfolio navigation

- Render ready links, activeKey and normalized progress; never read routes, catalogue,
  publication policy or window scroll here. The embedding consumer owns them.
- Return links opt into public route effects through backLink.animateRoute; the
  primitive only emits the runtime marker and keeps its native href.
- Preserve native anchors and a nonmodal details/summary mobile menu. JS only adds
  Escape/outside/link/desktop closing and focus restoration. No document scroll lock.
- Keep separate desktop/mobile markup; hidden controls must not enter the Tab order.
  A desktop resize moves focus from hidden mobile content to its visible counterpart.
  A mobile resize moves desktop return-link focus to the mobile return link, and
  other desktop focus to the closed menu summary, without scrolling. Remember focus
  in either responsive region only through a visibility-induced blur before matchMedia;
  restore only from the newly hidden region. Ordinary blur, closing menu content,
  outside focus/pointer interaction and window blur clear stale recovery targets.
  Closing an already focused summary retains it: it stays visible and focusing
  that same element again does not emit focusin.
- Surface uses existing 24px glass; local edge/elevation follows the archive in both
  themes, using the existing theme-light-weight channel without changing materials.
- Below 768px a full-width, square-edged surface backdrop and bottom border keep
  the mobile header readable. This pointer-transparent sibling sits behind return
  and menu controls; never wrap the dropdown in another backdrop-filter ancestor.
  Preserve the existing menu icons, disclosure behavior and rounded dropdown.
- Mobile controls may wrap to a second line at enlarged text sizes; keep both
  language navigation and theme controls inside the panel from 320px upward.
- Private CSS variables coordinate compaction. A local scroller may supply
  --navigation-available-height; its documented fallback is the viewport.
- Reduced motion resets progress to zero reactively. MeasuredTrack owns selection
  timing and immediate geometry synchronization; do not duplicate its animation.
- Source mobile 760px and tablet 1100px boundaries are normalized to 768/1024px.
  At enlarged text sizes allow wrapping and automatic height instead of clipping.
