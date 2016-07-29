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

        function applyFilters() {
            $uibModalInstance.close(self.filters);
        }


        if (!existingFilters) {
            clearAllFilters();
        } else {
            self.filters = existingFilters;
        }

        if (angular.isUndefined(self.filters.fruitType)) {
            self.filters.fruitType = 'any';
        }

        self.clearAllFilters = clearAllFilters;
        self.applyFilters = applyFilters;

    }

    FilterModalController.$inject = ['$uibModalInstance', 'existingFilters'];
    
    function FilterTestController() {
        var self = this;
        
        self.openObject = {
            controller: 'FilterModalController as modalCtrl',
            templateUrl: 'demo/filter/filters.html',
            resolve: {
                existingFilters: function () {
                    return angular.copy(self.appliedFilters);
                }
            }
        };

        self.appliedFilterCallback = function (filters) {
            self.appliedFilters = filters;
        };
       
        
    }
    
    angular
        .module('stache')
        .controller('FilterTestController', FilterTestController)
        .controller('FilterModalController', FilterModalController);
}());