---
name: Sectioned form
icon: object-group
summary: A sectioned form combines multiple forms while allowing users to target specific independent areas.
---

Sectioned forms are used when displaying a large amount of conceptually related information.

### Sectioned form settings ###
- `bb-sectioned-form-sections` &mdash; An array of sections. Each section can have the following properties:
    - `formName` &mdash; *(Optional.)* The form name to associate with the section.  If specified, the sectioned form will provide a visual indicator if any required fields are present and if the section is invalid after being submitted.
    - `heading` &mdash; The display text used to identify the section.
    - `itemCount` &mdash; *(Optional.)* The number of items contained within a given section.
    - `templateUrl` &mdash; The URL to the section's content template.