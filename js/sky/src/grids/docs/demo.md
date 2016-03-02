---
name: Grid
icon: table
summary: The grid builds a full-featured grid with a search box, column picker, and filter form.
---

The grid directive builds a full-featured grid with a search box, column picker, and filter form.

 ### Dependencies ###

- **[jqGrid](https://github.com/free-jqgrid/jqGrid) (4.7.0 or higher)**
- **[enquire.js](http://wicky.nillia.ms/enquire.js/) (2.1.2 or later)**
---

### Grid Settings ###
- `bb-grid-filters` &mdash; Creates a flyout filter menu within the `bb-grid` directive.
  - `bb-options` &mdash; Specifies an options object for the `bb-grid-filters` directive.
      - `applyFilters` &mdash; Specifies a function to call when users click the apply filters button. You can set `args.filters` to pass updated filters to `bb-grid`.
      - `clearFilters` &mdash; Specifies a function to call when users click the clear filters button. You can set `args.filters` to pass updated filters to `bb-grid`.
  - `bb-grid-filters-group` &mdash; Creates labels (with `bb-grid-filters-group-label`) and collapsible areas within the `bb-grid-filters` directive.
- `bb-grid-filters-summary` &mdash; Creates a summary toolbar for your applied filters within the bb-grid directive.
  - `bb-options` &mdash; Specifies an options object for the `bb-grid-filters-summary` directive.
      - `clearFilters` &mdash; Specifies a function to call when users click the clear filters icon. You can set `args.filters` to pass updated filters to `bb-grid`.

- `bb-grid-options` &mdash; An object with the following properties:
  - `columns` &mdash; An array of available columns.  Each column can have these properties:
        - `allow_see_more` &mdash; Allows the column to have a see more link to view overflow content.
        - `caption` &mdash; The text to display in the column header and column chooser.
        - `category` &mdash; A category for the column, can be used to filter in the column chooser.
        - `center_align` &mdash; True if the column header and contents should be center aligned.
        - `controller` &mdash; The controller function if the column is templated. This allows a cell to perform logic while displaying formatted or complex data. You can access row data from the grid in the column template controller using `$scope.rowData`.
        - `description` &mdash; A description for the column, seen in the column chooser.
        - `exclude_from_search` &mdash; If true, then the column does not highlight text on search.
        - `id` &mdash; A unique identifier for the column.  The ID is referenced by the option object's `selectedColumnIds` property.
        - `jsonmap` &mdash; The name of the property that maps to the column's data.
        - `name` &mdash; The name of the column.
        - `right_align` &mdash; True if the column header and contents should be right aligned.
        - `template_url` &mdash; The url for the column template to show formatted or complex data in a cell. &mdash; The properties of the cell data object can be accessed using the format `data.property_name`.
        - `width_all` &mdash; The default width (in pixels) for a column if no breakpoint specific column is specified (`width_xs`, `width_sm`, `width_md`, `width_lg`). If no value is specified, columns will default to 150px, and if the columns do not take up the available room in the grid, the last column will be extended.
        - `width_xs` &mdash; The width of the column for screen sizes less than 768px.
        - `width_sm` &mdash; The width of the column for screen sizes from 768px to 991px.
        - `width_md` &mdash; The width of the column for screen sizes from 992px to 1199px.
        - `width_lg` &mdash; The width of the column for screen sizes greater than 1199px.
  - `data` &mdash; An array of objects representing the rows in the grid.  Each row should have properties that correspond to the `columns` `jsonmap` properties.
  - `fixedToolbar` &mdash; Prevents the toolbar and grid headers from scrolling with the window. Defaults to false.
  - `filtersAreActive` &mdash; If true, the filter button highlights to indicate that filters are active.
  - `filtersOpen` &mdash; If set to true, opens filters. If set to false, closes filters.
  - `getContextMenuItems` &mdash; If a function is specified, then the grid rows will attempt to create a bootstrap dropdown based on the return value of the function. The return value should be an array of objects that represent the items in a dropdown. The objects should contain the following properties:
      - `id` &mdash; A unique string identifier for the option.
      - `title` &mdash; The title shown for the dropdown option.
      - `cmd` &mdash; A function that will be called when the dropdown option is clicked. It should return false if you wish to close the dropdown after the function is called.
  - `hasInlineFilters` &mdash; If true, toggles hide/show on the transcluded content in the `bb-grid` directive when the filter button is pressed.
  - `hasMoreRows` &mdash; If set to true, then the `See more` button will appear below the grid when the grid does not use pagination.
  - `hideColPicker` &mdash; If true, hides the grid column picker in the toolbar.
  - `hideFilters` &mdash; If true, hides the filters button in the toolbar.
  - `multiselect` &mdash; If true, adds a multiselect checkbox column to the listbuilder.
  - `onAddClick` &mdash; If a function is specified, then an add button will appear in the grid toolbar that will call the `onAddClick` function when clicked.
  - `onAddClickLabel` &mdash; Label for the add button.
  - `resources` &mdash; Resource dictionary made available in the scope of each `columns`'s `template_url` and `controller`.
  - `searchText` &mdash; The text entered in the grid search box, set by bbGrid.
  - `selectedColumnIds` &mdash; An array of unique identifiers indicating the visible columns in the order in which they should be displayed.
  - `sortOptions` &mdash; Options around column sorting:
      - `excludedColumns` &mdash; An array of column names that should be excluded.
      - `column` &mdash; The name of the column that the data should be sorted by, set by bbGrid.
      - `descending` &mdash; Set to true by bbGrid if the sort should be in descending order.
- `bb-grid-pagination` &mdash; An object set when you intend to use pagination instead of infinite scrolling with your grid. It has the following properties:
  - `itemsPerPage` &mdash; The number of rows you wish to show in the grid per page, defaults to 5.
  - `maxPages` &mdash; The maximum number of pages to show in the pagination bar, defualts to 5.
  - `recordCount` &mdash; The total number of records available through pagination.
- `bb-multiselect-actions` &mdash; An array of actions that can be shown in the multiselect action bar. Each action can have the following:
  - `actionCallback` &mdash; A function that will be called when the action is clicked.
  - `automationId` &mdash; An identifier that will be placed in the `data-bbauto` attribute for automation purposes.
  - `isPrimary` &mdash; If true, this action will have the primary button color.
  - `selections` &mdash; The selected row objects from the list builder that are associated with this action, this can be updated through the `bb-selections-updated` function.
  - `title` &mdash; The text that will appear on the button for the action.
- `bb-selected-rows` &mdash; An object that has two way binding to the multiselected rows. It can be used to set the multiselected rows from the parent controller of the directive.
- `bb-selections-updated` &mdash; A function which will be called when multiselect selections are updated. The selections are passed to the function as an argument and you can update your multiselect actions accordingly.

### Custom Grid Toolbar ###
If you need more content in the grid toolbar beyond the add button, search input, column chooser, and filter button, then you can add custom content between the add button and search input.

To do this, the `bb-grid-custom-toolbar` attribute must be added to the `bb-grid` directive. Then, place a `bb-grid-toolbar` directive with your custom controls inside of the `bb-grid` directive.

### Grid Events ###

  - `includedColumnsChanged` &mdash; Fires when the user has changed the grid columns.  If you plan to handle reloading the grid after this change (e.g. you need
to reload data from the server as a result of the column change), set the event handler's `data` parameter's `willResetData` property to `true` to avoid
reloading the grid with the current data after the event has fired.
  - `loadMoreRows` Fires when a page changes (when using pagination) or a user clicks the 'Load more' button. When a user clicks the 'Load more' button, the event provides a promise. The consumer of the event should resolve the promise with the new data that the grid appends to the existing data. When the event is raised from a page change, a data object with top and skip parameters is included so that the calling controller can retrieve the proper paged data.
  - `reInitGrid` Fire this event within a controller to manually reinitialize of the grid