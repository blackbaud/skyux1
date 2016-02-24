---
name: Select Field
icon: search-plus
summary: The select field control launches a modal with items available for selection.
---

The select field control launches a modal with items available for selection. The select field can be set to use either single or multi select mode depending on whether the field permits multiple selections. In multi-select mode, the selected items appear below the select field, while in single-select mode, the selected item appears within the select field.

### Select Field Settings ###
  - `bb-select-field` &mdash; Creates a control which launches a modal with items available for selection.
    - `bb-select-field-selected-items` &mdash; The array of items selected by the control.
    - `bb-select-field-text` &mdash; The text that appears in the multi-select mode select field.
    - `bb-select-field-style` &mdash; When set to `single`, single-select styling will be used for the select field. Otherwise, multi-select styling will be used for the select field.
    - `bb-select-field-picker` &mdash; The directive that defines the contents of the select field picker.
      - `bb-select-field-picker-template` &mdash; The template for the contents of the select field picker modal. Generally includes a `bb-checklist-control`.
      - `bb-select-field-picker-header` &mdash; *(Optional.)* The header text for the select field picker modal. If not defined, it will be set to 'Select value'.
