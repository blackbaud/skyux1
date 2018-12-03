---
name: Tile
icon: th-large
summary: The tile provides a collapsible container that is the building block for pages and forms in Sky UX applications.
---

The `bb-tile` directive creates a collapsible container and is the bulding block for pages and forms in a Sky UX application. The `bb-tile-section` directive is used to create padded sections inside a `bb-tile` element. Additionally, the `bb-tile-header-content` directive may be placed inside the `bb-tile` directive to add summary information to the tile. If you simply need to show a check mark indicating the tile has data, you can add a `bb-tile-header-check` element to the `bb-tile-header-content` element.

When used on forms, it automatically adjusts the background color on the form and shrinks the tile header.

### Tile settings ###

 - `bb-tile-header` &mdash; The header text for the tile.
 - `bb-tile-help-click` &mdash; A function to call when the user clicks the help button (indicated by a question-circle icon) in the tile header. If not specified, the help button is not displayed.
 - `bb-tile-settings-click` &mdash; A function to call when the user clicks the settings button (indicated by a wrench icon) in the tile header. If not specified, the settings button is not displayed.
 - `bb-tile-collapsed` &mdash; (optional) binds to the collapsed state of the tile so that the tile can respond to user setting collapsed state.

### Tile dashboard directive ###

The `bb-tile-dashboard` directive allows you to have a set of tiles within a page which have controllable layouts and collapsed states. It depends on [angular-ui router](https://github.com/angular-ui/ui-router/wiki) to define states that map to tile controllers and templates.

### Tile dashboard settings ###

- `bb-tiles` &mdash; An array of tile objects to be contained in the dashboard. Contains the following object:
    - `id` &mdash; Unique ID for the tile.
    - `view_name` &mdash; The name of the view for the tile defined in the ui-router `$stateProvider`.
    - `collapsed` &mdash; True if the tile should be collapsed, false otherwise.
    - `collapsed_small` &mdash; True if the tile should be collapsed in small screen state, false otherwise.
- `bb-layout` &mdash; An object containing information about how the tiles should be organized within the tile dashboard. Contains the following:
    - `one_column_layout` &mdash; Array of tile ids that correspond with how the tiles should be ordered in a one column layout (small screen) ex: `layout.one_column_layout = ['Tile1', 'Tile2'];`.
    - `two_column_layout` &mdash; Array that corresponds with how tiles should be ordered in a two column layout. ex: `layout.two_column_layout = [['Tile1'], ['Tile2']];` where `Tile1` is in the left hand column and `Tile2` is in the right hand column.
- `bb-tile-dashboard-all-collapsed` &mdash; If set to true, then collapses all tiles in the dashboard, if set to false, expands all tiles in the dashboard.