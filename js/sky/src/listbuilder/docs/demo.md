---
name: Listbuilder
icon: th-list
summary: The listbuilder component contains functionality for executing different actions on large sets of data.
---

The listbuilder component contains functionality for displaying and executing different actions on large sets of data.

`bb-listbuilder` &mdash; Container for the entire listbuilder

`bb-listbuilder-toolbar` &mdash; Component for the listbuilder toolbar
  - `bb-listbuilder-on-search` &mdash; Callback that will be executed when the toolbar's search is invoked. It has the following arguments:
    - `searchText` &mdash; Text in the toolbar's search input.
  - `bb-listbuilder-search-text` &mdash; *(Optional.)* Text that the user can provide to set the text in the toolbar's search input.
  - `bb-listbuilder-search-placeholder` &mdash; *(Optional.)* Specifies the placeholder text for the search input.
  - `bb-listbuilder-vertical-offset-id` &mdash; *(Optional.)* Id of the element that should float above the listbuilder toolbar when the window is scrolled.
  - `bb-listbuilder-toolbar-fixed` &mdash; *(Optional.)* Set to true if the toolbar should not float when the window is scrolled. *(Default = `false`)*
  - `bb-listbuilder-add-button` &mdash; *(Optional.)* A component for the add button in a listbuilder toolbar
    - `bb-listbuilder-add-action` &mdash; *(Optional.)* Specifies a function that will be called when the add button is clicked.
    - `bb-listbuilder-add-label` &mdash; *(Optional.)* Specifies text for the add button title.
  - `bb-listbuilder-filter` &mdash; *(Optional.)* Container for the filter button in the listbuilder toolbar. See the [filter](../filter) module for content that can be placed here.
  - `bb-listbuilder-sort` &mdash; *(Optional.)* Container for the sort button in the listbuilder toolbar. See the [sort](../sort) module for content that can be placed here.
  - `bb-listbuilder-filter-summary` &mdash; *(Optional.)* Container for the filter summary in the listbuilder toolbar. See the [filter](../filter) module for content that can be placed here.
  - `bb-listbuilder-toolbar-secondary-actions` &mdash; *(Optional.)* Container for the secondary actions dropdown in the listbuilder toolbar.
    - `bb-listbuilder-secondary-actions` &mdash; Component for the secondary actions dropdown.
      - `bb-listbuilder-secondary-actions-append-to-body` &mdash; *(Optional.)* Specifies whether the dropdown should be appended to the document body. *(Default = `false`)*
      - `bb-listbuilder-secondary-action` &mdash; Component for an individual action in the secondary actions dropdown.
        - `bb-listbuilder-secondary-action-click` &mdash; Specifies a function that will be called when a user clicks the action.
        - `bb-listbuilder-secondary-action-disabled` &mdash; *(Optional.)* Specifies whether the action is disabled. *(Default = `false`)*
  - `bb-listbuilder-toolbar-multiselect` &mdash; *(Optional.)* Container for the multiselect area in the listbuilder toolbar.
    - `bb-listbuilder-multiselect` &mdash; Component for handling multiselect functionality in the listbuilder. When using multiselect with cards, `bb-listbuilder-card-id`, `bb-card-selectable`, and `bb-card-selected` should all be set. When using multiselect with repeater items, `bb-listbuilder-repeater-item-id`, `bb-repeater-item-selectable`, and `bb-repeater-item-selected` should all be set. Display actions for selected items using the [summary action bar](../summaryactionbar) module. 
      - `bb-listbuilder-multiselect-items-changed` &mdash; Callback that will be executed when users select or deselect items in the listbuilder. It has the following arguments: 
        - `selectedIds` &mdash; The array of unique identifiers that have been selected.
        - `allSelected` &mdash; Set to true if the multiselect items were changed by selecting all items, set to false otherwise.
      - `bb-listbuilder-multiselect-selected-ids` &mdash; *(Optional.)* Specifies the array of selected unique identifiers. 
      - `bb-listbuilder-multiselect-available-items` &mdash *(Optional.)* Specifies the array of items in the listbuilder. When specified, the selected property of the item will be updated when `bb-listbuilder-multiselect-selected-ids` are changed, when the select all button is clicked, and when the clear all button is clicked.
      - `bb-listbuilder-multiselect-item-selected-property` &mdash *(Optional.)* Specifies the name for the selected property of items in the `bb-listbuilder-multiselect-available-items` array. *(Default = `selected`)*
      - `bb-listbuilder-multiselect-item-selected-property` &mdash *(Optional.)* Specifies the name for the id property of items in the `bb-listbuilder-multiselect-available-items` array. *(Default = `id`)*
      - `bb-listbuilder-on-show-only-selected` &mdash; Callback that will be executed when users select or deselect the 'Show only selected' checkbox in the multiselect area. It has the following arguments: 
        - `showOnlySelected` &mdash; Set to true if the list should contain only selected items, set to false otherwise.
      - `bb-listbuilder-show-only-selected` &mdash; *(Optional.)* Specifies the value of the 'Show only selected' checkbox. *(Default = `false`)*
      - `bb-listbuilder-multiselect-select-all` &mdash; Component that creates a 'Select all' button.
        - `bb-listbuilder-multiselect-on-select-all` &mdash; *(Optional.)* Callback that will be executed when the 'Select all' button is clicked. The function should return an array of unique identifiers to be selected. When not specified, and when the `bb-listbuilder-multiselect-available-items` array is specified, all items in the array will be selected.
      - `bb-listbuilder-multiselect-clear-all` &mdash; Component that creates a 'Clear all' button.
        - `bb-listbuilder-multiselect-on-clear-all` &mdash; *(Optional.)* Callback that will be executed when the 'Clear all' button is clicked. The function should return an array of unique identifiers to be deselected. When not specified, and when the `bb-listbuilder-multiselect-available-items` array is specified, all items in the array will be deselected.
      
