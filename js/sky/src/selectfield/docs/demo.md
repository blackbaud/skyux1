---
name: Select field
icon: search-plus
summary: The select field directive launches a modal that displays items for users to select.
---

The select field directive launches a modal that displays items for users to select. By default, the modal allows users to select multiple items. To limit users to a single selection, you can specify single-select mode. In multi-select mode, user selections appear below the select field. In single-selct mode, the selection appears within the field.

### Select field settings ###
  - `bb-select-field` &mdash; Creates a field that launches a modal with items for users to select.
    - `ng-model` &mdash; The array of items that users select on the modal.
    - `bb-select-field-text` &mdash; For multi-select mode, specifies the text to display in the link that opens the modal. For single-select mode, specifies the placeholder text to display in the field until users make selections.
    - `bb-select-field-style` &mdash; *(Optional.)* Indicates whether to display the select field in single- or multi-select mode. By default, the select field uses multi-select mode and you do not need this property. To limit users to a single selection, include this property and set it to `single`.
    - `bb-select-field-click` &mdash; *(Optional.)* Specifies a function to be called when users click the select field. This function is useful when you must fetch the initial items on the modal remotely each time the modal launches.
    - `bb-select-field-picker` &mdash; Defines the content to display in the select field modal.
      - `bb-select-field-picker-template` &mdash; Specifies a template for the content of the modal. The modal generally includes [a `bb-checklist` directive ](../checklist) to create a filterable checkbox list for users to select items.
      - `bb-select-field-picker-header` &mdash; *(Optional.)* Specifies a header for the select field modal. *(Default: 'Select value')*
