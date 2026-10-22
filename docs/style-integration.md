# Visual foundation integration map

## Source and stage boundary

Source archive: `ndynagn-profile-design-preview-main.zip`, SHA-256
`bed02576f45b3149de0f9a8eb7afbf3e7f3690ac72c8847ee87b60ac8463024b`.
Source paths below are relative to its root. The [published reference](https://swing-carry-82362385.figma.site)
is a behavior comparison; compiled CSS is not assumed equivalent to the archive.

The implementation preserves `2360fd2`, including the styling policy added after
`59d74d8`. Earlier 24-file and 154-file backups are comparison/recovery references,
not patches applied over the current checkout. Their styles require translation
to today's ownership, units, naming, layer and lint policy.

Only visual mechanisms and technical examples are implemented. The home, case
routes, content records/models, SEO and analytics retain their existing owners.
No Vite configuration, hash-router, history writes, source instructions, dependency
versions or monolithic App.tsx are imported. The first UI-kit increment adds only
buttons and links; subsequent increments add labels, navigation and project cards.
Subsequent increments add filters, covers, content elements and the gallery below.
The public home/catalogue increment below supersedes their page-composition
deferrals; full visual case composition remains a later stage. No manual dialog
focus trap is copied.

### Buttons and links increment

`shared/ui/button.tsx` preserves legacy defaults and adds pill/round presentation
with action/control/gallery/orb sizes. `shared/ui/text-link.tsx` owns underlined,
inline, scroll, index, contact and next anchor recipes; consumers own destinations,
download/external policy and actions. Workbench fixtures are not public records.
The control sample composes a borderless GlassSurface with a bordered Button for
one edge and an outer size of 33/37px. Orb icons are 25px below 768px and 43px above it. Source boundaries are
normalized to 768/1024/1536px; geometry is suppressed under reduced motion, and
focus reproduces hover feedback with a 2px outline and 7px offset, using system
Highlight in forced colors. Existing materials,
cursor, theme and animation mechanisms are unchanged.

Individual CSS rotate/translate properties participate in transitions with the
source ease curve: pill lift 3px/300ms, orb rotation 45deg/400ms, link-circle
rotation -10deg/300ms, contact-arrow translation (3px, -3px)/300ms and gallery
background 200ms. Disabled pill/round buttons have no hover feedback, transition
or geometric movement, even when disabled during a transition; the cursor owner's
native hit testing remains intact. Index counters retain the source's top alignment,
intervening text space and 5px margin. Gallery fixtures use 19px Lucide chevrons
with a 1.5 stroke, without introducing gallery behavior.

This increment supersedes the foundation inventory's deferred status only for
`.button`, `.resume-link`, `.inline-link`, `.scroll-cue`, `.round-icon`,
`.all-projects-link`, `.contact-orb`, contact anchor presentation and `.next-project`.
Their surrounding sections and grids remain deferred. Readable semantic ink replaces
decorative muted ink on meaningful labels. Native anchors remain functional without
JS; the demonstration theme action uses the existing shared theme owner.

### Labels increment

`shared/ui` owns TechnologyTag (10/11px, weight 450, 9×14/10×17px padding,
30px radius), CurrentLabel (8px, 5×12px padding, 20px radius) and StatusLabel
(10px, 8px gap, 5px dot with the original 3px halo). All use Manrope and 1.5
line height. Below 768px, hero status uses 8/6/5px plus 1px top padding;
portfolio uses 8/8/5px; contact uses 8/6/4px (font/gap/dot). Static labels
have no tab stop, status role, hover or pulse; dots are decorative and never shrink.
Long text can wrap rather than inherit the archive's nowrap constraint.

`portfolio/visual` owns FlutterBadge, exported through the existing visual entry.
It preserves the exact source SVG, two-line markup, 25/29px icon, 8px gap,
12/13px semibold title and 8px regular caption. The existing GlassSurface badge
recipe, filters and accessibility fallbacks are unchanged. Diameter is
6.125/6.25/7.6875rem (98/100/123px at standard root size), allowing text scaling.
Caption opacity is intentionally 1 instead of .7: white contrast on the existing
#63655b solid fallback rises from approximately 3.86:1 to 5.93:1.

The technical consumer owns photo/dimming/text-shadow layers, source positioning
(mobile 29%/−23px; tablet 37%/−28px; desktop 37%/−40px), the failure message and
opaque mode. The badge never loads images. Labels use ready localized fixture text;
they do not infer employment or availability. This increment supersedes deferred
status only for `.skill-tags > span`, `.availability`/`.status-dot`, `.current-pill`
and `.flutter-badge`; their surrounding pages and sections remain deferred.

### Navigation increment

PortfolioNavigation accepts readonly ready links, activeKey, labels, optional return
link, control nodes and progress (default 0, clamped to 0..1). It never owns routes,
publication policy or document scrolling. LanguageLinks makes the complete RU / EN
area one native anchor to the other locale, with target hrefLang, language-specific
text spans, one Tab stop and a destination-specific accessible name. Consumers still
supply both hrefs; current-locale emphasis is visual, not aria-current on an outgoing
link. ThemeToggle composes the existing 33/37px control and 15px glass, calling
the existing theme owner. Desktop/mobile controls have separate responsive markup;
native details remains usable without JS. Enhancement closes on Escape, outside
pointerdown, anchor selection and desktop resize, restoring visible focus.

The source header is adapted to a sticky local fixture instead of a document-fixed
site header. Heights retain 114→84px desktop and 88→72px mobile over 240px scroll;
source 760/1100px boundaries become 768/1024px. Desktop links retain 12px/500 and
12→10px by 20→16px padding; tablet 11px and 11→10px by 14→12px; mobile 14px with
15×20px padding. Panel padding is 6→4px desktop, 14px mobile, with 50/20px radii.
The source has no rendered brand in this header; unused brand selectors stay deferred.

As a requested adaptation below 768px, a full-width surface backdrop with square
corners and a bottom border keeps the mobile header controls visible over content.
It is a pointer-transparent sibling behind the controls, not a filtered ancestor
of the dropdown. Existing 88→72px compaction, menu icons, disclosure behavior and
the rounded dropdown geometry remain unchanged; desktop has no added backdrop.

Existing surface blur 24px and control blur 15px remain unchanged. Navigation owns
its archive light border (foreground 22%) and three light shadows (foreground 8%/5%,
white inset 90%). Dark desktop retains the surface recipe; dark mobile has the
0 15px 35px #0000000d shadow. Local colors use the existing theme-light-weight
channel, with system colors in forced colors. Readable muted ink replaces decorative
ink on meaningful inactive language links. Live source blur compilation differences
do not replace the archive's native blur recipe.

MeasuredTrack adds optional className/indicatorTone (muted by default) without
changing measurement or 420ms selection timing. Foreground native active links have
a CSS background fallback until the indicator is ready, preserving no-JS contrast.
Resize, font loading, menu reveal and compaction settle geometry immediately. The
track also listens to its native ancestor details toggle: reopening need not change
the ResizeObserver border box even though hidden child geometry was different. The
navigation resets compaction reactively for reduced motion. Enlarged text can wrap;
header height grows, and the mobile menu scrolls within its available height.

This increment implements header/nav/indicator/return/language/theme/menu presentation
only; source hash routing, page layouts, gallery and card/filter behavior stay deferred.
The workbench's three fixtures use unique native anchor targets and own scroll state.
Use localhost for dev acceptance: default Next dev-origin protection rejects runtime
requests from 127.0.0.1 (403 vs localhost 200), leaving client controls uninitialized.
The cursor mechanism itself is unchanged.

### Project-card increment

The server-rendered portfolio/cards entry exposes ProjectCard and its readonly
display contract. Standard/featured share private artwork/caption pieces, one anchor,
ready href/title/lines/eyebrow/category/platform/counter/palette data and cursor label.
Consumers own translation, catalogue access, ordering, counts, selection and grids.
No project-ID branches or full catalogue are passed into a card. Missing/empty
titleLines use title; headingLevel defaults to 3, variant to standard, prefetch to
false. Case prefetch may be explicitly enabled by the consumer, not multiplied
implicitly as the catalogue grows. Fragment-only hrefs use native anchors, preserving
browser focus transfer to the consumer's target with tabIndex -1; other destinations
retain Next Link. No client focus handlers are added. Palettes are independent from project IDs and
remain owned by PaletteSurface; the existing content model is unchanged.

Source standard artwork retains ratio 1.37/padding 24px above 768px; featured uses
1.1/22px. Both use 1.25/20px below 768px. Ratios are preferred: long/enlarged text
can increase height. Container-relative type retains clamp(1.75rem,9cqw,6.25rem),
weight 550, line-height 1.02 and -.065em tracking. Standard caption is a row with
15px gap; featured is a desktop column/mobile row with 5px gap. Caption title is
14/15px, category 9/10px, padding-top 13/17px (mobile/desktop). Source 760px is
normalized to 768px, including 7px mobile and 8px standard desktop metadata.
The card root locally restores source auto font smoothing with subpixel-antialiased.
Metadata tracking uses em ratios for each local font size, preserving nominal
spacing across breakpoints without changing the application root.

CSS owns poster radius 0→10px over 500ms/ease, arrow rotation 45deg over 350ms/ease
and title translation 2% over 500ms/cubic-bezier(.2,.65,.3,1), with explicit rotate/
translate transition properties. Keyboard focus reproduces hover and retains the
2px/7px outline; reduced motion removes geometric effects and forced colors uses
system colors and a visible artwork edge. The 33px arrow/14px Lucide icon is
decorative, as are the repeated poster title, kicker and counter. Meaningful source
metadata is fully opaque rather than .6 (source light contrast can be 2.61:1;
opaque palette ink is at least about 5.59:1 across the existing palettes). This is
an explicit readability adaptation; decorative opacity is preserved.

Workbench-only fixtures render the eight source projects and first three featured
projects in simple 2/3-column layouts, collapsing to one below 768px. Local targets,
long bilingual copy, a three-digit counter and an empty-titleLines example exercise
reuse without publishing records. This increment supersedes deferred card artwork/
caption selectors only, not source ProjectGrid filtering, hero artwork, source
hash routing, scene navigation, page grids or gallery. Existing foundation, labels,
buttons/links and navigation samples remain unchanged.

### Project-filter increment

The portfolio/filters entry exposes controlled ProjectFilters with readonly options
(value, label, countLabel), value, accessible group label and optional onValueChange.
The native field name defaults to category; the workbench supplies kitCategory.
Pressed submit buttons preserve native GET behavior without JS; an enhanced consumer
prevents submission and owns URL changes. The component owns no catalogue or routes.
Source geometry is normalized to 768px: 11px text/12x21px padding/10px gap on desktop,
9px/11x14px/7px below it, with 8/7px counters and 200ms/ease color transitions. Counts
use opaque inherited ink: source .6 opacity can reduce contrast to about 4.07:1;
opaque counts measure at least 14.30:1 in the tested themes/states. This is a
readability adaptation, not a new material.

The filter group locally restores source auto font smoothing with
subpixel-antialiased; application-wide smoothing is unchanged.

The separate workbench section supplies eight server card nodes and archive category
metadata (all 08, commerce 04, service 04), not public professional/pet records.
kitCategory owns selection; unknown values mean all. Server searchParams initialize
HTML for GET forms. The narrow client consumer uses a URL external-store snapshot,
native pushState and popstate for refresh/Back/Forward without remounting the grid,
moving focus or explicitly scrolling. Existing AnimatedItems owns enter/exit/reorder;
its optional className changes consumer grid geometry while preserving legacy defaults.
No moving filter indicator, page grid component, public routes or gallery are added.

### Case-cover increment

The server-only portfolio/covers entry exposes ProjectCover and readonly
ProjectCoverData: title/optional titleLines, categoryLabel, periodLabel, eyebrow,
tagline, counterLabel, platformLabel and palette. headingLevel defaults to 1; source
workbench covers use 3 and the nested technical sample uses 4. Missing/empty lines
fall back to title. Block lines retain separating whitespace for accessible text;
only the final decorative period is aria-hidden and 70% opaque.

The static header reuses PaletteSurface without changing card internals or colors.
It has no link, tab stop, cursor target, image, arrow or hover/page-transition effect.
Its local subpixel-antialiased utility restores source auto font smoothing for all
cover text. The application's global antialiased setting and neighboring samples
remain unchanged; matching stroke rendering does not require changing font weights.
At the normalized 768px boundary it changes from minimum height 23.75rem/padding
1.25rem/gap 1.75rem to clamp(25rem,43vw,37.5rem)/clamp(1.5rem,3vw,3rem)/2rem.
Container-relative title size is measured against the header's inner content box:
clamp(2.1875rem,12cqw,5.3125rem) mobile and clamp(3.125rem,10cqw,8.75rem) desktop,
with source 550/1.02/-.065em. Tagline/metadata recipes follow the archive, using
opaque palette ink and forced-color system colors. Long/enlarged text grows height;
there is no fixed ratio or content clipping.

The separate full-width workbench section renders all eight archive covers plus a
long-label/empty-lines technical fixture. Fixture periods/taglines are not published
profile/project claims. Existing card/filter fixture output, catalogue publication,
theme, cursor, materials and other samples remain unchanged.

### Content-element increment

The server-only portfolio/content-elements entry exposes SectionHeading (a source
eyebrow row, not a semantic heading), ExperienceEntry, EducationEntry, ProjectFacts
and ContributionList. Inputs are readonly ready text/IDs; the components do not
read catalogues, route, parse dates or infer employment/availability. Experience
and education headings default to h3; workbench records use h4 under group h3s.
CurrentLabel, StatusLabel and TextLink inline/contact retain their existing owners.
Text asides use the source small-note recipe; composed status nodes keep their own
typography. Consumers own source inline-link mt-5, outer spacing, column geometry
and education sibling separators. No new global UI primitives or animations appear.

Source Manrope and local subpixel-antialiased retain auto font smoothing. Text uses
rem, the 760px source boundary is normalized to 768px, and long/enlarged content
wraps/grows without clipping. Experience preserves source 25/23px titles, 9/8px
dates, 11px roles and 12px/1.95 descriptions; education uses 68/62px year columns,
20/17px gaps and 14/13px titles. Fact labels remain 9px on both sides of the
breakpoint (the source's .project-facts .eyebrow specificity wins on mobile).
Facts retain 2fr/1fr columns, source borders and spacing; semantic dl/dt/dd replaces
generic divs. Contributions use ol/li, explicit role=list for markerless VoiceOver
lists, ready decorative counters and 16/14px text. Rem-based minimum counter columns
can grow for enlarged or three-digit labels. Empty facts/lists render nothing.
Meaningful dates, year notes, project lists and fact labels use readable semantic
muted-foreground instead of the source decorative gray; decorative indices retain
their original tone. Forced colors retain system ink/edges.

The workbench demonstrates two archive employment entries, two education entries,
one course, three contact links, OneTouch/Immergas facts and contribution lists,
and separate technical long labels. These data do not publish profile/case records.
No about section, editorial prose system, engineering story, footer or gallery is
implemented. Earlier samples, routes, content records, materials and motion owners
remain unchanged.

### Gallery increment

The portfolio/gallery public entry accepts readonly ready groups/images, name,
localized control labels, optional className and group heading level (h3 default).
The narrow client capability receives only its consumer's gallery, never the asset
catalogue. All 40 archive images retain dimensions, thumbnail/original URLs and
captions: OneTouch has GO/PRO groups (five each), Potlucky has five OOMI screenshots.
The other six projects retain their original four/five-image groups. No project-ID
branch exists in the component; fixture composition owns the prefixed captions.

Source geometry becomes Tailwind at 768px: four columns with 20px gap, or 72% width
with 16px gap on mobile; thumbnails retain .58 ratio, 20/18px padding and 6px radius.
Images use pre-generated WebP directly through unoptimized Next Image. Hover/focus
scales 1.025/400ms; the enlarge affordance fades/slides 5px/200ms (always visible on
mobile). It owns a separate 12px blur with prefix-first and standard declarations,
solid fallback, reduced transparency and forced colors. Shared materials stay intact.
Meaningful captions/counters use readable ink; source decorative opacity is not
copied onto essential text. Local subpixel-antialiased retains source smoothing.

Rails step .85 viewport width and measure real disabled boundaries on scroll,
resize and image load. Dynamic reduced motion cancels smooth scrolling. Thumbnails
remain original-image anchors without JS and preserve modified clicks with JS.
The installed pinned shadcn generator supplies Dialog; only its incorrect cn import
is corrected and a real-consumer overlayClassName prop added, without dependencies.
Radix owns portal/modality, focus containment, Escape and scroll locking; the feature
restores the actual opener. The z-50 modal sits above scene 40 and cursor 45 and
uses native cursors, source dark viewer colors and forced-color system ink.

Viewing cycles across supplied groups. Selection resets zoom/status; keyed viewers
and request generations reject stale image events. Button/double-click zoom, touch
swipe outside zoom, original-size scrolling, blank-stage dismissal, caption/counter,
loading and error/retry are local responsibilities. Empty galleries disappear;
single-image fixtures omit rail/previous/next controls. Source outer editorial
headings, case sections, public records and page routing remain deferred.
The original negative rail gutters preserve focus outlines; they are intentional
local bleed, not text clipping or document overflow. Real captions wrap; counters
cannot shrink. Only duplicate decorative thumbnail fallback text is locally clipped.
This increment supersedes gallery/rail/lightbox deferred inventory entries below;
outer editorial gallery sections remain page-composition work.
Zoomed images retain source block/left alignment. Long/enlarged modal labels use
wrapping toolbar controls and independently scrollable toolbar/footer tracks around
a stage minimum of min(8rem,25dvh). Single-image captions use the space freed by
absent paging controls. Natural inner wrappers keep all text reachable; the modal
does not overflow the viewport or clip labels to preserve a fixed panel height.

## Group mapping

| Source group / effect                               | Target mechanism and owner                                                               | States                                                              | Responsive adaptation                                   | Fallback                                    | Verification                                | Status                                        |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------- | ------------------------------------------- | --------------------------------------------- |
| Root palette, `--bg/fg/line/surface/secondary`      | Shared semantic tokens, mapped to existing shadcn roles                                  | OS, explicit light/dark                                             | Document-wide                                           | OS without JS                               | Both locales/themes, reload                 | Adapted                                       |
| `--muted`, `.muted`, metadata labels                | Decorative token remains separate from readable muted foreground                         | Light/dark                                                          | Rem text and em tracking                                | Foreground in forced colors                 | Text contrast                               | Adapted: source light muted is about 2.92:1   |
| Manrope and type groups                             | Local original fonts/Unicode ranges; display/page/title/lead/body/caption/eyebrow tokens | Loading/loaded                                                      | Fluid rem bounds; existing routes retain Geist          | Arial/system sans                           | Cyrillic/Latin, 200% text                   | Adapted                                       |
| `.section-shell`, grids, container units            | Tailwind technical geometry; no layout-component library                                 | Long copy, narrow/wide                                              | 1800px → 112.5rem; 5%/6%; 760/1100/1600 → 768/1024/1536 | Normal flow, min-width:0                    | 320/375/390/768/1440px                      | Adapted; page-specific geometry deferred      |
| `.glass`, badge/control material                    | Shared GlassSurface, scoped recipe                                                       | Blur, opaque, accessibility preferences                             | Caller owns geometry                                    | Solid backing without blur                  | Built CSS and image/theme fixture           | Adapted                                       |
| Image/filter/grain/attribution                      | Independent PhotoDemo image, filter, dimming, glass and text siblings                    | Loaded/error/restored                                               | Aspect ratio, responsive Next Image                     | Visible error label                         | Real onError, native link                   | Adapted as technical scene; photo UI deferred |
| Theme circle                                        | Shared theme bootstrap, document observer, reveal                                        | OS/saved, busy, denied storage, capture failure, hidden, aborted    | Measured control center for mouse/keyboard              | Immediate change                            | Focused lifecycle tests, capture comparison | Adapted                                       |
| Cursor modes                                        | Shared CursorBoundary, explicit `data-cursor` contract                                   | Default/link/page/native, disabled/text controls, leave/blur/hidden | Fine mouse only; preference changes remove enhancement  | System cursor, including no JS              | Pointer/scroll/scene hit testing, input     | Adapted                                       |
| Cover/reveal                                        | Shared SceneTransition and abortable local sequence                                      | Idle/cover/reveal/error/cancel/busy                                 | Latest pointer and viewport diagonal                    | Immediate scene replacement                 | Timing/cancel/overlap tests                 | Adapted; never controls routing or focus      |
| Nav indicator and compaction                        | MeasuredTrack / ScrollProgress mechanisms                                                | Selection, resize/fonts, hidden, reduced motion                     | First 240px in an explicitly owned local scroller       | Static geometry                             | Measurement, keyboard, native scroll        | Adapted; NavBar/menu deferred                 |
| Motion filtering                                    | AnimatedItems consumes display nodes                                                     | Enter/exit/reorder, inert exiting nodes                             | Responsive technical grid                               | Initial HTML visible, reduced motion static | Collection changes, SSR                     | Adapted; filter controls/policy deferred      |
| Eight project palettes                              | Portfolio-owned scoped PaletteSurface data                                               | Light/dark; source Potlucky accent override                         | No route or catalogue dependency                        | Source colors and readable foreground       | All palette samples                         | Adapted                                       |
| Lift/radius/title/icon/thumbnail effects            | Isolated HoverDemo with a colocated Module                                               | Hover/focus, reduced motion                                         | Automatic text heights                                  | Static content                              | Keyboard and motion                         | Adapted as effects; cards/controls deferred   |
| Smooth scroll / snap                                | Explicit local technical scroller                                                        | Normal/reduced motion                                               | Desktop snap from md; mobile free flow                  | Native scroll                               | Keyboard/wheel; document unaffected         | Adapted; gallery rail deferred                |
| Public resources                                    | Byte/hash inventory in content feature, originals in public                              | Resource availability                                               | Original full-size/thumb pairs                          | No fabricated images                        | 89 files / all hashes                       | Transferred                                   |
| Buttons/links/chips/brand/navigation/menu           | Future UI-kit consumers; existing Button used now                                        | Focus/hover/active/disabled as applicable                           | Source measurements retained in inventory               | Native HTML                                 | Next stage                                  | Deferred to UI kit                            |
| Cards/covers/timeline/education/contact/case layout | Future portfolio presentation                                                            | Content-dependent                                                   | Source grids and long-text adaptation                   | No fictional records                        | Later UI/page acceptance                    | Deferred to UI kit/pages                      |
| Gallery/rail/lightbox/zoom/swipe/retry              | Future gallery with reviewed shadcn/Radix interaction                                    | Focus/Escape/restore/loading/error/recovery                         | Touch and local scroll contracts                        | Accessible images/links                     | Later gallery acceptance                    | Deferred to UI kit                            |

Every source selector is indexed below. A deferred selector is documentation, not
unused implementation CSS. Layout/typography use Tailwind; Modules use local class
owners in the components layer for related complex effects only. No ID selectors,
global component selectors, second reset or source minimum page width are copied.

## Materials and theme

The typography samples are plain text, not UI primitives. At a 16px root the
normalized breakpoints are 768/1024/1536px rather than the archive's 760/1100/1600px.
Display uses `clamp(4.0625rem,14.8vw,6.875rem)` below md,
`clamp(4.224rem,8.8vw,5.632rem)` from md, and
`clamp(4.375rem,8.9vw,9.6875rem)` from lg. The tablet rem endpoints are enlargement
bounds for the normalized band; the source coefficient remains `8.8vw`. Page uses
`clamp(2.8rem,14vw,6.72rem)` below md and `clamp(3.75rem,8.8vw,8.75rem)` above.
Title is `2.1875rem` below md and `clamp(2.1875rem,3.65vw,3.8125rem)` above.
Lead is `.9375rem` below lg and `clamp(.9375rem,1.45vw,1.375rem)` above.

Canonical sample weight/line-height/tracking: display 550/1.03/-.075em;
page 500/1.1/-.07em; title 500/1.22/-.055em; lead 450/1.65/-.03em;
body 400/1.95/normal; caption 400/1.9/normal; eyebrow 600/1.6/.13em.
Lead normalizes the source's fixed -.45px to -.03em at its 15px minimum; this
deliberately scales to -.66px at 22px. Caption selects the small prose at source
CSS lines 151/197, rather than claiming all contextual captions share one recipe.
Separate 400/550/800 specimens expose the supplied variable font's weights.

Native CSS backdrop-filter matches the source frosted material. Shader/SVG
refraction is excluded. The installed optimizer drops the standard declaration
when it precedes the WebKit declaration; prefix-first preserves both. The explicit
prefix has a narrow Stylelint exception with a removal condition. The optimizer
test and `node scripts/check-built-glass.mjs` exercise separate boundaries.

Each material owns its complete recipe. Surface uses a white translucent edge,
`0 3px 14px #00000003, inset 0 1px 0 #ffffff30` and
`blur(24px) saturate(1.3)`. Control uses the semantic line, `blur(15px)` and no
shadow or saturation. Badge restores the neutral source `#a0a19755` fill with shadows
`0 8px 40px #00000010, inset 1px 1px 0 #ffffff4d`. Opaque, reduced-transparency
and forced-color paths retain solid backings. Photo dimming reaches transparent
at 40%; its image filter remains independent of dimming and glass.

Photo grayscale/brightness affect the image only; dimming, material and content
are independent siblings. Do not add opacity/filter/clip-path on a shared ancestor
without checking the backdrop root. CSS declaration retention and View Transition
snapshot compositing are separate regression checks. If an engine demonstrably
breaks material capture, simplify its transition instead of removing blur.

The source badge tint has 33% alpha; this is its specific recipe, not a universal
transparency rule. Surface/control preserve `#f7f7f2b5` in light and `#22231dc7`
in dark. Material tint, backdrop filtering, image filtering, dimming and text stay
independent. Do not increase material opacity to compensate for unreadable ink.

Consumers own text contrast. PhotoDemo places light text and a local text shadow
over the photograph, and removes its badge when the photo fails. The static material
matrix selects ink for photo/page/contrasting contexts; its decorative image reveals
a dark solid backing on network failure, so light badge ink remains readable.
Opaque and reduced-transparency badges use light text on their dark solid backing;
forced colors retain browser-managed colors. Source decorative muted remains
separate from meaningful muted labels. Borders are decorative; focus uses its
high-contrast role. Cursor blur remains 1/18px and has no shared radius with glass.

Theme mechanics have one owner. Missing/invalid stored preferences follow OS;
explicit choices persist when possible. Denied writes retain this document's
choice. CSS follows OS without JS. A static trusted pre-paint script sets only a
validated light/dark attribute; hydration suppression is limited to html attributes.
It executes directly while the head is parsed, without waiting for Next runtime.
Storage events invalidate local preference generations before cancelling captures;
stale callbacks neither mutate the document nor write storage. During the reveal,
the theme owner suppresses competing element and ordinary pseudo-element CSS
transitions, leaving View Transition animations intact. Cleanup removes suppression.
Capture failure, missing API, reduced motion and hidden documents apply immediately.
All effects share a lock, ignore busy repeats and release on every exit path.

## Motion parameters and ownership

| Effect                      | Source parameters                                      | Owner and adaptation                                                                                                     |
| --------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Theme expand/contract       | 750ms; (.22,1,.36,1) / (.65,0,.35,1)                   | Document snapshots; control center for all activation modes                                                              |
| Scene cover/reveal          | 600/650ms; (.65,0,.35,1)                               | Pointer activation coordinates; keyboard control center; viewport-clamped origin and diagonal radius on resize           |
| Cursor                      | 7/29/90px; 250ms; 1/18px blur                          | One pending RAF; stationary-pointer target updates after scroll/scene mutation                                           |
| Active indicator            | 420ms; (.22,1,.36,1)                                   | Selection changes only; initial/resize/font/compaction/visible geometry sync immediately; unchanged measurements skipped |
| Header compaction           | clamp(scroll / 240,0,1)                                | Local runtime custom property; reduced motion progress stays 0                                                           |
| Filter grid                 | Layout 480ms / opacity 180ms / scale 240ms, .96        | Motion; initial SSR visible; exiting nodes inert                                                                         |
| Lift / round icon           | -3px / -10deg, 300ms                                   | Technical sample only                                                                                                    |
| Card radius / title         | 10px / translateX(2%), 500ms; title (.2,.65,.3,1)      | Related scoped sample; no reusable card                                                                                  |
| Arrow / orb / contact arrow | 45deg at 350/400ms; translate(3px,-3px) at 300ms       | Isolated hover/focus effects                                                                                             |
| Thumbnail / affordance      | Scale 1.025 at 400ms; opacity/translateY(5px) at 200ms | Decorative technical samples; gallery deferred                                                                           |
| Anchor / rail / snap        | Native smooth scroll; source gallery step .85 viewport | Only local scroll demo now; rail interaction deferred                                                                    |

CSS and Motion never animate the same transform on an element. Reduced motion
disables runtime movement as well as CSS transitions; no content waits for effects.
Each collection item subscribes to the live media preference, including exiting
nodes retained by AnimatePresence. Entering reduced motion stops controls, installs
final values and completes exits. The public Motion projection reset affects the
document: an OS preference is document-wide, and this collection is currently the
only layout-animation consumer. Content is not remounted and focus is retained.
Scene labels retain their own `clamp(1.875rem,5vw,4.375rem)` and -.04em tracking.
Hidden tabs cancel work. Cursor suppression activates only after successful
positioning, stays inside its boundary, and is removed on leave/blur/preferences/
unmount. Inputs, editable content, disabled controls and explicit native targets
keep their system cursor. No perpetual polling loop or wheel interception exists.
The cursor itself uses Manrope. Its page mode has its own theme edge/shadows,
independent of ordinary glass; the clipped label stays centered through resizing.
A permanent utility scoped to CursorBoundary restores native disabled buttons to
hit testing, so their existing native-cursor exclusion works even when the shared
Button uses disabled pointer-event suppression. Native activation/focus bans remain.

## Assets, compatibility and later UI kit

88 original files total 6,437,875 bytes: 80 WebP, photo, two SVG, PDF, two WOFF2,
OFL license and provenance. All 80 source image-manifest paths resolve. Manrope
Latin/Cyrillic coverage is retained. Formatting excludes public originals to keep
hashes stable. Images under `potlucky/oomi-*` represent OOMI, not Potlucky. Resource
transfer neither publishes records nor connects every file to a page.

Photo attribution: [Christophe Laurenceau / Unsplash](https://unsplash.com/@justcallmechristophe).
The supplied PDF stays an asset, without a new home-page download action.

shadcn/Radix is selected for actual complex controls requiring focus, Escape,
portals or keyboard contracts. Other primitives need a concrete benefit over
custom code. Glass, tokens, typography, layout, decoration, cursor and effects are
not wrapped in shadcn by default. Only the already installed Button is used now.

The supported baseline remains Chrome/Edge 111+, Safari/iOS 16.4+, Firefox 128+.
Native glass has solid fallback; View Transitions are optional; CSS uses supported
variables, nesting, layers, clamp and color-mix. No new dependency or loader change.

## Verification contract

The development-only `/{locale}/design-system` is never in the sitemap/public
navigation and returns HTTP 404 in production. A temporary production fixture is
removed before the final build. Check normal routes and fixture styles separately.

Check RU/EN, both themes, 320/375/390/760/767/768/1023/1024/1100/1440/1920px,
accounting for the agreed breakpoint adaptation, long text, enlargement through
200%, focus, reduced motion, hidden documents, denied storage, missing image,
opaque glass, forced colors and no-JS production HTML. Check glass before/during/
after theme change and compare dev with built CSS. Run formatting, both linters,
typecheck, tests, production build and diff checks. Report actual engines and
unavailable checks in chat; this maintained map is not a permanent execution log.

## Source selector inventory

Generated from the fixed source archive. Repeated selectors retain line numbers
because responsive overrides are independently mapped. Group rows above define
owners, states, fallback and verification; deferred selectors are not copied.

| Line | Source selector                                                                                            | Group              | Status                                                     |
| ---- | ---------------------------------------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------- |
| 24   | `:root`                                                                                                    | Tokens/theme       | Adapted                                                    |
| 40   | `:root[data-theme='dark']`                                                                                 | Tokens/theme       | Adapted                                                    |
| 54   | `*`                                                                                                        | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 55   | `html`                                                                                                     | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 56   | `body`                                                                                                     | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 57   | `:root[data-theme-reveal], :root[data-theme-reveal] *`                                                     | Tokens/theme       | Adapted                                                    |
| 58   | `:root[data-theme-reveal]::view-transition-group(root)`                                                    | Tokens/theme       | Adapted                                                    |
| 59   | `:root[data-theme-reveal]::view-transition-old(root), :root[data-theme-reveal]::view-transition-new(root)` | Tokens/theme       | Adapted                                                    |
| 61   | `:root[data-theme-reveal]::view-transition-old(root)`                                                      | Tokens/theme       | Adapted                                                    |
| 62   | `:root[data-theme-reveal]::view-transition-new(root)`                                                      | Tokens/theme       | Adapted                                                    |
| 63   | `:root[data-theme-reveal='expand']::view-transition-new(root)`                                             | Tokens/theme       | Adapted                                                    |
| 64   | `:root[data-theme-reveal='contract']::view-transition-old(root)`                                           | Tokens/theme       | Adapted                                                    |
| 65   | `:root[data-theme-reveal='contract']::view-transition-new(root)`                                           | Tokens/theme       | Adapted                                                    |
| 74   | `button, a`                                                                                                | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 75   | `button`                                                                                                   | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 76   | `a`                                                                                                        | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 77   | `button`                                                                                                   | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 78   | `button:focus-visible, a:focus-visible`                                                                    | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 79   | `::selection`                                                                                              | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 80   | `h1, h2, h3, p, figure`                                                                                    | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 81   | `button, a`                                                                                                | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 82   | `.icon`                                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 83   | `.section-shell`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 84   | `.eyebrow, .small-note, .timeline-date`                                                                    | Typography         | Tokens adapted; UI geometry deferred                       |
| 85   | `.small-note`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 86   | `.muted`                                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 87   | `.section-index`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 88   | `.skip-link`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 89   | `.skip-link:focus`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 90   | `.header`                                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 91   | `.header > *`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 92   | `.brand`                                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 93   | `.brand span`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 94   | `.glass`                                                                                                   | Material           | Adapted                                                    |
| 95   | `.nav`                                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 96   | `.nav-indicator`                                                                                           | Measured indicator | Adapted                                                    |
| 97   | `.nav-indicator[data-ready='true']`                                                                        | Measured indicator | Adapted                                                    |
| 98   | `.nav a`                                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 99   | `.nav a.active`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 100  | `.nav a:not(.active):hover`                                                                                | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 101  | `.nav-return`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 102  | `.nav a.nav-back`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 103  | `.nav-back .icon, .page-back-mobile .icon`                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 104  | `.page-back-mobile`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 105  | `.header-controls`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 106  | `.language-button`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 107  | `.language-button .selected`                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 108  | `.language-divider`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 109  | `.theme-button`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 110  | `.theme-button .icon`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 111  | `.menu-button`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 112  | `.hero`                                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 113  | `.hero-topline`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 114  | `.availability`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 115  | `.status-dot`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 116  | `.hero-grid`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 117  | `.hero-copy`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 118  | `.hero h1`                                                                                                 | Typography         | Tokens adapted; UI geometry deferred                       |
| 119  | `.title-period`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 120  | `.hero-description`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 121  | `.intro-line`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 122  | `.hero-description p`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 123  | `.hero-actions`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 124  | `.button`                                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 125  | `.button:hover`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 126  | `.button-dark`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 127  | `.button .icon`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 128  | `.resume-link`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 129  | `.resume-link .icon`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 130  | `.hero-image`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 131  | `.hero-image > img`                                                                                        | Image layers       | Adapted in technical fixture                               |
| 132  | `.image-grain`                                                                                             | Image layers       | Adapted in technical fixture                               |
| 133  | `.image-coordinate`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 134  | `.image-label`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 135  | `.image-label .icon`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 136  | `.flutter-badge`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 137  | `.flutter-badge svg`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 138  | `.flutter-badge span`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 139  | `.flutter-badge small`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 140  | `.hero-bottom`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 141  | `.scroll-cue`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 142  | `.round-icon`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 143  | `.round-icon .icon`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 144  | `a:hover > .round-icon`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 145  | `.hero-meta`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 146  | `.tiny-cross`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 147  | `.work-section`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 148  | `.section-heading`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 149  | `h2`                                                                                                       | Typography         | Tokens adapted; UI geometry deferred                       |
| 150  | `.title-row`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 151  | `.title-row > p`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 152  | `.projects-grid`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 153  | `.project-filter-grid`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 154  | `.project-filter-item`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 155  | `.project-card`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 156  | `.project-art`                                                                                             | Palette            | Adapted                                                    |
| 157  | `.project-card:hover .project-art`                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 158  | `.art-top, .art-bottom`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 159  | `.art-top`                                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 160  | `.art-bottom`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 161  | `.art-arrow`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 162  | `.art-arrow .icon`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 163  | `.project-card:hover .art-arrow`                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 164  | `:is(.project-art, .page-transition).project-onetouch`                                                     | Scene transition   | Adapted; router integration excluded                       |
| 165  | `:is(.project-art, .page-transition).project-potlucky`                                                     | Scene transition   | Adapted; router integration excluded                       |
| 166  | `:is(.project-art, .page-transition).project-immergas`                                                     | Scene transition   | Adapted; router integration excluded                       |
| 167  | `:is(.project-art, .page-transition).project-klimatprof`                                                   | Scene transition   | Adapted; router integration excluded                       |
| 168  | `:is(.project-art, .page-transition).project-checkai`                                                      | Scene transition   | Adapted; router integration excluded                       |
| 169  | `:is(.project-art, .page-transition).project-galleria-minsk`                                               | Scene transition   | Adapted; router integration excluded                       |
| 170  | `:is(.project-art, .page-transition).project-golden-plate`                                                 | Scene transition   | Adapted; router integration excluded                       |
| 171  | `:is(.project-art, .page-transition).project-aventin`                                                      | Scene transition   | Adapted; router integration excluded                       |
| 172  | `:root[data-theme='dark'] .project-art`                                                                    | Tokens/theme       | Adapted                                                    |
| 173  | `:root[data-theme='dark'] .project-potlucky`                                                               | Tokens/theme       | Adapted                                                    |
| 174  | `.cover-type`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 175  | `.project-card:hover .cover-type`                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 176  | `.cover-kicker`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 177  | `.cover-name`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 178  | `.cover-name > span`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 179  | `.featured-grid`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 180  | `.featured-grid .project-art`                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 181  | `.featured-grid .project-caption`                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 182  | `.featured-grid .art-top`                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 183  | `.hero-actions`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 184  | `.hh-link`                                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 185  | `.contact-documents`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 186  | `.project-caption`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 187  | `.project-caption h3`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 188  | `.project-caption > span`                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 189  | `.all-projects-link`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 190  | `.all-projects-link sup`                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 191  | `.about-section`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 192  | `.about-grid`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 193  | `.about-grid h2`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 194  | `.large-paragraph`                                                                                         | Typography         | Tokens adapted; UI geometry deferred                       |
| 195  | `.about-body > p:not(.large-paragraph)`                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 196  | `.about-details`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 197  | `.about-details > span`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 198  | `.about-details small`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 199  | `.stack-row`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 200  | `.stack-row > .eyebrow`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 201  | `.skill-tags`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 202  | `.skill-tags > span`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 203  | `.experience-section`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 204  | `.experience-grid`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 205  | `.experience-grid > h2`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 206  | `.timeline-item`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 207  | `.timeline-item + .timeline-item`                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 208  | `.timeline-date`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 209  | `.timeline-title`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 210  | `.timeline-item h3`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 211  | `.current-pill`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 212  | `.role`                                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 213  | `.timeline-item p`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 214  | `.timeline-projects`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 215  | `.inline-link`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 216  | `.inline-link .icon`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 217  | `.education-grid`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 218  | `.education-grid > .eyebrow`                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 219  | `.education-item`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 220  | `.education-item + .education-item`                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 221  | `.education-item > span`                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 222  | `.education-item > span > small`                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 223  | `.education-item h3`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 224  | `.education-item p`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 225  | `.courses`                                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 226  | `.contact-section`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 227  | `.contact-section .section-heading`                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 228  | `.contact-title-row`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 229  | `.contact-title-row h2`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 230  | `.contact-orb`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 231  | `.contact-orb .icon`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 232  | `.contact-orb:hover`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 233  | `.contact-description`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 234  | `.contact-links`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 235  | `.contact-links > a`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 236  | `.contact-links a > span`                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 237  | `.contact-links small`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 238  | `.contact-links .icon`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 239  | `.contact-links a:hover .icon`                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 240  | `footer`                                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 241  | `footer button`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 242  | `footer button .icon`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 243  | `.portfolio-page, .project-page`                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 244  | `.page-title`                                                                                              | Typography         | Tokens adapted; UI geometry deferred                       |
| 245  | `.page-title > sup`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 246  | `.portfolio-intro`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 247  | `.portfolio-intro > p`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 248  | `.filters`                                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 249  | `.filters button`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 250  | `.filters button.active`                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 251  | `.filters sup`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 252  | `.project-art--hero`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 253  | `.project-hero-meta, .project-hero-footer`                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 254  | `.project-hero-meta > span, .project-hero-footer > span, .project-hero-copy`                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 255  | `.project-hero-kicker`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 256  | `.project-hero-title`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 257  | `.project-hero-title > span`                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 258  | `.project-hero-period`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 259  | `.project-hero-tagline`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 260  | `.project-details-grid`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 261  | `.project-details-grid[id], #portfolio-projects`                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 262  | `html:has(.project-page, .portfolio-page)`                                                                 | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 263  | `.project-details-grid > .eyebrow`                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 264  | `.project-facts`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 265  | `.project-facts .eyebrow`                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 266  | `.project-facts p`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 267  | `.contributions`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 268  | `.contributions > li`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 269  | `.contributions li > span`                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 270  | `.contributions p`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 271  | `.product-link`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 272  | `.engineering-story`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 273  | `.engineering-story h2`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 274  | `.engineering-story > div`                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 275  | `.engineering-story h3`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 276  | `.engineering-story p`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 277  | `.project-public-links`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 278  | `.project-gallery`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 279  | `.gallery-heading`                                                                                         | Gallery            | Deferred to UI kit                                         |
| 280  | `.gallery-heading h2`                                                                                      | Gallery            | Deferred to UI kit                                         |
| 281  | `.gallery-group + .gallery-group`                                                                          | Gallery            | Deferred to UI kit                                         |
| 282  | `.gallery-group-heading`                                                                                   | Gallery            | Deferred to UI kit                                         |
| 283  | `.gallery-group-heading > h3`                                                                              | Gallery            | Deferred to UI kit                                         |
| 284  | `.gallery-group-heading > h3 > span`                                                                       | Gallery            | Deferred to UI kit                                         |
| 285  | `.gallery-rail-controls`                                                                                   | Gallery            | Deferred to UI kit                                         |
| 286  | `.gallery-rail-controls .gallery-control:disabled`                                                         | Gallery            | Deferred to UI kit                                         |
| 287  | `.gallery-rail-controls .gallery-control:disabled:hover`                                                   | Gallery            | Deferred to UI kit                                         |
| 288  | `.gallery-rail`                                                                                            | Gallery            | Deferred to UI kit                                         |
| 289  | `.gallery-rail figure`                                                                                     | Gallery            | Deferred to UI kit                                         |
| 290  | `.gallery-thumbnail`                                                                                       | Gallery            | Deferred to UI kit                                         |
| 291  | `.gallery-thumbnail img`                                                                                   | Gallery            | Deferred to UI kit                                         |
| 292  | `.gallery-thumbnail:hover img`                                                                             | Gallery            | Deferred to UI kit                                         |
| 293  | `.thumbnail-fallback`                                                                                      | Gallery            | Deferred to UI kit                                         |
| 294  | `.gallery-enlarge`                                                                                         | Gallery            | Deferred to UI kit                                         |
| 295  | `.gallery-enlarge .icon`                                                                                   | Gallery            | Deferred to UI kit                                         |
| 296  | `.gallery-thumbnail:is(:hover, :focus-visible) .gallery-enlarge`                                           | Gallery            | Deferred to UI kit                                         |
| 297  | `.gallery-rail figcaption`                                                                                 | Gallery            | Deferred to UI kit                                         |
| 298  | `.gallery-rail figcaption > span`                                                                          | Gallery            | Deferred to UI kit                                         |
| 299  | `.gallery-dialog`                                                                                          | Gallery            | Deferred to UI kit                                         |
| 300  | `.gallery-dialog[open]`                                                                                    | Gallery            | Deferred to UI kit                                         |
| 301  | `.gallery-dialog::backdrop`                                                                                | Gallery            | Deferred to UI kit                                         |
| 302  | `.gallery-dialog, .gallery-dialog *`                                                                       | Gallery            | Deferred to UI kit                                         |
| 303  | `.gallery-dialog button`                                                                                   | Gallery            | Deferred to UI kit                                         |
| 304  | `.gallery-dialog button:focus-visible`                                                                     | Gallery            | Deferred to UI kit                                         |
| 305  | `.lightbox-toolbar`                                                                                        | Gallery            | Deferred to UI kit                                         |
| 306  | `.lightbox-toolbar > p`                                                                                    | Gallery            | Deferred to UI kit                                         |
| 307  | `.lightbox-toolbar > p > span`                                                                             | Gallery            | Deferred to UI kit                                         |
| 308  | `.gallery-control`                                                                                         | Gallery            | Deferred to UI kit                                         |
| 309  | `.gallery-control:hover`                                                                                   | Gallery            | Deferred to UI kit                                         |
| 310  | `.gallery-control .icon`                                                                                   | Gallery            | Deferred to UI kit                                         |
| 311  | `.lightbox-stage`                                                                                          | Gallery            | Deferred to UI kit                                         |
| 312  | `.lightbox-stage > img`                                                                                    | Gallery            | Deferred to UI kit                                         |
| 313  | `.lightbox-stage.is-zoomed`                                                                                | Gallery            | Deferred to UI kit                                         |
| 314  | `.lightbox-stage.is-zoomed > img`                                                                          | Gallery            | Deferred to UI kit                                         |
| 315  | `.lightbox-footer`                                                                                         | Gallery            | Deferred to UI kit                                         |
| 316  | `.lightbox-footer > div`                                                                                   | Gallery            | Deferred to UI kit                                         |
| 317  | `.lightbox-footer p`                                                                                       | Gallery            | Deferred to UI kit                                         |
| 318  | `.lightbox-footer span`                                                                                    | Gallery            | Deferred to UI kit                                         |
| 319  | `.gallery-error`                                                                                           | Gallery            | Deferred to UI kit                                         |
| 320  | `.gallery-error button`                                                                                    | Gallery            | Deferred to UI kit                                         |
| 321  | `.next-project`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 322  | `.next-project > span`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 323  | `.next-project small`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 324  | `.next-project > .icon`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 325  | `.not-found`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 326  | `.not-found h1`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 327  | `.cursor`                                                                                                  | Cursor             | Adapted; unconditional native suppression excluded         |
| 328  | `.cursor[data-mode='link']`                                                                                | Cursor             | Adapted; unconditional native suppression excluded         |
| 329  | `.cursor[data-mode='page']`                                                                                | Cursor             | Adapted; unconditional native suppression excluded         |
| 330  | `:root:not([data-theme='dark']) :is(.nav.glass, .cursor[data-mode='page'])`                                | Tokens/theme       | Adapted                                                    |
| 334  | `.page-transition`                                                                                         | Scene transition   | Adapted; router integration excluded                       |
| 335  | `.transition-cover`                                                                                        | Scene transition   | Adapted; router integration excluded                       |
| 336  | `.transition-reveal`                                                                                       | Scene transition   | Adapted; router integration excluded                       |
| 337  | `.page-transition > span`                                                                                  | Scene transition   | Adapted; router integration excluded                       |
| 338  | `.page-transition:is(.project-potlucky, .project-golden-plate) > span`                                     | Scene transition   | Adapted; router integration excluded                       |
| 349  | `.hero`                                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 350  | `.hero-topline`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 351  | `.hero-description`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 352  | `.hero-actions`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 355  | `.nav a`                                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 356  | `.header-controls`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 357  | `.hero`                                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 358  | `.hero-grid`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 359  | `.hero-image`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 360  | `.hero h1`                                                                                                 | Typography         | Tokens adapted; UI geometry deferred                       |
| 361  | `.hero-description`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 362  | `.hero-description p`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 363  | `.hero-actions`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 364  | `.button`                                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 365  | `.resume-link`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 366  | `.flutter-badge`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 367  | `.hero-meta`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 368  | `.hero-bottom`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 369  | `.large-paragraph`                                                                                         | Typography         | Tokens adapted; UI geometry deferred                       |
| 370  | `.about-grid, .experience-grid, .education-grid`                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 371  | `.contact-orb`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 374  | `.section-shell`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 375  | `.header`                                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 376  | `.brand`                                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 377  | `.header-controls`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 378  | `.language-button`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 379  | `.theme-button`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 380  | `.menu-button`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 381  | `.menu-button .icon`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 382  | `.nav`                                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 383  | `.nav.nav-open`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 384  | `.nav-return`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 385  | `.page-back-mobile`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 386  | `.nav a`                                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 387  | `.hero`                                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 388  | `.hero-topline`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 389  | `.hero-topline .eyebrow`                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 390  | `.hero-topline .availability`                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 391  | `.hero-grid`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 392  | `.hero h1`                                                                                                 | Typography         | Tokens adapted; UI geometry deferred                       |
| 393  | `.hero-description`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 394  | `.hero-description p`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 395  | `.hero-actions`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 396  | `.button`                                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 397  | `.resume-link`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 398  | `.hero-image`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 399  | `.hero-image > img`                                                                                        | Image layers       | Adapted in technical fixture                               |
| 400  | `.flutter-badge`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 401  | `.flutter-badge svg`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 402  | `.flutter-badge span`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 403  | `.image-coordinate`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 404  | `.image-label`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 405  | `.hero-bottom`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 406  | `.scroll-cue`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 407  | `.scroll-cue .round-icon`                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 408  | `.hero-meta`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 409  | `.hero-meta .tiny-cross`                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 410  | `.hero-meta > span:last-child`                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 411  | `.work-section`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 412  | `.eyebrow, .small-note`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 413  | `.section-index`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 414  | `.section-heading`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 415  | `.section-heading .small-note`                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 416  | `.title-row`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 417  | `h2`                                                                                                       | Typography         | Tokens adapted; UI geometry deferred                       |
| 418  | `.title-row > p`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 419  | `.projects-grid`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 420  | `.project-art`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 421  | `.featured-grid`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 422  | `.featured-grid .project-art`                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 423  | `.featured-grid .project-caption`                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 424  | `.art-top`                                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 425  | `.art-bottom`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 426  | `.project-caption`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 427  | `.project-caption h3`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 428  | `.project-caption > span`                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 429  | `.all-projects-link`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 430  | `.about-section, .experience-section`                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 431  | `.about-grid, .experience-grid`                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 432  | `.about-grid h2`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 433  | `.large-paragraph`                                                                                         | Typography         | Tokens adapted; UI geometry deferred                       |
| 434  | `.about-body > p:not(.large-paragraph)`                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 435  | `.about-details`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 436  | `.stack-row`                                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 437  | `.skill-tags`                                                                                              | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 438  | `.skill-tags > span`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 439  | `.timeline-item h3`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 440  | `.timeline-date`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 441  | `.timeline-item p`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 442  | `.education-grid`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 443  | `.education-item`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 444  | `.education-item h3`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 445  | `.education-item p`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 446  | `.courses`                                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 447  | `.contact-section`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 448  | `.contact-section .section-heading`                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 449  | `.contact-section .availability`                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 450  | `.contact-section .status-dot`                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 451  | `.contact-title-row h2`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 452  | `.contact-orb`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 453  | `.contact-orb .icon`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 454  | `.contact-description`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 455  | `.contact-links`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 456  | `.contact-links > a`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 457  | `.contact-links a > span`                                                                                  | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 458  | `.contact-links small`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 459  | `footer`                                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 460  | `footer > span:nth-child(2)`                                                                               | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 461  | `footer button`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 462  | `.portfolio-page, .project-page`                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 463  | `.portfolio-page .section-heading .availability`                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 464  | `.page-title`                                                                                              | Typography         | Tokens adapted; UI geometry deferred                       |
| 465  | `.page-title > sup`                                                                                        | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 466  | `.portfolio-intro`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 467  | `.portfolio-intro > p`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 468  | `.portfolio-intro > .small-note`                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 469  | `.filters`                                                                                                 | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 470  | `.filters button`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 471  | `.filters sup`                                                                                             | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 472  | `.project-art--hero`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 473  | `.project-hero-meta`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 474  | `.project-hero-footer`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 475  | `.project-hero-title`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 476  | `.project-hero-tagline`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 477  | `.project-gallery`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 478  | `.gallery-heading`                                                                                         | Gallery            | Deferred to UI kit                                         |
| 479  | `.gallery-heading h2`                                                                                      | Gallery            | Deferred to UI kit                                         |
| 480  | `.gallery-rail`                                                                                            | Gallery            | Deferred to UI kit                                         |
| 481  | `.gallery-thumbnail`                                                                                       | Gallery            | Deferred to UI kit                                         |
| 482  | `.gallery-enlarge`                                                                                         | Gallery            | Deferred to UI kit                                         |
| 483  | `.engineering-story h2`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 484  | `.lightbox-toolbar`                                                                                        | Gallery            | Deferred to UI kit                                         |
| 485  | `.lightbox-stage`                                                                                          | Gallery            | Deferred to UI kit                                         |
| 486  | `.lightbox-footer`                                                                                         | Gallery            | Deferred to UI kit                                         |
| 487  | `.contact-documents`                                                                                       | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 488  | `.project-details-grid`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 489  | `.project-facts`                                                                                           | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 490  | `.project-facts p`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 491  | `.contributions p`                                                                                         | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 492  | `.contributions > li`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 493  | `.next-project`                                                                                            | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 494  | `.next-project > span`                                                                                     | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 495  | `.next-project > .icon`                                                                                    | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 496  | `.next-project small`                                                                                      | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 499  | `.cursor`                                                                                                  | Cursor             | Adapted; unconditional native suppression excluded         |
| 502  | `html`                                                                                                     | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 503  | `*, *::before, *::after`                                                                                   | UI/presentation    | Deferred; shared effect parameters demonstrated separately |
| 506  | `html`                                                                                                     | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 507  | `main > section`                                                                                           | Document/reset     | Adapted to existing base; unsafe globals excluded          |
| 510  | `body, a, button`                                                                                          | UI/presentation    | Deferred; shared effect parameters demonstrated separately |

## Public home and catalogue composition

The public home now composes the migrated UI kit: HomeHero/HomePhoto, selected
ProjectCards, about/toolkit, experience/education/courses and ContactSection/footer.
The page shell reuses PortfolioNavigation, LanguageLinks, ThemeToggle and
CursorBoundary. Document scrolling belongs to PageHeader; technical samples keep
local scrollers. Source grids, section rhythm and typography retain the normalized
768/1024/1536px breakpoints. Long text can grow instead of clipping. TextLink's
optional start icon position reproduces the home scroll cue without changing its
existing consumers.

The catalogue at `/{locale}/projects` renders query-filtered HTML on the server.
Its GET form uses all/commerce/service; App Router enhances navigation and history,
AnimatedItems receives stable IDs and ready server card nodes. Public counters and
featured ordering come from published localized JSON, not workbench fixtures.
The source hash-router and manual history restoration are not imported.

PageRuntime adapts the existing scene sequence to explicit page links/cards using
the shared transition lock. The 600ms cover is followed by route dispatch; reveal
waits for the pathname to commit, with an 8s bound. The overlay cannot retain a lock
after cancellation. Reduced motion bypasses the effect on all input types; preference and
visibility changes settle navigation immediately. Back/Forward cancels stale work.
Native modified clicks, external links, downloads and no-JS navigation are preserved.
Route palette colors are read from the card's existing palette boundary. The
technical SceneTransition wrapper retains its own API and fixture behavior.
The public circle follows the latest pointer position throughout cover, route
arrival and reveal. One pending animation frame updates CSS geometry; phase changes
retain the position and animation progress. Resize clamps the center and updates
the viewport diagonal, and completion/cancellation removes tracking subscriptions.

Public route links/cards carry the large labeled cursor; service actions, anchors,
filters, theme and language use the small translucent cursor. Case pages have their
own CursorBoundary. Native cursor/accessibility exclusions remain unchanged.
Same-document anchors use a cancellable cubic ease-in-out scroll lasting
min(1200, 600 + distance * 0.15) milliseconds, honoring scroll-margin and document
bounds. Manual scrolling, Escape, resize, history, replacement anchors and routes
stop it without a jump. Reduced motion settles the target immediately; native href,
hash, focus and no-JS navigation remain available.

The catalogue return link opts into the route effect through backLink.animateRoute.
The hero's native #work CTA scrolls/focuses the selected-work section without a
route effect, including without JavaScript. If no featured translation is available,
both its CTA and the project navigation link instead open the localized catalogue
with route effects; if no projects are published, both links are omitted. Localized
work/education/course lists own experience visibility and its navigation link.
Pending route effects suppress same-document anchor activation before hash/focus
changes, and pathname commits cancel any old anchor frames. Global CSS is imported
before component Modules and registers properties/theme/base/components/utilities
in that order; the built-material check validates delivered stylesheet precedence.
HomePhoto uses the owner's original
JPEG portrait with CSS-only cropping/monochrome and localized alt text; stock-photo
credit and architectural captions are absent. The architecture asset stays in the kit.

Editorial facts are validated server-side from portfolio.json. The newly supplied
CV (updated 20 October 2026) supersedes the archive PDF at its existing URL and has
an updated inventory hash. Middle positioning, SMD's October 2026 end date and
expected 2028 graduation intentionally supersede outdated source copy. The source
photo, fonts, project images and provenance retain their original bytes. OOMI
screenshots are not relabeled as Potlucky.

## Public case composition

The selector inventory above records the original migration classification. Case
composition is now implemented in `portfolio/project-detail.tsx`: ProjectCover,
overview/facts, contributions, engineering story, ProjectGallery, technology tags,
existing public links, next-project link and ContactSection. PageShell/PageHeader
own published language destinations, catalogue return and section navigation.
The presentation uses Tailwind utilities and existing component Modules; it does
not introduce another global stylesheet, cursor owner or transition runtime.

Desktop case gutters are 5%, top/bottom padding 170/100px, detail section margin
65px and column gap 60px with a 1:1.8 ratio. Below 768px, gutters are 6%, padding
127/60px and detail margin/gap 38/22px. Rem-based values preserve text enlargement;
section anchors use the application's accessible header clearance. Cover geometry
and gallery rails/modal remain owned by their existing components. Source periods
claiming ongoing employment are not copied without confirmed per-project dates.
