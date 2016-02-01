/*global angular */

(function () {
    'use strict';

    var PROP_CATEGORY = 'category';

    function BBChecklistController($scope, bbChecklistUtility) {
        var vm = this;

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
                items = vm.bbChecklistItems,
                n,
                searchTextUpper = (vm.searchText || '').toUpperCase(),
                selectedCategory = vm.selectedCategory;

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

            vm.filteredItems = filteredItems;
        }

        function invokeFilter() {
            if (vm.filterLocal) {
                invokeFilterLocal();
            } else if (vm.bbChecklistFilterCallback) {
                vm.bbChecklistFilterCallback({
                    searchText: vm.searchText,
                    category: vm.selectedCategory
                });
            }
        }

        vm.bbChecklistSelectedItems = vm.bbChecklistSelectedItems || [];

        vm.selectAll = function () {
            var i,
                item,
                items = vm.filteredItems,
                selected = vm.bbChecklistSelectedItems;

            for (i = 0; i < items.length; i += 1) {
                item = items[i];
                if (!bbChecklistUtility.contains(selected, item)) {
                    bbChecklistUtility.add(selected, item);
                }
            }
        };

        vm.clear = function () {
            var i,
                item,
                items = vm.filteredItems,
                selected = vm.bbChecklistSelectedItems;

            for (i = 0; i < items.length; i += 1) {
                item = items[i];
                bbChecklistUtility.remove(selected, item);
            }
        };

        vm.rowClicked = function (item) {
            var selected = vm.bbChecklistSelectedItems;

            if (!bbChecklistUtility.contains(selected, item)) {
                bbChecklistUtility.add(selected, item);
            } else {
                bbChecklistUtility.remove(selected, item);
            }
        };

        vm.filterByCategory = function (selectedCategory) {
            vm.selectedCategory = selectedCategory;
            invokeFilter();
        };

        $scope.$watch(function () {
            return vm.bbChecklistItems;
        }, function () {
            vm.filteredItems = vm.bbChecklistItems;
            vm.highlightRefresh = new Date().getTime();
        });

        $scope.$watch(function () {
            return vm.searchText;
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                invokeFilter();
            }
        });

        vm.setColumns = function (columns) {
            vm.columns = columns;
        };
    }

    BBChecklistController.$inject = ['$scope', 'bbChecklistUtility'];

    angular.module('sky.checklist.controller', ['sky.checklist.utility'])
        .controller('BBChecklistController', BBChecklistController);
}());
