---
name: Search Field
icon: search
summary: The search field builds single- and multi-search fields for local searches or for remote searches of larger datasets on a server.
deprecated: true
---

### *Deprecated* ###

 This directive is no longer being maintained. Use the [bb-select-field](../selectfield) directive to display items for users to select.

<s>
The search field directive allows you to easily build single- and multi-search fields that can be filtered as the user types. This directive uses all the syntax and settings of the `ui-select` third party control (see the `ui-select` documentation for more information, options, and settings).
</s>
<s>
The search field can be used for a local search (i.e. dropdown box where you have all the data already loaded), or it can be used for a remote search to search larger datasets on a server.  Both types support single- and multi-search capabilities.
</s>

### Dependencies ###

 - <s>**[ui-select](https://github.com/angular-ui/ui-select) (0.11.0 or higher - .js and .css files needed)**</s>

---

### Local Search Settings ###

 - <s>`ui-select-choices`</s>
   - <s>`repeat` Required. An expression that defines the array of choices.  If a `filter` is included, then the choices will be filtered by what the user types, otherwise it will behave just a like a normal dropdown box.  See the `ui-select` documentation for more information.</s>


### Remote Search Settings ###

 - <s>`ui-select-choices`</s>
   - <s>`repeat` Required. An expression that defines the array of choices that will be populated from a remote server.  See the `ui-select` documentation for more information.</s>
   - <s>`refresh` Required. A function call to load the results from a remote server. The function should at least take `$select.search` as a parameter, and it should guard against calling the remote server with an empty search value.</s>
     - <s>***NOTE:** The search control needs to know when you get results back from the server in order to properly display a "no results" message when necessary.  In your refresh function, after you receive and store the results, then you MUST fire the `bbSearchFinished` event like this:  `$scope.$broadcast('bbSearchFinished');`.*</s>
   - <s>`refresh-delay` Optional. The delay in milliseconds after the last keystroke before kicking off the remote search. Default from `ui-select` is 1000 ms.</s>
</s>

### Single Search Settings ###

 - <s>`ui-select-match` The text of the selection to display in the search field. Note: The value should use the `$select.selected` syntax.</s>
   - <s>`allow-clear` Optional. Allows you to clear the current value by rendering an "X" button.</s>
   - <s>`placeholder` Optional. Default text when no selection is present.</s>
</s>

### Multiple Search Settings ###

 - <s>`ui-select`
   - <s>`multiple` Required. Styles the search to accept multiple search values.</s>
 - <s>`ui-select-match` The text of the selection to display in the search field. Note: The value should use the `$item` syntax.</s>
   - <s>`placeholder` Optional. Default text when no selection is present.</s>
