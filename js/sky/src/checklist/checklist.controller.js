/*global angular */

(function () {
    'use strict';

    var SEARCH_PROPS = ['title', 'description'];

    function BBChecklistController($scope, bbChecklistUtility) {
        var vm = this;

        function itemMatchesCategory(item, category) {
            return !category || item.category === category;
        }

        function itemInSubset(item, subsetSelected) {
            if (!vm.bbChecklistSubsetLabel || angular.isUndefined(item[vm.bbChecklistSubsetProperty]) || item[vm.bbChecklistSubsetProperty] === false) {
                return true;
            }

            if (vm.subsetExclude) {
                return item[vm.bbChecklistSubsetProperty] !== subsetSelected;
            } else {
                return item[vm.bbChecklistSubsetProperty] === subsetSelected;
            }

        }

        function itemIsSelected(item) {
            return bbChecklistUtility.contains(vm.bbChecklistSelectedItems, item);
        }

        function onlyShowSelectedItem(item) {
            return !vm.onlyShowSelected || itemIsSelected(item);
        }

        function itemMatchesFilter(item, category, searchTextUpper) {
            var i,
                p,
                len,
                val;


            if (onlyShowSelectedItem(item)) {
                if (itemMatchesCategory(item, category)) {
                    if (itemInSubset(item, vm.subsetSelected)) {
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

            if (!searchTextUpper && !selectedCategory && !vm.bbChecklistSubsetLabel && !vm.onlyShowSelected) {
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
                    category: vm.selectedCategory,
                    subsetSelected: vm.subsetSelected,
                    onlyShowSelected: vm.onlyShowSelected
                });
            }
        }

        function eachFilteredItem(callback) {
            vm.filteredItems.forEach(callback);
        }

        function selectItem(item) {
            bbChecklistUtility.add(vm.bbChecklistSelectedItems, item);
        }

        function unselectItem(item) {
            bbChecklistUtility.remove(vm.bbChecklistSelectedItems, item);
        }

        vm.bbChecklistSelectedItems = vm.bbChecklistSelectedItems || [];
        vm.itemIsSelected = itemIsSelected;

        vm.selectAll = function () {
            eachFilteredItem(selectItem);
        };

        vm.clear = function () {
            eachFilteredItem(unselectItem);
        };

        vm.rowClicked = function (item) {
            if (!itemIsSelected(item)) {
                selectItem(item);
            } else {
                unselectItem(item);
            }
        };

        vm.isSingleSelect = function () {
            return vm.bbChecklistSelectStyle === 'single';
        };

        vm.getChecklistCls = function () {
            return {
                'bb-checklist-single': vm.isSingleSelect()
            };
        };

        vm.getRowCls = function (item) {
            return {
                'bb-checklist-row-selected': itemIsSelected(item)
            };
        };

        vm.singleSelectRowClick = function (item) {
            vm.bbChecklistSelectedItems = [item];

            $scope.$emit('bbPickerSelected', {
                selectedItems: vm.bbChecklistSelectedItems
            });
        };

        /*  In grid view, ensure that clicking input does not also cause the
            row click function to be called */
        vm.inputClicked = function ($event) {
            $event.stopPropagation();
        };

        vm.setColumns = function (columns) {
            vm.columns = columns;
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

        if (angular.isDefined(vm.bbChecklistCategories)) {
            vm.allCategories = 'bbChecklistAllCategories';
            vm.selectedOption = vm.allCategories;
            $scope.$watch(function () {
                return vm.selectedOption;
            }, function (newValue, oldValue) {
                if (newValue === vm.allCategories) {
                    vm.selectedCategory = null;
                } else {
                    vm.selectedCategory = newValue;
                }
                if (newValue !== oldValue) {
                    invokeFilter();
                }
            });
        }

        if (angular.isDefined(vm.bbChecklistSubsetLabel)) {
            $scope.$watch(function () {
                return vm.subsetSelected;
            }, function () {
                invokeFilter();
            });
        }

        if (vm.onlySelectedAvailable) {
            $scope.$watch(function () {
                return vm.onlyShowSelected;
            }, function () {
                invokeFilter();
            });
        }

        $scope.$emit('bbPickerReady', {
            setSelectedItems: function (selectedItems) {
                vm.bbChecklistSelectedItems = selectedItems;
            }
        });


    }

    BBChecklistController.$inject = ['$scope', 'bbChecklistUtility'];

    angular.module('sky.checklist.controller', ['sky.checklist.utility'])
        .controller('BBChecklistController', BBChecklistController);
}());
