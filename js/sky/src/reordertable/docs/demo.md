---
name: Reorder table
icon: arrows-v
summary: The reorder component provides an interface to display a table where users can drag-and-drop rows into their preferred order. With additional design functionality
---

The reorder table component creates a table where users can drag-and-drop rows into their preferred order. It should be used for display slightly more complex information
than the reorder directive and requires an integer indexing property.

### Reorder table settings ###
- `bb-reorder-table` &mdash; Creates a table where users can drag-and-drop rows.
    - `bb-reorder-table-options` &mdash; Specifies an object with the following properties for the `bb-reorder-table` directive.
        - `columns` &mdash; An array of available columns. Each column can have the following properties:
            - `controller` &mdash; *(Optional.)* Specifies the controller function for a templated column to allow cells to perform logic while displaying formatted or complex data. You can use `$scope.rowData` to access row data from the grid in the column template controller.
            - `jsonMap` &mdash; Specifies the name of the property within the `data` property that maps to the data in the column. This property is not required when `template_url`, but is required for the `data.property_name` syntax.
            - `name` &mdash; Specifies a unique name for the column.
            - `show` &mdash; *(Optional.)* Specifies whether or not the given column is visible. *(Default: `true`)*
            - `template_url` &mdash; *(Optional.)* Specifies the URL for a column template to use when displaying formatted or complex data in a cell. To access the properties of the cell data object, use the format `data.property_name`. 
            - `title` &mdash; *(Optional.)* Specifies the text to use in the column header in place of the column name. *(Default: `name`)*
            - `width` &mdash; *(Optional.)* Specifies the desired width attribute of the column elements. The width of the columns will not be respected if they are smaller than the table together. *(Default: `auto`)*object, use the format `data.property_name`.
        - `fixed` &mdash; *(Optional.)* Specifies a number of rows at the top of the table which can no be reordered. *(Default: `0`)*
        - `getContextMenuItems` &mdash; (Optional.) Specifies a function that allows table rows to create a context menu based on the function's return value. The function returns an array of objects that represents the items in the dropdown. The objects contain the following properties:
            - `id` &mdash; Specifies a unique string identifier for the dropdown item.
            - `title` &mdash; Specifies the title to display in the dropdown.
            - `cmd` &mdash; Specifies a function to be called when users click the dropdown item. To close the dropdown after calling the function, it should return `false`.
        - `index` &mdash; An integer property of the objects in `data` that is used to sort and identify each item. When sortable, this property will altered to match the index of the element.
        - `oneIndexed` &mdash; *(Optional.)* Specifies if the the property used for `index` is one-indexed. *(Default: `false`)*
        - `resources` &mdash; *(Optional.)* Specifies the resource dictionary available in the scope of each `columns` property's `template_url` and `controller` properties.
    - `bb-reorder-table-unsortable` &mdash; Specifies whether or not the list is currently unsortable. *(Default: `false`)*
