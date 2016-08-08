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

            if (filters.hideVege) {
                result.push({name: 'hideVege', value: true, label: 'Vegetables hidden'});
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

                if (array[i].name === 'hideVege') {
                    filters.hideVege = array[i].value;
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
        var self = this;

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
                });
        };

        self.onDismiss = function (index) {
            self.appliedFilters.splice(index, 1);
        };
       
        
    }

    FilterTestController.$inject = ['bbModal'];
    
    angular
        .module('screenshots', ['sky'])
        .controller('FilterTestController', FilterTestController)
        .controller('FilterModalController', FilterModalController);
})();