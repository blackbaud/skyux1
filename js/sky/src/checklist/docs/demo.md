---
name: Checklist
icon: list-ul
summary: The checklist builds a filterable checkbox list that can display multiple columns of data.
---

The checklist directive allows you to build a filterable checkbox list. The `bb-checklist-columns` element allows you to specify multiple columns for the rows in the checkbox list. You can display items in a list view where each row displays a title and description. The list view is preferred to the grid view because it is mobile-responsive.

### Checklist Settings ###
    - `bb-checklist` &mdash; Creates a filterable checkbox list.
        - `bb-checklist-items` &mdash; An array of objects that represents the rows to display in the list.
        - `bb-checklist-selected-items` &mdash; An array that represents the selected items in the list.
        - `bb-checklist-include-search` &mdash; Provides a Boolean value to indicate whether to include a search text box to filter the checkbox list. A callback function can be used to filter the list based on search text. Search text is highlighted within the list.
        - `bb-checklist-search-placeholder` &mdash; Specifies placeholder text to display in the search text box.
        - `bb-checklist-filter-callback` &mdash; Specifies the function to be called when a user modifies the search text. The consumer uses this to update the `bb-checklist-items` array based on the search text. A single object is passed to the function as a parameter that contains the `searchText` and `category` properties. This is useful to load items remotely or to filter items with custom logic other than simple case-insensitive string matching.
        - `bb-checklist-filter-local` &mdash; Instructs the checklist directive to filter items in the list by making sure the properties of each item match a specified category or search text.
        - `bb-checklist-search-debounce` &mdash; Specifies the number of milliseconds to debounce changes to the search text. When making web requests in `bb-checklist-filter-callback`, this avoids new requests after each character that users type.
        - `bb-checklist-no-items-message` &mdash; Specifies a message to display when the list displays no items. *(Default: 'No items found')*
        - `bb-checklist-mode` &mdash; Specifies whether to display the checklist as a list or grid. List mode is preferred because it is mobile-responsive, but grid mode is the default for backwards-compatibility. *(Default: `grid`)*
            - `list` &mdash; Displays items in a list with titles and descriptions. Items are expected to have `title`, `description`, and `category` properties. This view is preferred to grid mode because it is mobile-responsive.
            - `grid` &mdash; Displays items in a grid with columns specified by `bb-checklist-column` elements. For backwards-compatibility reasons, this view is the default, but list mode is preferred because it is mobile-responsive.
        - `bb-checklist-categories` &mdash; An array of category names to build category filters at the top of the list.
        - `bb-checklist-select-style` &mdash; *(Optional.)* When set to `single`, the checklist will only allow selection of one item in the checklist.
        - `bb-checklist-is-loading` &mdash; *(Optional.)* User can set to true to give indication that the checklist is loading items. Useful for when using remote search.

### Checklist Column Settings ###
    - `bb-checklist-columns` &mdash; Allows you to specify multiple columns of data for the checkbox list.
        - `bb-checklist-column` &mdash; Allows you to specify an individual column of data for the checkbox list.
            - `bb-checklist-column-caption` &mdash; Specifies caption text for the column header.
            - `bb-checklist-column-field` &mdash; Specifies the name of the property that contains the text to display in the column.
            - `bb-checklist-column-class` &mdash; Specifies a CSS class to apply to the column header and cells.
            - `bb-checklist-column-width` &mdash; Sets the width of the column.
