---
name: Sectioned form
icon: object-group
summary: A sectioned form combines multiple forms while allowing users to target specific independent areas.
---

Sectioned forms are used when displaying a large amount of conceptually related information.

### Sectioned form settings ###
- `bb-sectioned-form-sections` &mdash; An array of sections. Each section can have the following properties:
    - `formName` &mdash; *(Optional.)* A form name to associate with the section.  If specified, the sectioned form will provide a visual indicator if any required fields are present and if the section is invalid after being submitted.  The functionality provided around forms requires that the sectioned form component have a parent form of which the section forms are children.
    - `heading` &mdash; The display text used to identify the section.
    - `itemCount` &mdash; *(Optional.)* The number of items contained within a given section.
    - `templateUrl` &mdash; The URL to the section's content template.
- `bb-sectioned-form-on-sections-visibility-change()` &mdash; An optional expression called when the form sections' visibility is changed.  The expression will be called with the following properties:
    - `data` &mdash; State representation pertaining to the visibility change.
        - `visible` &mdash; The visible state of the sections.
- `bb-sectioned-form-active-section-index` &mdash; The index of a section that should be made active.
- `bb-sectioned-form-on-active-section-index-change()` &mdash; An optional expression called when the active section is changed.  The expression will be called with the following properties:
    - `index` &mdash; The index of the active section.

### Sectioned form events ###
- `reinitializeSectionDisplay` &mdash; Causes the form to revert to its initial display state.

### Modal directive settings ###
- `bb-sectioned-modal` &mdash; An attribute that may be applied to the bb-modal directive in order to style the modal for use with a sectioned form.