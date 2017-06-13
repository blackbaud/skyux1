---
name: Reorder table
icon: arrows-v
summary: The reorder component provides an interface to display a table where users can drag-and-drop rows into their preferred order. With additional design functionality
---

The reorder table component creates a table where users can drag-and-drop rows into their preferred order. It should be used for display slightly more complex information
than the reorder directive and requires an integer indexing property

### Reorder table settings ###
- `bb-reorder-table` &mdash; Creates a table where users can drag-and-drop rows.
    - `bb-reorder-table-options` &mdash; Specifies an object with the following properties for the `bb-reorder-table` directive.
        - `columns` &mdash; An array of available columns. Each column can have the following properties:
            - `name` &mdash; Specifies a unique name for the column.
            - `jsonMap` &mdash; Specifies the name of the property within the `data` property that maps to the data in the column. This property is not needed only if using the `templateFn` property.
            - `title` &mdash; *(Optional.)* Specifies the text to use in the column header in place of the column name. *(Default: `name`)*
            - `width` &mdash; *(Optional.)* Specifies the desired width attribute of the column elements. The width of the columns will not be respected if they are smaller than the table together. *(Default: `auto`)*
            - `isBool` &mdash; *(Optional.)* Specifies an object that makes the column elements display as checkboxes.
                - `disableCol` &mdash; *(Optional.)* Specifies if the column checkboxes are always disabled. *(Default: `false`)*
                - `disableRow` &mdash; *(Optional.)* Specifies a function that determines if the checkbox is disabled for a given item from. `data`
                - `isInverted` &mdash; *(Optional.)* Specifies if the displayed value is opposite of that stored `data` (i.e. checked = `false`, unchecked = `true` ). *(Default: `false`)*
            - `show` &mdash; *(Optional.)* Specifies whether or not the given column is visible. *(Default: `true`)*
            - `templateFn` &mdash; Specifies a function that returns a template object when given an item from `data`. A template object can have the following properties:
                - `text` &mdash; Specifies the text to be shown in the column cell.
                - `elClass` &mdash; *(Optional.)* Specifies all classes of the cell element in a string separated with spaces.
    - `data` &mdash; An array of objects that represents the rows in the table. Each row should have properties that correspond to the `jsonmap` properties within the `columns` property.
    - `fixed` &mdash; *(Optional.)* Specifies a number of rows at the top of the table which can no be reordered. *(Default: `0`)*
    - `index` &mdash; An integer property of the objects in `data` that is used to sort and identify each item. When sortable, this property will altered to match the index of the element.
    - `oneIndexed` &mdash; *(Optional.)* Specifies if the the property used for `index` is one-indexed. *(Default: `false`)*
    - `getContextMenuItems` &mdash; (Optional.) Specifies a function that allows table rows to create a context menu based on the function's return value. The function returns an array of objects that represents the items in the dropdown. The objects contain the following properties:
        - `id` &mdash; Specifies a unique string identifier for the dropdown item.
        - `title` &mdash; Specifies the title to display in the dropdown.
        - `cmd` &mdash; Specifies a function to be called when users click the dropdown item. To close the dropdown after calling the function, it should return `false`.
    - `bb-reorder-table-unsortable` &mdash; Specifies whether or not the list is currently unsortable. *(Default: `false`)*
