/*jslint browser: true */
/*global angular, jQuery */

/** @module Search Field
@icon search
@summary The search field builds single- and multi-search fields for local searches or for remote searches of larger datasets on a server.
 @description The search field directive allows you to easily build single- and multi-search fields that can be filtered as the user types. This directive uses all the syntax and settings of the `ui-select` third party control (see the `ui-select` documentation for more information, options, and settings).

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
 */

(function ($) {
    'use strict';

    angular.module('sky.searchfield', ['sky.resources'])
        .directive('uiSelectMatch', ['$timeout', function ($timeout) {
            return {
                restrict: 'EA',
                replace: false,
                require: '^uiSelect',
                link: function (scope, element, attrs, $select) {
                    var selectContainerEl,
                        origSizeSearchInputFunc,
                        matchEl,
                        windowResizeTimeout;

                    function sizeMatchItems() {
                        //The main logic flow for this function was taken from the ui-select's "sizeSearchInput()" function.
                        //Some things are done below in order to give the tags time to render before we try to fix any
                        //text overflow issues that may be present.

                        function updateIfVisible(containerOffsetWidth) {
                            var visible = (containerOffsetWidth > 0);

                            if (visible) {
                                //Get the container width minus any padding
                                containerOffsetWidth -= containerOffsetWidth - angular.element(selectContainerEl).width();

                                //For each match item, set the properly width so that text overflows properly
                                matchEl.find('.ui-select-match-item').css({
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: containerOffsetWidth
                                });
                            }

                            return visible;
                        }

                        $timeout(function () { //Give tags time to render correctly
                            updateIfVisible(selectContainerEl.offsetWidth);
                        });
                    }

                    if ($select.multiple) {
                        matchEl = element;
                        selectContainerEl = matchEl.parent().parent()[0];
                        origSizeSearchInputFunc = $select.sizeSearchInput;

                        //Hook into the ui-select function that controls resizing for multi search
                        $select.sizeSearchInput = function () {
                            origSizeSearchInputFunc();
                            sizeMatchItems();
                        };

                        //Resize any tags on load
                        sizeMatchItems();

                        $(window).on('resize.searchField' + scope.$id, function () {
                            $timeout.cancel(windowResizeTimeout);

                            windowResizeTimeout = $timeout(function () {
                                sizeMatchItems();
                            }, 250);
                        });

                        scope.$on('$destroy', function () {
                            $(window).off('resize.searchField' + scope.$id);
                        });
                    }
                }
            };
        }])
        .directive('uiSelectChoices', ['$templateCache', 'bbResources', function ($templateCache, bbResources) {
            return {
                restrict: 'EA',
                replace: false,
                require: '^uiSelect',
                link: function (scope, element, attrs, $select) {
                    var searching,
                        selectContainerEl,
                        msgEl;

                    function updateUIForSearch(showSearchingMsg) {
                        var msg;

                        // Remove the no results message if it's currently displayed
                        if (msgEl) {
                            msgEl.remove();
                            msgEl = null;
                        }

                        if (searching && $select.items.length === 0) {
                            // Display the "Searching..." or "No results..." message - only when we have empty results because we
                            //don't want the message to popup over a list of results as the user types.
                            msg = showSearchingMsg ? bbResources.searchfield_searching : bbResources.searchfield_no_records;

                            msgEl = angular.element($templateCache.get('sky/templates/searchfield/choices.html'));
                            msgEl.find('.bb-searchfield-no-records').text(msg);

                            selectContainerEl.append(msgEl);
                        }
                    }

                    function clearResults() {
                        searching = false;
                        $select.items = []; // Clear out current result set
                        updateUIForSearch();
                    }

                    //Remote Searches Only
                    //If the refresh attribute is set the control is being used as a remote search
                    if (attrs.refresh) {
                        selectContainerEl = angular.element(element).parent();
                        searching = false;

                        //Watch when the search field is opened/closed so that we can update the UI and remove
                        //the no results message, and remove the results for the next search.
                        scope.$watch('$select.open', function () {
                            clearResults();
                        });

                        //Watch the search results collection for any changes.
                        //NOTE: This does NOT fire when the collection is empty and the search result
                        //comes back empty.  To handle that case, see the "bbSearchFinished" event below.
                        scope.$watchCollection('$select.items', function () {
                            updateUIForSearch();
                        });

                        //This event should be fired by the consuming code after it gets and stores the results
                        //from the remote server.  This allows us to handle the problem above where $watchCollection
                        //doesn't fire when the collection is empty and the results also come back empty.
                        scope.$on("bbSearchFinished", function () {
                            updateUIForSearch();
                        });

                        //Watch all changes to the search text that the user is typing.
                        scope.$watch('$select.search', function (search) {
                            searching = (search && search.length > 0);

                            if (searching) {
                                //Initially shows the "Searching..." message until results come back from the remote server
                                updateUIForSearch(true);
                            } else {
                                clearResults();
                            }
                        });
                    }
                }
            };
        }]);
}(jQuery));
