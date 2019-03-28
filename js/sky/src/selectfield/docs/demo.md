---
name: Select field
icon: search-plus
summary: The select field directive launches a modal that displays items for users to select.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The select field directive launches a modal that displays items for users to select. By default, the modal allows users to select multiple items. To limit users to a single selection, you can specify single-select mode. In multi-select mode, user selections appear below the select field. In single-selct mode, the selection appears within the field.

### Select field settings ###
  - `bb-select-field` &mdash; Creates a field that launches a modal with items for users to select.
    - `ng-model` &mdash; The array of items that users select on the modal.
    - `bb-select-field-clear` &mdash; Adds a clear button to the select field in single-select mode. To add the clear functionality include this attribute with no value in the `bb-select-field` element.
    - `bb-select-field-text` &mdash; For multi-select mode, specifies the text to display in the link that opens the modal. For single-select mode, specifies the placeholder text to display in the field until users make selections.
    - `bb-select-field-style` &mdash; *(Optional.)* Indicates whether to display the select field in single- or multi-select mode. By default, the select field uses multi-select mode and you do not need this property. To limit users to a single selection, include this property and set it to `single`.
    - `bb-select-field-icon` &mdash; *(Optional.)* Indicates whether to use the search icon in single-select mode. By default, the single select icon is the `fa-sort` icon. To use the `fa-search` icon, include this property and set it to `search`.
    - `bb-select-field-click` &mdash; *(Optional.)* Specifies a function to be called when users click the select field. This function is useful when you must fetch the initial items on the modal remotely each time the modal launches.
    - `bb-select-field-picker` &mdash; Defines the content to display in the select field modal.
      - `bb-select-field-picker-template` &mdash; Specifies a template for the content of the modal. The modal generally includes [a `bb-checklist` directive ](../checklist) to create a filterable checkbox list for users to select items.
      - `bb-select-field-picker-header` &mdash; *(Optional.)* Specifies a header for the select field modal. *(Default: `Select value`)*
    - `bb-select-field-skip-while-tabbing` &mdash; *(Optional.)* Indicates whether to skip over the select field container when a user tabs through it. *(Default: `false`)*
