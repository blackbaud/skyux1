---
name: Search Field
icon: search
summary: The search field builds single- and multi-search fields for local searches or for remote searches of larger datasets on a server.
---

The search field directive allows you to easily build single- and multi-search fields that can be filtered as the user types. This directive uses all the syntax and settings of the `ui-select` third party control (see the `ui-select` documentation for more information, options, and settings).

The search field can be used for a local search (i.e. dropdown box where you have all the data already loaded), or it can be used for a remote search to search larger datasets on a server.  Both types support single- and multi-search capabilities.

### Dependencies ###

 - **[ui-select](https://github.com/angular-ui/ui-select) (0.11.0 or higher - .js and .css files needed)**

---

### Local Search Settings ###

 - `ui-select-choices`
   - `repeat` Required. An expression that defines the array of choices.  If a `filter` is included, then the choices will be filtered by what the user types, otherwise it will behave just a like a normal dropdown box.  See the `ui-select` documentation for more information.

### Remote Search Settings ###

 - `ui-select-choices`
   - `repeat` Required. An expression that defines the array of choices that will be populated from a remote server.  See the `ui-select` documentation for more information.
   - `refresh` Required. A function call to load the results from a remote server. The function should at least take `$select.search` as a parameter, and it should guard against calling the remote server with an empty search value.
     - ***NOTE:** The search control needs to know when you get results back from the server in order to properly display a "no results" message when necessary.  In your refresh function, after you receive and store the results, then you MUST fire the `bbSearchFinished` event like this:  `$scope.$broadcast('bbSearchFinished');`.*
   - `refresh-delay` Optional. The delay in milliseconds after the last keystroke before kicking off the remote search. Default from `ui-select` is 1000 ms.

### Single Search Settings ###

 - `ui-select-match` The text of the selection to display in the search field. Note: The value should use the `$select.selected` syntax.
   - `allow-clear` Optional. Allows you to clear the current value by rendering an "X" button.
   - `placeholder` Optional. Default text when no selection is present.

### Multiple Search Settings ###

 - `ui-select`
   - `multiple` Required. Styles the search to accept multiple search values.
 - `ui-select-match` The text of the selection to display in the search field. Note: The value should use the `$item` syntax.
   - `placeholder` Optional. Default text when no selection is present.