`bb-listbuilder-content` &mdash; Component for the listbuilder content.
  - `bb-listbuilder-content-active-view` &mdash; *(Optional.)* Specifies the name of the active view to display as the listbuilder content. Values can be `card`, `repeater`, or the name of a custom view.
  - `bb-listbuilder-content-view-changed` &mdash; *(Optional.)* Specifies a function that will be called when the listbuilder view is changed. It has the following arguments:
    - `newView` &mdash; The name of the new active view.
  - `bb-listbuilder-cards` &mdash; Component that contains a card view for the listbuilder.
    - `bb-listbuilder-card` &mdash; Component that contains an individual card in the listbuilder.
        - `bb-listbuilder-card-id` &mdash; *(Optional.)* Specifies a unique identifier for the card. Required when using multiselect with cards.
  - `bb-listbuilder-repeater` &mdash; Component that contains a repeater view for the listbuilder.
    - `bb-listbuilder-repeater-item` &mdash; Attribute that can be placed on an individual repeater item in the listbuilder to highlight last search text on load.
    - `bb-listbuilder-repeater-item-id` &mdash; *(Optional.)* Specifies a unique identifier for the repeater item. Required when using multiselect with repeater itemss.
  - `bb-listbuilder-content-custom` &mdash; Component that contains a custom view in the listbuilder.
    - `bb-listbuilder-content-custom-view-name` &mdash; Specifies a unique name for the custom view.
    - `bb-listbuilder-content-custom-view-switcher-class` &mdash; Specifies a css class for the icon for this custom view to be used in the view switcher.
    - `bb-listbuilder-content-custom-view-switcher-label` &mdash; Specifies text for the title attribute for this custom view to be used in the view switcher.
    - `bb-listbuilder-content-custom-highlight-class` &mdash; Specifies a css class where search text will be highlighted in the custom view.
    - `bb-listbuilder-content-custom-item` &mdash; Attribute that can be placed on an individual custom item in the listbuilder to highlight last search text on load.
    - `bb-listbuilder-content-custom-item-id` &mdash; *(Optional.)* Specifies a unique identifier for the custom item. Required when using multiselect with custom items.

`bb-listbuilder-footer` &mdash; Component for the listbuilder footer, which contains the ability to load data using infinite scroll.
    - `bb-listbuilder-show-load-more` &mdash; When true, indicates that there is more data ready to be loaded by the listbuilder.
    - `bb-listbuilder-on-load-more` &mdash; Callback that will be executed when the listbuilder's load more functionality is invoked.
       
---
