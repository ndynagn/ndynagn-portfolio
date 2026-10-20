# Styling rules

Mandatory for CSS, Tailwind classes, UI and animation changes throughout `src`.
Read the root, source and applicable local `AGENTS.md` files as well. These rules
apply to new and modified code; do not mass-migrate unrelated or generated code.
Examples illustrate technical patterns, not portfolio content or approved designs.

The requirements have different sources; their origin does not change their scope:

| Origin                  | Meaning in this document                                                   | Authoritative source                                                                                               |
| ----------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Tool constraint         | Syntax, processing and detection behavior the tool implements              | Installed Next.js/Stylelint documentation and [Tailwind compatibility](https://tailwindcss.com/docs/compatibility) |
| Upstream recommendation | A manufacturer's preferred approach, adapted to this stack                 | [Next.js CSS guide](../node_modules/next/dist/docs/01-app/01-getting-started/11-css.md) and Tailwind documentation |
| Project policy          | Our mandatory choice among supported alternatives                          | This document and applicable `AGENTS.md` files                                                                     |
| Accessibility criterion | The specified WCAG success criterion, not a claim of full WCAG conformance | WCAG references in section 13                                                                                      |

Naming, units, spacing ownership, declaration grouping, layer placement and the
specificity/nesting limits are project policies, not universal manufacturer
requirements. Tailwind-first follows Next.js guidance. Tailwind permits Modules
but recommends avoiding unnecessary use; our plain-CSS exception is a project
choice. Restricting `@apply` and CSS-in-JS is also project policy; Tailwind's
preprocessor compatibility limitation is documented upstream.

## 1. Choose a styling owner

| Need                                                                      | Use                      | Boundary                                                                           |
| ------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------- |
| Layout, typography, colors, spacing, sizes and states                     | Tailwind utilities       | Default for authoring components, including shadcn consumers                       |
| Local keyframes, coordinated pseudo-elements or related complex selectors | Colocated CSS Module     | A long `className` alone is not a reason to introduce a Module                     |
| Imports, shared tokens, themes, HTML defaults and global accessibility    | Global CSS               | No feature-specific UI selectors                                                   |
| Runtime coordinates, progress or measured dimensions                      | Inline custom properties | Static declarations remain in classes; Motion may own its runtime animation styles |

Choose per responsibility, not per file size. A component may combine utilities
with a Module when they own different properties. If two systems set the same
property in the same state, remove the duplicate owner or expose an explicit
component variant. `cn` does not resolve Module declarations against utilities.

Verify ownership in review; a CSS linter cannot choose the correct architecture.

## 2. Preprocessors and runtime styling libraries

Use native CSS variables, nesting, `calc()`, `min()`, `max()` and `clamp()`.
Do not add Sass/SCSS, Less, Stylus or CSS-in-JS to this stack. Tailwind v4 owns its
CSS processing; adding a preprocessor is not a solution for ordinary nesting or
variables. An actual unsupported responsibility requires a separate architecture
change describing its consumer, build compatibility, alternatives and bundle cost.
Precompiled third-party CSS is not permission to add its source preprocessor.

Verify dependency/configuration diffs. Preserve exact direct dependency versions
when adding an approved tool and update the lockfile only through pnpm.

## 3. Files, names and imports

- Keep `<component>.module.css` beside its owning component. Use lower-kebab-case
  for files, classes and keyframes; access names as `styles['card-surface']`.
- A file shared within one feature stays with that feature. Promote styling to
  shared only under the reuse rules in `shared/AGENTS.md`; prefer a component over
  an unrelated grab bag of classes. Do not create empty style directories.
- Import a Module from its owner. Preserve CSS side-effect order when changing
  imports; automatic import sorting must not move stylesheets.
- The locale root layout imports global CSS once. Global CSS may import focused
  theme/base files if splitting a real responsibility becomes useful; do not
  reimport Tailwind from each component or route.
- Import required third-party global CSS once from the application composition
  boundary. Review its reset, layers and persistent effects across navigation.

Verify file ownership/imports in review and stylesheet ordering in a production
build, including navigation between affected routes.

## 4. Global CSS

`app/globals.css` owns Tailwind/library imports, semantic light/dark tokens, theme
mapping and base accessibility. Keep imports before ordinary rules. Put HTML
defaults in `@layer base`; reuse Tailwind Preflight instead of adding a second reset.
Do not use global element selectors to style a feature. Global styles persist
across App Router navigation; unloading a page is not a cleanup strategy.

Verify global changes on both locales and unrelated routes as well as their caller.

## 5. CSS Modules

Wrap author-defined Module rules in `@layer components`. Every UI selector must
contain a local class owner; type-only/global-only selectors are forbidden. Native
conditional at-rules and locally scoped keyframes are allowed. State attributes and
elements must stay within the owned component's public markup contract.

```css
@layer components {
  .card-surface {
    background: var(--card);
    color: var(--card-foreground);

    &[data-expanded='true'] {
      opacity: 1;
    }
  }
}
```

`:global()` is only for a documented third-party public selector, anchored below a
local class, for example `.chart :global(.vendor-tooltip)`. Never target another
component's private selectors or generated hash. Do not use `composes` to create
hidden cross-component styling dependencies; compose components/classes explicitly.

Preserve immutable public vendor class names even when they are not lower-kebab-case.
For that case only, use an explained `selector-class-pattern` exception on the
nested external selector. Keep the authored owner on a separate, checked line;
do not put additional authored classes on the exempted selector line. Identify the
library/public API in a real integration's reason, and remove the exception if that
API is removed or adopts a conforming name. For example:

```css
@layer components {
  .chart {
    /* stylelint-disable-next-line selector-class-pattern -- VendorChart public tooltip class is immutable; remove with the integration. */
    & :global(.VendorTooltip) {
      color: var(--foreground);
    }
  }
}
```

This uses Stylelint's [scoped exceptions](https://stylelint.io/user-guide/ignore-code/),
not a relaxed naming rule. Other lint rules still apply to the external selector;
the scope and public ownership are reviewed manually.

Modules bypass the Tailwind loader. Use plain declarations and `var()`; no Tailwind
directives, `@apply`, `@reference` or stylesheet `@import` in Modules. Importing the
global stylesheet into a Module duplicates responsibilities and is forbidden.
When changing the loader, verify Module exports, isolation and layer precedence
together with Tailwind in a production build.

## 6. Tailwind authoring

- Prefer existing utilities and semantic tokens. Use a one-off arbitrary value for
  concrete geometry not represented by the scale, not as a parallel design system.
  Repeated values with the same meaning get a token at their common owner.
- Write complete class names in static strings or variant maps. Never interpolate
  fragments such as `bg-${color}-500`; Tailwind does not evaluate such expressions.
- Use the local `shared/ui/cn` helper for conditional/consumer classes and `cva` for
  actual component variants. Public primitive props own intentional variants;
  consumers must not reach into private children to simulate another variant.
- Group classes as layout, sizes/spacing, typography, appearance, effects; keep
  responsive/state variants in a consistent sequence. No new sorting plugin.
- Keep arbitrary variants limited to owned markup or documented library slots.
  Move related complex selector behavior to a Module rather than encoding a
  component's entire DOM structure in selectors at its call site.
- `@apply` is for short global base rules only. `@theme` creates utility tokens;
  `@theme inline` maps utilities to semantic variables. Introduce `@utility` only
  for a reused technical operation with real consumers, not a component class.
- Do not introduce v3 configuration patterns, broad source scanning or safelists to
  work around dynamic class construction. Register an external source only when
  an actual dependency supplies static classes outside automatic detection.

```tsx
const toneClasses = {
  default: 'bg-primary text-primary-foreground',
  muted: 'bg-muted text-muted-foreground',
};
// Use a complete, typed key from the component contract.
const classes = cn('inline-flex items-center gap-2', toneClasses[tone], className);
```

Verify Tailwind class construction in review and generated behavior in the browser;
Stylelint does not inspect JSX classes.

## 7. Cascade, specificity and compatibility between owners

- Preserve the layer order `theme, base, components, utilities` established by
  Tailwind's import. Modules use `components`; do not introduce an unlayered author
  rule to overpower utilities or a new layer to win a local conflict.
- Assign one owner per property and state. Variant changes are intentional;
  contradictory unconditional values from multiple systems are not.
- HTML class order is not CSS precedence. Use `cn` for supported Tailwind conflicts,
  not as a CSS cascade analyzer. Inline values should only own runtime data.
- Ban ID selectors. Maximum specificity is `0,3,1`; maximum nesting depth is `2`.
  These thresholds are project policies. Under Stylelint's counting, a root rule
  has depth `0` and can contain two further nested levels. Nested rules and block
  at-rules consume levels; root-level at-rules such as `@layer`/`@media` do not.
  Conditional wrappers do not reset depth or justify deeper DOM coupling. Prefer
  a direct class or `:where()` over adding specificity to defeat a conflict.
- `!important` is forbidden except a narrowly documented accessibility or external
  integration constraint that cannot be solved at its owner. Never use important
  utilities as a routine override. Important declarations reverse layer precedence.
- Import ordinary precompiled third-party CSS into the `components.vendor` sublayer
  at the global composition boundary. Keep authored component rules directly in
  `components`, not in `components.vendor`; keep utilities in `utilities`. Do not
  append a new top-level vendor layer after utilities. If the library cannot be
  layered, document its public override contract and test the real cascade.

The import pattern below is illustrative; do not add a vendor dependency or import
without a real consumer. Declare the order before imports, then keep imports before
ordinary rules:

```css
@layer theme, base, components, utilities;

@import 'tailwindcss';
@import 'vendor-package/styles.css' layer(components.vendor);
```

For normal author declarations, `components.vendor` loses to rules directly in
`components`, which lose to `utilities`, independent of specificity between those
layers. This project arrangement relies on the [CSS layer ordering rules](https://www.w3.org/TR/css-cascade-5/#layer-order);
important declarations reverse layer precedence and still require an explicit
integration contract. Importing a library into a newly declared top-level layer
after utilities would give that library higher normal priority instead.

Nesting examples follow the [Stylelint depth definition](https://stylelint.io/user-guide/rules/max-nesting-depth/).
Allowed: the root-level layer is free, and two levels are nested below the root rule:

```css
@layer components {
  .surface {
    /* depth 0 */
    .content {
      /* depth 1 */
      .action {
        /* depth 2 */
        opacity: 1;
      }
    }
  }
}
```

Rejected: the nested conditional consumes depth 2, so its child is too deep:

```css
.surface {
  /* depth 0 */
  .content {
    /* depth 1 */
    @media (width >= 40rem) {
      /* depth 2 */
      &:hover {
        /* depth 3 */
        opacity: 1;
      }
    }
  }
}
```

Verify lint limits, computed styles and production route navigation. The existing
global reduced-motion override intentionally takes priority even over inline motion.

## 8. Units and dimensions

| Responsibility                        | Unit or mechanism                                                        |
| ------------------------------------- | ------------------------------------------------------------------------ |
| General font sizes                    | `rem`; `em` only for deliberate scaling relative to local text           |
| Line height                           | Unitless number or `normal`; preserve unitless values through tokens     |
| Letter spacing                        | `em`                                                                     |
| Routine spacing                       | Tailwind scale, based on `0.25rem`; use the existing utility first       |
| Layout tracks and fluid width         | Flex/grid, `auto`, `%`, `fr`; `rem` for general width constraints        |
| Content height                        | Automatic; prefer a minimum height to a fixed text-box height            |
| Thin borders and exact visual details | `px`; retain existing shadcn radius formulas                             |
| Icons                                 | Size utilities, or `em` when tied to adjacent text size                  |
| Text measure                          | `ch` when the constraint expresses readable line length                  |
| Full viewport regions                 | `svh` for a stable area, `dvh` to follow the visible viewport            |
| Transitions / long-running animation  | `ms` / `s`, respectively                                                 |
| Zero lengths                          | `0`, except typed calculations/custom properties requiring a length unit |

Do not set the root font size to `62.5%`, or override the user's default to simplify
conversions. Fluid text uses scalable bounds, for example
`font-size: clamp(1.5rem, 1rem + 2vw, 3rem)`, not viewport-only typography.
Use `aspect-ratio` for media geometry. Fixed dimensions require an actual geometric
contract, such as an icon or visual canvas, and must not clip translated text.

Stylelint checks explicit typography units and zero lengths. Review token units,
Tailwind arbitrary values, formulas and runtime values separately; the linter does
not infer the semantic type of `var()` across files.

## 9. Spacing ownership

The parent owns placement and spacing between children, preferably through `gap`.
The component owns its internal `padding`. Reusable components do not impose
external margins on their consumers. Composition may pass placement classes to an
explicit root `className` API, without overriding internal layout responsibilities.

```tsx
<section className="grid gap-6 sm:grid-cols-2">
  <article className="rounded-lg border p-5">...</article>
  <article className="rounded-lg border p-5">...</article>
</section>
```

Use `margin` for a concrete flow requirement, such as `mx-auto` centering or an
isolated block's separation, without doubling a parent's `gap`. Existing `space-y-*`
can remain for simple normal-flow stacks; prefer `gap` for new flex/grid layouts.
Negative spacing and absolute positioning are for intentional overlap; explain the
reason at the component. They must not repair an unexplained layout discrepancy.
Prefer logical directional properties (`margin-inline-start`, `padding-block`,
`ms-*`, `ps-*`); keep physical coordinates for genuinely physical anchors.

Verify computed gaps/padding and alignment at mobile/desktop sizes; review owns the
semantic choice between `margin`, `padding` and `gap`.

## 10. Variables, themes and stacking

- Global semantic roles and their OS light/dark values live in global CSS. Keep
  shadcn names such as `--background`, `--foreground`, `--primary` and `--ring`;
  map utility namespaces through the existing `@theme inline` block.
- Component-specific variables live on the nearest component root and use
  `--<component>-<purpose>`. Avoid polluting `:root` with private geometry.
- Global tokens express shared roles. Local variables express real local reuse or
  an explicit runtime/customization input. Do not create a token for every number.
- Semantic colors belong in tokens; use `currentColor` for inherited icon color
  and `transparent` where appropriate. Do not scatter literal theme colors through
  features or add matching JS constants as another source of truth.
- Use `var()` to consume tokens in Modules. Runtime code may provide typed custom
  property values for measured inputs; it must not duplicate static theme values.
- Preserve `prefers-color-scheme` and `color-scheme: light dark`; do not introduce a
  theme class or picker until that product behavior is accepted.
- Prefer natural stacking contexts. Document a new shared z-index role alongside
  its real consumer, expose a semantic token if shared, and check relative order
  against existing overlays. No arbitrary escalation to values such as `9999`.
- Do not use a fallback to hide a misspelled mandatory token. A `var()` fallback
  needs a genuinely optional input and must be documented at that input's owner.

Verify token naming with lint; review ownership and inspect computed values in both
themes. A linter does not prove that every cross-file variable is defined.

## 11. Code style

Prettier owns indentation, wrapping, quotes and whitespace under the root config:
four spaces for CSS/TS/TSX, two for Markdown/JSON/YAML, and 100-column wrapping.
Do not hand-format against it or add a competing formatter.

Order declarations by local variables, positioning/layout, dimensions/spacing,
typography, appearance, then effects. Preserve intentional fallback order and
shorthand/longhand semantics. Avoid resetting unrelated longhands with a shorthand.
Keep related state/conditional rules near their base. Comments explain intent,
constraints and exception removal conditions, not obvious property names.

Verify formatting with Prettier; declaration grouping is reviewed manually.
Stylelint checks syntax/conventions, not the visual order of declarations.

## 12. Responsive layout and content

Use mobile-first base styles. Standard min-width breakpoints are `sm: 40rem`,
`md: 48rem`, `lg: 64rem`, `xl: 80rem`, `2xl: 96rem`; Modules use the same literal
boundaries because CSS variables cannot be substituted into ordinary media queries.
A new shared breakpoint changes the theme and this contract together; do not
invent a slightly different breakpoint for every screen.

Use container queries when a reusable component depends on its container rather
than the viewport. Add the container at the nearest composition boundary with a
real sizing responsibility; do not apply containment indiscriminately.

Keep text heights automatic, allow wrapping and set `min-width: 0` on flex/grid
children when intrinsic sizing would overflow. Verify long RU/EN strings and URLs.
Do not hide page overflow to mask a width bug. An intentionally scrolling table,
code block or decorative clip has its own local overflow owner and accessibility.
CSS visual order must not contradict reading/tab order.

Verify reflow from 320 CSS px upward, mobile/desktop layouts, intermediate widths,
and increased text size. A breakpoint is a content/layout decision, not a device ID.

## 13. States and accessibility

Use semantic HTML and real `disabled`/`aria-*`/`data-*` state inputs. CSS reflects
state; it does not implement keyboard behavior or ARIA. Cover hover, focus-visible,
active, disabled and invalid states when the component supports them.

Keep a visible focus indicator; remove a default outline only with a working
replacement. Never make essential information/action available only on hover.
The following are the specific accessibility criteria adopted here:

- [WCAG 1.4.3, Contrast (Minimum)](https://www.w3.org/TR/WCAG22/#contrast-minimum):
  text contrast is at least 4.5:1, or 3:1 for large text. Large means at least
  18 pt in regular weight or 14 pt in bold (or equivalent sizing for CJK fonts).
  These are classification thresholds, not a requirement to author CSS in points;
  keep the project's `rem`/`em` policy. Apply incidental/inactive/logotype exceptions
  only in their actual context. See the [official explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- [WCAG 1.4.11, Non-text Contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast):
  essential visual information identifying controls, states, authored focus cues
  and meaningful graphics has at least 3:1 contrast against adjacent colors.
  This does not require every decorative border to reach 3:1; apply the criterion's
  inactive, unmodified user-agent and essential-presentation exceptions as relevant.
- [WCAG 1.4.4, Resize Text](https://www.w3.org/TR/WCAG22/#resize-text): except for
  captions and images of text, text must resize up to 200% without assistive
  technology and without loss of content or functionality. Verify intermediate
  enlargement steps as well as 200%, including labels and controls. Avoid clipping
  and make sure actions remain usable. See the [official explanation](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html).

These criteria do not constitute a complete WCAG audit. Use `sr-only` for visually
hidden accessible content; do not leave invisible interactive elements focusable
by merely setting opacity. Hidden content must have an explicit focus/accessibility
contract. Retain OS forced-color behavior; do not disable it globally.

Verify keyboard order/focus, supported states, contrast and text enlargement in the
browser. Essential content/navigation must work without JavaScript in production.

## 14. Transitions and animation

CSS owns simple transitions/local effects; Motion owns coordinated interactive
animation. One system owns each animated property on an element. Use distinct
wrappers for independent transforms, rather than replacing another owner's value.

Specify transition properties; do not introduce `transition-all` in author code.
Use shared timing tokens only for actual common timings; keep unique effect timing
local. Prefer opacity/transform to layout animation. Avoid unbounded work, forced
scroll interception and animations that delay focus/navigation. Clean up runtime
subscriptions. Existing generated primitives are not a mass-rewrite target.

Use `motion-reduce:*` or a local reduced-motion media query for CSS effects and the
existing Motion preference handling. Disable optional autoplay, parallax and large
transforms; never hide essential content pending animation or hydration. Do not
rely only on the global duration override to stop runtime animation loops.

Verify normal/reduced motion and initial HTML with JavaScript disabled. Inspect
both runtime and CSS owners when an effect still moves in reduced-motion mode.

## 15. Browser and build compatibility

Support Chrome/Edge 111+, Safari/iOS 16.4+ and Firefox 128+, matching the Tailwind v4
baseline. A utility's existence is not proof that its newer platform feature works
throughout this range. Check support before adding one; supply a working baseline
declaration and `@supports` enhancement when needed. Never gate essential content
on an unsupported feature. Let the build tool own routine vendor prefixes.

Verify CSS order in production, not only Fast Refresh. Build-loader changes need a
Module fixture proving exported classes, selector isolation, semantic variable
inheritance and utilities overriding the components layer. Remove temporary fixture
UI afterward and rebuild the final application. Do not claim a browser was tested
when only static compatibility or another engine was checked.

References: [installed Next.js CSS guide](../node_modules/next/dist/docs/01-app/01-getting-started/11-css.md),
[Tailwind compatibility](https://tailwindcss.com/docs/compatibility),
[theme variables](https://tailwindcss.com/docs/theme),
[class detection](https://tailwindcss.com/docs/detecting-classes-in-source-files).

## 16. Verification, exceptions and maintenance

- `pnpm lint:css` checks `src/**/*.css` with Stylelint; `pnpm lint:js` checks JS/TS
  with ESLint; `pnpm lint` runs both sequentially. Checks never fix automatically.
- `pnpm format:check` owns formatting. `pnpm typecheck`, `pnpm test` and `pnpm build`
  check application/tooling boundaries. Stylelint configuration tests exercise
  accepted Tailwind/Module syntax and rejected rule violations.
- Stylelint checks CSS syntax, duplicates, naming, specificity, nesting, important
  declarations and explicit typography units. It does not inspect JSX/inline
  styles, assign layout ownership, resolve cross-file tokens, assess contrast or
  prove browser support. Those remain review/browser obligations above.
- Do not disable a rule globally to pass one file. Use a rule-specific
  `stylelint-disable-next-line` or the smallest paired disable/enable block, with
  `-- <reason>`. Explain the integration/accessibility need and removal condition
  where applicable; unscoped, descriptionless, invalid and needless disables fail.
  The existing reduced-motion declarations are an intentional scoped exception.
- Review the diff, then verify both locale routes at 375 and 1440 px in light/dark
  modes, keyboard navigation, reduced motion, 200% text and horizontal overflow.
  Test affected component edge cases and JavaScript-disabled production content.
  Report browser engines actually checked and outstanding limitations.
- Keep decisions here and module responsibilities in local `AGENTS.md`; update
  instructions/configuration/tests together when policy changes. Lasting exceptions
  belong to their owner with scope, reason and removal condition. New unsupported
  product behavior must be clarified at its owner rather than invented in CSS.
