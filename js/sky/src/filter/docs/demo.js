/*global angular */
(function () {
    'use strict';

    function FilterModalController($uibModalInstance, existingFilters) {
        var self = this;

        function clearAllFilters() {
            self.filters = {
                fruitType: 'any'
            };
        }
        
        function transformFiltersToArray(filters) {
            var result = [];

            if (filters.fruitType && filters.fruitType !== 'any') {
                result.push({name: 'fruitType', value: filters.fruitType, label: filters.fruitType});
            }

            if (filters.hideOrange) {
                result.push({name: 'hideOrange', value: true, label: 'hide orange fruits'});
            }

            return result;
        }

        function transformArrayToFilters(array) {
            var i,
                filters = {};

            for (i = 0; i < array.length; i++) {
                if (array[i].name === 'fruitType') {
                    filters.fruitType = array[i].value;
                }

                if (array[i].name === 'hideOrange') {
                    filters.hideOrange = array[i].value;
                }
            }

            return filters;
        }

        function applyFilters() {
            var result = transformFiltersToArray(self.filters);
            $uibModalInstance.close(result);
        }


        if (!existingFilters) {
            clearAllFilters();
        } else {
            self.filters = transformArrayToFilters(existingFilters);
        }

        if (angular.isUndefined(self.filters.fruitType)) {
            self.filters.fruitType = 'any';
        }

        self.clearAllFilters = clearAllFilters;
        self.applyFilters = applyFilters;

    }

    FilterModalController.$inject = ['$uibModalInstance', 'existingFilters'];
    
    function FilterTestController(bbModal) {
        var self = this,
            items = [
                {
                    name: 'Orange',
                    description: 'A round, orange fruit.',
                    type: 'citrus',
                    color: 'orange'
                },
                {
                    name: 'Mango',
                    description: 'Delicious in smoothies, but don\'t eat the skin.',
                    type: 'other',
                    color: 'orange'
                },
                {
                    name: 'Lime',
                    description: 'A sour, green fruit used in many drinks.',
                    type: 'citrus',
                    color: 'green'
                },
                {
                    name: 'Strawberry',
                    description: 'A red fruit that goes well with shortcake.',
                    type: 'berry',
                    color: 'red'
                },
                {
                    name: 'Blueberry',
                    description: 'A small, blue fruit often found in muffins.',
                    type: 'berry',
                    color: 'blue'
                }
            
            ];

        function orangeFilterFailed(filter, item) {
            return filter.name === 'hideOrange' && filter.value && item.color === 'orange';
        }

        function fruitTypeFilterFailed(filter, item) {
            return filter.name === 'fruitType' && filter.value !== 'any' && filter.value !== item.type;
        }

        function itemIsShown(filters, item) {
            var passesFilter = true,
                j;

            for (j = 0; j < filters.length; j++) {
                if (orangeFilterFailed(filters[j], item)) {
                    passesFilter = false
                } else if (fruitTypeFilterFailed(filters[j], item)) {
                    passesFilter = false
                }
            }

            return passesFilter;
        }

        function filterItems(items, filters) {
            var i,
                passesFilter,
                result = [];

            for (i = 0; i < items.length; i++) {
                passesFilter = itemIsShown(filters, items[i]);
                if (passesFilter) {
                    result.push(items[i]);
                }
            }

            return result;
        }

        self.filteredItems = items;

        self.filterButtonClicked = function () {
            bbModal
                .open({
                    controller: 'FilterModalController as modalCtrl',
                    templateUrl: 'demo/filter/filters.html',
                    resolve: {
                        existingFilters: function () {
                            return angular.copy(self.appliedFilters);
                        }
                    }
                })
                .result
                .then(function (result) {

                    self.appliedFilters = angular.copy(result);

                    self.filteredItems = filterItems(items, self.appliedFilters);

                });
        };

        self.onDismiss = function (index) {
            self.appliedFilters.splice(index, 1);
            self.filteredItems = filterItems(items, self.appliedFilters);
        }
       
    }

    FilterTestController.$inject = ['bbModal'];
    
    angular
        .module('stache')
        .controller('FilterTestController', FilterTestController)
        .controller('FilterModalController', FilterModalController);
})();
