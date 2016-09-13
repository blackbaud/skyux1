---
name: Grid
icon: table
summary: The grid builds a full-featured grid with a search box, column picker, and filter form.
---

The grid directive builds a full-featured grid with a search box, column picker, and filter form. The parent `bb-grid` directive includes multiple child directives.

 ### Dependencies ###

- **[jqGrid](https://github.com/free-jqgrid/jqGrid) (4.7.0 or higher)**
- **[enquire.js](http://wicky.nillia.ms/enquire.js/) (2.1.2 or later)**
---

### Grid settings ###
- `bb-grid ` &mdash; Creates a full-featured grid that includes a search box, column picker, and filter form.
    - `bb-grid-toolbar` &mdash; Directive that contains the filter summary and custom content for the grid toolbar. Custom content will be displayed between the add button and the search input.
      - `bb-grid-filter-click` &mdash; *(Optional.)* Specifies a function to be called when the filter button is clicked.
      - `bb-grid-search` &mdash; *(Optional.)* Specifies a function to be called when search text is applied.
      - `bb-grid-search-text` &mdash; *(Optional.)* Specifies search text that users can supply to the grid search box.
      - `bb-grid-toolbar-filter-summary` &mdash; *(Optional.)* Contains content that will be placed in the filter summary section of the grid toolbar. See the [filter](../filter) module for the `bb-filter-summary` component which can be placed inside of here.
      - `bb-grid-toolbar-sort` &mdash; *(Optional.)* Contains content that will be placed in the sort section of the grid toolbar. See the [sort](../sort) module for the `bb-sort` component which can be placed inside of here.
    - `bb-grid-filters` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>*(Optional.)* Creates a flyout filter menu within the `bb-grid` directive.</s>
        - `bb-options` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>Specifies an object with the following properties for the `bb-grid-filters` directive.</s>
            - `applyFilters` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>Specifies a function to be called when users click the button to apply filters. You can set `args.filters` to pass updated filters to `bb-grid`.</s>
            - `clearFilters` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>Specifies a function to be called when users click the button to clear filters. You can set `args.filters` to pass updated filters to `bb-grid`.</s>
        - `bb-grid-filters-group` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>Creates collapsible areas within the `bb-grid-filters` directive.</s>
            - `bb-grid-filters-group-label` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>Specifies text labels for the collapsible groups that the `bb-grid-filters-group` directive creates.</s>
    - `bb-grid-filters-summary` &mdash; *(Optional.)* *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>Creates a summary toolbar for applied filters within the `bb-grid` directive.</s>
        - `bb-options` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>Specifies an options object for the `bb-grid-filters-summary` directive.</s>
            - `clearFilters` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>Specifies a function to be called when users click the button to clear filters. You can set `args.filters` to pass updated filters to `bb-grid`.</s>
        - `bb-grid-filters-summary-dismissable` &mdash; *(Deprecated.)* Use the components in the [filter](../filter) module instead. <s>*(Optional.)* Specifies whether the filter summary can be dismissed. *(Default: true)*</s>
    - `bb-grid-options` &mdash; Specifies an object with the following properties for the `bb-grid` directive.
        - `columns` &mdash; An array of available columns. Each column can have the following properties:
            - `allow_see_more` &mdash; *(Optional.)* Indicates whether to include a link for users to view overflow content. To display the link, set this property to `true`.
            - `caption` &mdash; Specifies a caption to display in the column header and column picker.
            - `category` &mdash; *(Optional.)* Specifies a category for the column. The column picker lets users filter columns by category.
            - `center_align` &mdash; *(Optional.)* Indicates whether to center-align the content in the column. To center-align content, set this property to `true`. By default, content is left-aligned.
            - `controller` &mdash; *(Optional.)* Specifies the controller function for a templated column to allow cells to perform logic while displaying formatted or complex data. You can use `$scope.rowData` to access row data from the grid in the column template controller.
            - `description` &mdash; *(Optional.)* Specifies a column description to display in the column picker.
            - `exclude_from_search` &mdash; *(Optional.)* Indicates whether exclude the column from highlighting search text. To prevent the column from highlighting search text, set this property to `true`.
            - `id` &mdash; Specifies a unique identifier for the column. The options object's `selectedColumnIds` property references this ID.
            - `jsonmap` &mdash; Specifies the name of the property within the `data` property that maps to the data in the column.
            - `name` &mdash; Specifies a unique name for the column. If the `name` value is different than the `jsonmap` value, then it must not match the value for any properties in the `bb-grid-option` property's `data` property.
            - `right_align` &mdash; *(Optional.)* Indicates whether to right-align the content in the column. To right-align content, set this property to `true`. By default, content is left-aligned.
            - `template_url` &mdash; *(Optional.)* Specifies the URL for a column template to use when displaying formatted or complex data in a cell. To access the properties of the cell data object, use the format `data.property_name`.
            - `title` &mdash; *(Optional.)* Indicates whether to display the column's content in tooltips. By default, column cells display tooltips because jqGrid places cell content in `title` attributes. To hide tooltips by not creating `title` attributes, set this property to `false`. *(Default: true)*
            - `width_all` &mdash; *(Optional.)* Sets the default column width (in pixels). To override the default column width for certain screen sizes, you can set breakpoint-specific column widths with the `width_xs`, `width_sm`, `width_md`, and `width_lg` properties. When columns do not take up the entire the grid, the last column extends beyond its default width to take up the remaining space. *(Default: 150px)*
            - `width_xs` &mdash; *(Optional.)* Sets the column width for screen sizes less than 768px.
            - `width_sm` &mdash; *(Optional.)* Sets the column width for screen sizes from 768px to 991px.
            - `width_md` &mdash; *(Optional.)* Sets the column width for screen sizes from 992px to 1199px.
            - `width_lg` &mdash; *(Optional.)* Sets the column width for screen sizes greater than 1199px.
        - `columnPickerHelpKey` &mdash; *(Optional.)* Sets the help key for the column picker.
        - `columnPickerSubsetLabel` &mdash; *(Optional.)* Specifies a label for a checkbox to include or exclude a subset of the columns.
        - `columnPickerSubsetProperty` &mdash; *(Optional.)* Specifies a property name of the column that will be used to filter by subset. The property will be set to `true` if it is a member of the subset.
        - `columnPickerSubsetExclude` &mdash; *(Optional.)* When set to true, instructs the column picker to exclude columns with the `columnPickerSubsetProperty` set to true when the subset checkbox is selected. When set to false, the column picker includes the columns with the `columnPickerSubsetProperty` set to true when the subset checkbox is selected. *(Default = `false`)*
        - `columnPickerOnlySelected` &mdash; *(Optional.)* When set to true, instructs the column picker to include a checkbox which hides unselected items when checked.
        - `data` &mdash; An array of objects that represents the rows in the grid. Each row should have properties that correspond to the `jsonmap` properties within the `columns` property.
        - `fixedToolbar` &mdash; *(Optional.)* Indicates whether to prevent the toolbar and grid headers from scrolling with the window. To prevent them from scrolling, set this property to `true`. *(Default = `false`)*
        - `filtersAreActive` &mdash; *(Optional.)* Indicates whether to highlight the filter button to indicate that the grid is filtered. To highlight the button, set this property to `true`.
        - `filtersOpen` &mdash; *(Optional.)* Indicates whether to open the flyout filter menu. To open the flyout, set this property to `true`.
        - `getContextMenuItems` &mdash; *(Optional.)* Specifies a function that allows grid rows to create a context menu based on the function's return value. The function returns an array of objects that represents the items in the dropdown. The objects contain the following properties:
            - `id` &mdash; Specifies a unique string identifier for the dropdown item.
            - `title` &mdash; Specifies the title to display in the dropdown.
            - `cmd` &mdash; Specifies a function to be called when users click the dropdown item. To close the dropdown after calling the function, it should return `false`.
        - `hasInlineFilters` &mdash; *(Optional.)* Indicates whether to display transcluded content in the `bb-grid` directive when users click the filter button. To display transcluded content, set this property to `true`.
        - `hasMoreRows` &mdash; *(Optional.)* Indicates whether to display a button that exposes more rows if the grid does not use pagination. To display the button, set this property to `true`.
        - `hideColPicker` &mdash; *(Optional.)* Indicates whether to hide the column picker button in the toolbar. To hide the button, set this property to `true`.
        - `hideFilters` &mdash; *(Optional.)* Indicates whether to hide the filters button in the toolbar. To hide the button, set this property to `true`.
        - `loading` &mdash; *(Optional.)* When set to `true`, automatically displays a `bbWait` component over the grid's data.
        - `multiselect` &mdash; *(Optional.)* Indicates whether to add a multi-select checkbox column to the grid. To add the column, set this property to `true`.
        - `onAddClick` &mdash; *(Optional.)* Specifies a function to be called when users click the add button in the toolbar. The add button only appears if the `onAddClick` property specifies a function.
        - `onAddClickLabel` &mdash; *(Optional.)* Specifies tooltip text for the add button.
        - `resources` &mdash; *(Optional.)* Specifies the resource dictionary available in the scope of each `columns` property's `template_url` and `controller` properties.
        - `searchText` &mdash; *(Deprecated.)* Use `bb-grid-toolbar` with the `bb-grid-on-search` function instead. <s>The text that users enter in the grid search box. Set by the `bb-grid` directive.</s>
        - `selectedColumnIds` &mdash; An array of unique identifiers that indicates the visible columns in their display order.
        - `sortOptions` &mdash; *(Optional.)* Specifies options for displaying sort indication in column headers.
            - `excludedColumns` &mdash; *(Optional.)* *(Deprecated.)* Use `bb-grid-toolbar-sort` to specify sort options. <s>Specifies an array of the names of columns that users cannot use to sort the grid.</s>
            - `column` &mdash; Specifies the name of the column that has been sorted.
            - `descending` &mdash; Indicates whether the sort is in descending order. When set to `true` the arrow icon in the specified column header will point downwards, otherwise the arrow icon will point upwards.
    - `bb-grid-pagination` &mdash; *(Optional.)* Specifies an object with the following properties to indicate that the grid uses pagination instead of infinite scrolling.
        - `currentPage` &mdash; *(Optional.)* Specifies the current page starting at 1. *(Default = 1)*
        - `itemsPerPage` &mdash; *(Optional.)* Specifies the number of rows per page to display in the grid. *(Default = 5)*
        - `maxPages` &mdash; *(Optional.)* Specifies the maximum number of pages to display in the pagination bar. *(Default = 5)*
        - `boundaryLinks` &mdash; *(Optional.)* Specifies whether or not to show the first and last page numbers with ellipses in the pagination bar. *(Default = `false`)*
        - `recordCount` &mdash; Specifies the total number of records available through pagination.
    - `bb-multiselect-actions` &mdash; *(Optional.)* Specifies an array of actions with the following properties to display in the multi-select action bar.
        - `actionCallback` &mdash; Specifies a function to be called when users click the action.
        - `automationId` &mdash; *(Optional.)* Specifies a unique identifier to place in the `data-bbauto` attribute for automation purposes.
        - `isPrimary` &mdash; *(Optional.)* Indicates whether to use the primary button color for the action. To use the primary button color, set this property to `true`.
        - `selections` &mdash; Specifies the row objects from the grid to associate with the action. You can update this through the `bb-selections-updated` function.
        - `title` &mdash; Specifies the text to display on the button for the action.
    - `bb-selected-rows` &mdash; *(Optional.)* Specifies an object with two-way binding to multi-selected rows. It can set the multi-selected rows from the `bb-grid` directive's parent controller.
    - `bb-selections-updated` &mdash; *(Optional.)* Specifies a function to be called when users update multi-select selections. The selections are passed to the function as an argument, and you can update multi-select actions accordingly.
    - `bb-grid-infinite-scroll` &mdash; *(Optional.)* When present, indicates that the grid will use infinite scroll to load instead of the load more button. When using infinite scroll, you must load data with the `loadMoreRows` event `promise` property.

### Grid events ###
    - `includedColumnsChanged` &mdash; Fires when users change the columns to display in the grid.
        - `willResetData` &mdash; Indicates whether to reload the grid with data from the server after users change the columns to display. To reload the grid, set this property to `true` on the event handler's `data` parameter. This avoids reloading the grid with existing data after the `includedColumnsChanged` event fires.
    - `loadMoreRows` &mdash; Fires when users change pages in paginated grids or load more rows in nonpaginated grids. When users change pages, the event includes a data object with `top` and `skip` parameters so that the calling controller can retrieve the proper paged data. When users load more rows, the event provides the `promise` property to add new data to the grid.
        - `top` &mdash; Indicates how many records to retrieve and display in the grid. The value is the same as the `itemsPerPage` property in the `bb-grid-pagination` directive.
        - `skip` &mdash; Indicates how many records to skip before the first record displayed in the grid. The value equals the number of pages skipped multiplied by the number of items per page.
        - `promise` &mdash; Provides a promise that the consumer of the event can resolve with new data that the grid appends to the existing data.
    - `columnsResized` &mdash; Fires after users resize the columns in the grid. You can use this event to listen for column size changes and save them for subsequent visits to the grid. The event contains an object with the following properties:
        - `index` &mdash; Specifies the index of the resized column.
        - `newWidth` &mdash; Specifies the width of the resized column.
    - `reInitGrid` &mdash; The grid reinitializes itself when it receives this event.

### Viewkeeper configuration ###
  - `bbViewKeeperConfig` &mdash; A global configuration object for a service that fixes the grid headers and toolbar in place when the browser window scrolls.
    - `hasOmnibar` &mdash; *(Optional.)* Indicates whether the viewkeeper leaves space for an omnibar. *(Default = `true`)*
