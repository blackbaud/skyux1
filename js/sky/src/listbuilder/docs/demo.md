---
name: Listbuilder
icon: th-list
summary: The listbuilder component contains functionality for executing different actions on large sets of data.
---

The listbuilder component contains functionality for executing different actions on large sets of data.

- `bb-listbuilder` &mdash; Container for the entire listbuilder
  - `bb-listbuilder-toolbar` &mdash; Component for the listbuilder toolbar
    - `bb-listbuilder-on-search` &mdash; Callback that will be executed when the toolbar's search is invoked. It has the following arguments:
      - `searchText` &mdash; Text in the toolbar's search input.
      - `highlightResults` &mdash; Promise provided by `bb-listbuilder` that should be called on search completion to highlight the results.
    - `bb-listbuilder-search-text` &mdash; *(Optional.)* Text that the user can provide to set the text in the toolbar's search input.
    - `bb-listbuilder-vertical-offset-id` &mdash; *(Optional.)* Id of the element that should float above the listbuilder toolbar when the window is scrolled.
    - `bb-listbuilder-toolbar-fixed` &mdash; *(Optional.)* Set to true if the toolbar should not float when the window is scrolled. *(Default = `false`)*
  - `bb-listbuilder-footer` &mdash; Component for the listbuilder footer, which contains the ability to load data using infinite scroll.
    - `bb-listbuilder-show-load-more` &mdash; When true, indicates that there is more data ready to be loaded by the listbuilder.
    - `bb-listbuilder-on-load-more` &mdash; Callback that will be executed when the listbuilder's load more functionality is invoked. Ih has the following arguments:
      - `loadingComplete` &mdash; Promised provided by `bb-listbuilder` that should be called on load completion to end the infinite scroll loading sequence.
       
---
