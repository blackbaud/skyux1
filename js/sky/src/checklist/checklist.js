/*jslint browser: true */
/*global angular */

/** @module Checklist
@icon list-ul
@summary The checklist builds a filterable checkbox list that can display multiple columns of data.
 @description The checklist directive allows you to easily build a filterable checkbox list.  Multiple columns of data can be provided for the checkbox rows using the `bb-checklist-column` element.  Items can also be displayed in a list view with each row displaying a title and description.  The list view is preferable when building a responsive application.

### Checklist Settings ###

 - `bb-checklist`
 - `bb-checklist-items` An array of objects representing the rows that will be shown in the list.
 - `bb-checklist-selected-items` An array representing the selected items in the list.
 - `bb-checklist-include-search` A Boolean to optionally include a search textbox for filtering the items.  The search text will be highlighted in the columns of the list.  A callback function can be used to filter the items based on the search text.
 - `bb-checklist-search-placeholder` Placeholder text for the search textbox.
 - `bb-checklist-filter-callback` A function to be called when the search text is modified.  Used by the consumer to update the `bb-checklist-items` array as desired based on the search text.  The function will be passed a single object as a parameter containing `searchText` and `category` properties.  Useful when loading items remotely or using custom logic other than simple case-insensitive string matching to filter items.
 - `bb-checklist-filter-local` When specified, items are filtered by the checklist directive by examining the properties of each item to match the specified category or search text.
 - `bb-checklist-search-debounce` Number of milliseconds to debounce changes to the search text.  Useful if making a web request in the `bb-checklist-filter-callback` to avoid making the request after every character typed.
 - `bb-checklist-no-items-message` *(Default: `'No items found'`)* Message to display when no items are in the list.
 - `bb-checklist-mode` *(Optional. Default: 'grid')* one of two possible values:
  - `list` Displays items in a list with a title and description.  Items are expected to have `title`, `description` and `category` properties.  This is the preferred method of displaying a checklist.
  - `grid` Displays items in a grid with any number of columns.  Columns are specified using mulitple `bb-checklist-column` elements.  For backwards compatibility reasons this is the default mode, but `list` is the preferred mode since it is mobile-responsive.
 - `bb-checklist-categories` An array of category names used to build category filter buttons at the top of the list.

### Checklist Column Settings ###

 - `bb-checklist-column-caption` Caption text for the column header.
 - `bb-checklist-column-field` The name of the property on the checklist items that contains the text to display in this column.
 - `bb-checklist-column-class` A CSS class to apply to this column's header and cells.
 - `bb-checklist-column-width` Set the width to be used by the column.
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
