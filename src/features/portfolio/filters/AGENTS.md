# Project filters

- ProjectFilters owns controlled presentation only: ready readonly options, count
  labels, selected value and optional callback. Consumers own categories, counts,
  URLs, filtering and their form. Never read the content catalogue here.
- Use pressed submit buttons, not tabs. Without a callback they submit the owning
  GET form. With a callback prevent submission and forward the value only.
- The optional native field name defaults to category; the workbench supplies
  kitCategory. No workbench URL contract or route destination is embedded here.
- Preserve source geometry at the normalized 768px boundary and 200ms/ease color
  transitions. Count labels are opaque for readable small text. Wrap enlarged text,
  retain visible focus and system forced colors. Do not add a moving indicator.
- Keep subpixel-antialiased local to the group so its labels match source auto
  smoothing without changing the application's global antialiasing.
