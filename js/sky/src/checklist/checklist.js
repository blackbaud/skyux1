/*jslint browser: true */
/*global angular */

(function () {
    'use strict';

    var SEARCH_PROPS = ['title', 'description'];

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
                        i,
                        len,
                        val;

                    if (itemMatchesCategory(item, category)) {
                        if (!searchTextUpper) {
                            return true;
                        }

                        for (i = 0, len = SEARCH_PROPS.length; i < len; i++) {
                            p = SEARCH_PROPS[i];
                            if (item.hasOwnProperty(p)) {
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
