/*jslint browser: true */
/*global angular */

/** @module Checklist
@icon list-ul
@summary The checklist builds a filterable checkbox list that can display multiple columns of data.
 @description The checklist directive allows you to build a filterable checkbox list. The `bb-checklist-columns` element allows you to specify multiple columns for the rows in the checkbox list. You can display items in a list view where each row displays a title and description. The list view is preferred to the grid view because it is mobile-responsive.

### Checklist Settings ###
    - `bb-checklist` &mdash; Creates a filterable checkbox list.
        - `bb-checklist-items` &mdash; An array of objects that represents the rows to display in the list.
        - `bb-checklist-selected-items` &mdash; An array that represents the selected items in the list.
        - `bb-checklist-include-search` &mdash; Provides a Boolean value to indicate whether to include a search text box to filter the checkbox list. A callback function can be used to filter the list based on search text. Search text is highlighted within the list.
        - `bb-checklist-search-placeholder` &mdash; Specifies placeholder text to display in the search text box.
        - `bb-checklist-filter-callback` &mdash; Specifies the function to be called when a user modifies the search text. The consumer uses this to update the `bb-checklist-items` array based on the search text. A single object is passed to the function as a parameter that contains the `searchText` and `category` properties. This is useful to load items remotely or to filter items with custom logic other than simple case-insensitive string matching.
        - `bb-checklist-filter-local` &mdash; Instructs the checklist directive to filter items in the list by making sure the properties of each item match a specified category or search text.
        - `bb-checklist-search-debounce` &mdash; Specifies the number of milliseconds to debounce changes to the search text. When making web requests in `bb-checklist-filter-callback`, this avoids new requests after each character that users type.
        - `bb-checklist-no-items-message` &mdash; Specifies a message to display when the list displays no items. *(Default: 'No items found')*
        - `bb-checklist-mode` &mdash; Specifies whether to display the checklist as a list or grid. List mode is preferred because it is mobile-responsive, but grid mode is the default for backwards-compatibility. *(Default: `grid`)*
            - `list` &mdash; Displays items in a list with titles and descriptions. Items are expected to have `title`, `description`, and `category` properties. This view is preferred to grid mode because it is mobile-responsive.
            - `grid` &mdash; Displays items in a grid with columns specified by `bb-checklist-column` elements. For backwards-compatibility reasons, this view is the default, but list mode is preferred because it is mobile-responsive.
        - `bb-checklist-categories` &mdash; An array of category names to build category filters at the top of the list.

### Checklist Column Settings ###
    - `bb-checklist-columns` &mdash; Allows you to specify multiple columns of data for the checkbox list.
        - `bb-checklist-column` &mdash; Allows you to specify an individual column of data for the checkbox list.
            - `bb-checklist-column-caption` &mdash; Specifies caption text for the column header.
            - `bb-checklist-column-field` &mdash; Specifies the name of the property that contains the text to display in the column.
            - `bb-checklist-column-class` &mdash; Specifies a CSS class to apply to the column header and cells.
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
