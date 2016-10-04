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
  - `bb-listbuilder-vertical-offset-id` &mdash; *(Optional.)* Id of the element that should float above the listbuilder toolbar when the window is scrolled.
  - `bb-listbuilder-toolbar-fixed` &mdash; *(Optional.)* Set to true if the toolbar should not float when the window is scrolled. *(Default = `false`)*
  - `bb-listbuilder-add-button` &mdash; *(Optional.)* A component for the add button in a listbuilder toolbar
    - `bb-listbuilder-add-action` &mdash; *(Optional.)* Specifies a function that will be called when the add button is clicked.
    - `bb-listbuilder-add-label` &mdash; *(Optional.)* Specifies text for the add button title.
  - `bb-listbuilder-filter` &mdash; *(Optional.)* Container for the filter button in the listbuilder toolbar. See the [filter](../filter) module for content that can be placed here.
  - `bb-listbuilder-sort` &mdash; *(Optional.)* Container for the sort button in the listbuilder toolbar. See the [sort](../sort) module for content that can be placed here.
  - `bb-listbuilder-filter-summary` &mdash; *(Optional.)* Container for the filter summary in the listbuilder toolbar. See the [filter](../filter) module for content that can be place here.

`bb-listbuilder-footer` &mdash; Component for the listbuilder footer, which contains the ability to load data using infinite scroll.
    - `bb-listbuilder-show-load-more` &mdash; When true, indicates that there is more data ready to be loaded by the listbuilder.
    - `bb-listbuilder-on-load-more` &mdash; Callback that will be executed when the listbuilder's load more functionality is invoked.
       
---
