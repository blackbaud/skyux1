/*jslint browser: true */
/*global angular */

/** @module Checklist
@icon list-ul
@summary The checklist directive provides the tools to build a filterable checkbox list that can display multiple columns of data.
 @description The checklist directive allows you to build a filterable checkbox list. The `bb-checklist-column` element allows you to specify multiple columns of data for the checkbox list. You can display items in a list view where each row displays a title and description. The list view is preferable when building a responsive application.

### Checklist Settings ###

 - `bb-checklist` &mdash; Creates a filterable checkbox list.
 - `bb-checklist-items` &mdash; Creates an array of objects that represents the rows to display in the list.
 - `bb-checklist-selected-items` &mdash; Creates an array that represents the items selected in the list.
 - `bb-checklist-include-search` &mdash; Provides a Boolean value that indicates whether to include a search field to filter the checkbox list. The search field uses a callback function to filter the list based on search criteria and highlights the search text in the filtered columns.
 - `bb-checklist-search-placeholder` &mdash; Specifies placeholder text to display in the search textbox.
 - `bb-checklist-filter-callback` &mdash; Specifies the function to call when a user modifies the search text. The function updates the `bb-checklist-items` array based on the search text. A single object is passed to the function as a parameter with `searchText` and `category` properties. This is useful to load items remotely or to filter items with custom logic other than simple case-insensitive string matching.
 - `bb-checklist-filter-local` &mdash; When specified, items are filtered by the checklist directive by examining the properties of each item to match the specified category or search text.
 - `bb-checklist-search-debounce` &mdash; Specifies the number of milliseconds to debounce changes to the search text. When making a web request in `bb-checklist-filter-callback`, this setting helps avoid new requests for each character that users type.
 - `bb-checklist-no-items-message` &mdash; Specifies the message to display when no items are displayed in the list. *(Default: `'No items found'`)*
 - `bb-checklist-mode` &mdash; Specifies whether to display the checklist as a list or a grid. List mode is the preferred method because it is mobile-responsive, but for backwards-compatibility reasons, grid mode is the default.
  - `list` &mdash; Displays checklist items in a list with titles and descriptions. Items should have `title`, `description`, and `category` properties. This is the preferred method to display checklists because it is mobile-responsive.
  - `grid` &mdash; Displays checklist items in a grid with columns specified by `bb-checklist-column` elements. For backwards-compatibility reasons, this is the default, but list mode is preferred because it is mobile-responsive.
 - `bb-checklist-categories` &mdash; Provides an array of category names to create category filters at the top of the list.

### Checklist Column Settings ###

 - `bb-checklist-column-caption` &mdash; Specifies a caption for the column header.
 - `bb-checklist-column-field` &mdash; Specifies the name of the property on the checklist items that contains the text to display in the column.
 - `bb-checklist-column-class` &mdash; Applies a CSS class to the column header and cells.
 - `bb-checklist-column-width` &mdash; Sets the width of the column.
 */

(function () {
    'use strict';

    var PROP_CATEGORY = 'category';

    function bbChecklist(bbChecklistUtility) {
        return {
            replace: true,
            restrict: 'E',
            transclude: true,
            templateUrl: 'sky/templates/checklist/checklist.html',
            scope: {
                bbChecklistItems: '=',
                bbChecklistSelectedItems: '=',
                bbChecklistFilterCallback: '=',
                bbChecklistIncludeSearch: '=',
                bbChecklistSearchDebounce: '=',
                bbChecklistSearchPlaceholder: '@',
                bbChecklistNoItemsMessage: '@',
                bbChecklistAutomationField: '=',
                bbChecklistCategories: '=',
                bbChecklistMode: '@'
            },
            controller: ['$scope', function ($scope) {
                var locals = $scope.locals = {};

                this.setColumns = function (columns) {
                    locals.columns = columns;
                };
            }],
            link: function ($scope, el, attrs) {
                var filterLocal = angular.isDefined(attrs.bbChecklistFilterLocal),
                    locals = $scope.locals;

                function itemMatchesCategory(item, category) {
                    return !category || item.category === category;
                }

                function itemMatchesFilter(item, category, searchTextUpper) {
                    var p,
                        val;

                    if (itemMatchesCategory(item, category)) {
                        if (!searchTextUpper) {
                            return true;
                        }

                        for (p in item) {
                            if (item.hasOwnProperty(p) && p !== PROP_CATEGORY) {
                                val = item[p];

                                if (angular.isString(val) && val.toUpperCase().indexOf(searchTextUpper) >= 0) {
                                    return true;
                                }
                            }
                        }
                    }

                    return false;
                }

                function invokeFilterLocal() {
                    var filteredItems,
                        i,
                        item,
                        items = $scope.bbChecklistItems,
                        n,
                        searchTextUpper = (locals.searchText || '').toUpperCase(),
                        selectedCategory = locals.selectedCategory;

                    if (!searchTextUpper && !selectedCategory) {
                        filteredItems = items.slice(0);
                    } else {
                        filteredItems = [];

                        for (i = 0, n = items.length; i < n; i++) {
                            item = items[i];

                            if (itemMatchesFilter(item, selectedCategory, searchTextUpper)) {
                                filteredItems.push(item);
                            }
                        }
                    }

                    locals.filteredItems = filteredItems;
                }

                function invokeFilter() {
                    if (filterLocal) {
                        invokeFilterLocal();
                    } else if ($scope.bbChecklistFilterCallback) {
                        $scope.bbChecklistFilterCallback({
                            searchText: locals.searchText,
                            category: locals.selectedCategory
                        });
                    }
                }

                $scope.bbChecklistSelectedItems = $scope.bbChecklistSelectedItems || [];

                locals.selectAll = function () {
                    var i,
                        item,
                        items = locals.filteredItems,
                        selected = $scope.bbChecklistSelectedItems;

                    for (i = 0; i < items.length; i += 1) {
                        item = items[i];
                        if (!bbChecklistUtility.contains(selected, item)) {
                            bbChecklistUtility.add(selected, item);
                        }
                    }
                };

                locals.clear = function () {
                    var i,
                        item,
                        items = locals.filteredItems,
                        selected = $scope.bbChecklistSelectedItems;

                    for (i = 0; i < items.length; i += 1) {
                        item = items[i];
                        bbChecklistUtility.remove(selected, item);
                    }
                };

                locals.rowClicked = function (item) {
                    var selected = $scope.bbChecklistSelectedItems;

                    if (!bbChecklistUtility.contains(selected, item)) {
                        bbChecklistUtility.add(selected, item);
                    } else {
                        bbChecklistUtility.remove(selected, item);
                    }
                };

                locals.filterByCategory = function (selectedCategory) {
                    locals.selectedCategory = selectedCategory;
                    invokeFilter();
                };

                $scope.$watch('bbChecklistItems', function () {
                    locals.filteredItems = $scope.bbChecklistItems;
                    locals.highlightRefresh = new Date().getTime();
                });

                $scope.$watch('locals.searchText', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        invokeFilter();
                    }
                });
            }
        };
    }

    bbChecklist.$inject = ['bbChecklistUtility'];

    angular.module('sky.checklist', ['sky.check', 'sky.checklist.column', 'sky.checklist.columns', 'sky.checklist.model', 'sky.checklist.utility', 'sky.resources'])
        .directive('bbChecklist', bbChecklist);
}());
