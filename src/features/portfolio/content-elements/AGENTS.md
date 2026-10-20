# Content elements

- Export static Server Components through portfolio/content-elements. Accept ready
  readonly localized display data and stable IDs; no catalogue reads, routing,
  date parsing, availability inference or public profile/project writes.
- SectionHeading is an eyebrow row, not a semantic section heading. Its consumer
  owns the actual heading, trailing text/status node and outer spacing. Index text
  is decorative; meaningful aside text uses readable semantic color.
  Text/number asides use the source small-note recipe; ready component nodes retain
  their own typography without inheriting note tracking or font weight.
- ExperienceEntry/EducationEntry default to h3; workbench entries use h4. Reuse
  CurrentLabel, and accept an already composed action (TextLink with source mt-5).
  Consumers own inter-entry gaps and education sibling borders/top spacing.
- Facts use dl/dt/dd. Contributions use ol/li with explicit role=list for VoiceOver
  when markers are visually removed. Ready counter text is decorative; semantic
  list order remains available. Empty facts/contributions render nothing.
  Facts retain the source inline label's 1rem/1.5 surrounding line box within dt;
  the inner span owns its 9px/rem text. This preserves the gap before the value.
- Preserve source Manrope, local subpixel-antialiased and nominal geometry at the
  normalized 768px boundary. Use rem text, growing height, min-width:0 and wrapping.
  Significant dates, year notes, projects and fact labels use muted-foreground,
  not decorative-muted. Force system ink/edges in forced colors.
- Keep roots noninteractive. Reuse TextLink inline/contact and StatusLabel; do not
  introduce animation, focus stops, shared UI duplicates or full page sections.
