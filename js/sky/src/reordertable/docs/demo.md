---
name: Reorder table
icon: arrows-v
summary: The reorder table component provides an interface to display a table of information where users can drag-and-drop rows into their preferred order.
---

<bb-alert bb-alert-type="warning">This site describes <a href="https://angularjs.org/">the AngularJS (1.x) implementation</a> of the SKY UX framework. We still support this version, but it is in maintenance mode. We no longer develop features for this version, and we recommend the latest version of SKY UX instead. For more information, see <a href="https://developer.blackbaud.com/skyux">developer.blackbaud.com/skyux</a>.</bb-alert>


The reorder table component creates a table where users can drag-and-drop rows into their preferred order. It can handle slightly more complex information
than the reorder directive and requires an integer indexing property.

### Reorder table settings ###
- `bb-reorder-table` &mdash; Creates a table where users can drag-and-drop rows.
    - `bb-reorder-table-options` &mdash; Specifies an object with the following properties for the `bb-reorder-table` directive.
        - `columns` &mdash; An array of available columns. Each column can have the following properties:
            - `controller` &mdash; *(Optional.)* Specifies the controller function for a templated column to allow cells to perform logic while displaying formatted or complex data. You can use `$scope.rowData` to access row data from the grid in the column template controller.
            - `formatter` &mdash; *(Optional)* Specifies a function which takes an object from the `data` property and returns a value to display in the table.
            - `jsonmap` &mdash; Specifies the name of the property within the `data` property that maps to the data in the column. This property is not required when `template_url` or `formatter` is used, but is required for the `data.property_name` syntax.
            - `name` &mdash; Specifies a unique name for the column.
            - `show` &mdash; *(Optional.)* Indicates whether the given column is visible. *(Default: `true`)*
            - `template_url` &mdash; *(Optional.)* Specifies the URL for a column template to use when displaying formatted or complex data in a cell. To access the properties of the cell data object, use the format `data.property_name`. 
            - `title` &mdash; *(Optional.)* Specifies the text to use in the column header in place of the column name. *(Default: `name`)*
            - `width` &mdash; *(Optional.)* Specifies the desired width of the column. The column width is not respected if the combined column widths are smaller than the table. *(Default: `auto`)*
        - `data` &mdash; An array of objects that represents the rows in the table. Each row should have properties that correspond to the `jsonmap` properties within the `columns` property.
        - `fixed` &mdash; *(Optional.)* Specifies a number of rows at the top of the table which cannot be reordered. *(Default: `0`)*
        - `getContextMenuItems` &mdash; *(Optional.)* Specifies a function that allows table rows to create a context menu based on the function's return value. The function returns an array of objects that represents the items in the dropdown. The objects contain the following properties:
            - `id` &mdash; Specifies a unique string identifier for the dropdown item.
            - `title` &mdash; Specifies the title to display in the dropdown.
            - `cmd` &mdash; Specifies a function to be called when users click the dropdown item. To close the dropdown after calling the function, it should return `false`.
        - `index` &mdash; Specifies an integer property of the objects in `data` that is used to sort and identify each item. When `bb-reorder-table-unsortable` is false, this property is altered to match the index of the element.
        - `oneIndexed` &mdash; *(Optional.)* Indicates if the the property for `index` is one-indexed. *(Default: `false`)*
        - `resources` &mdash; *(Optional.)* Specifies the resource dictionary available in the scope of each `columns` property's `template_url` and `controller` properties.
    - `bb-reorder-table-unsortable` &mdash; Indicates whether the table is unsortable. *(Default: `false`)*
