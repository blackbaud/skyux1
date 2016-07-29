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
    
    function FilterTestController($timeout, bbModal) {
        var self = this;
        
        function openModal() {
            bbModal.open({
                controller: 'FilterModalController as modalCtrl',
                templateUrl: 'demo/filter/filters.html',
                resolve: {
                    existingFilters: function () {
                        return angular.copy(self.appliedFilters);
                    }
                }
            }).result.then(function (filters) {
                self.appliedFilters = angular.copy(filters);
            });
        }

        self.openModal = openModal;
       
        
    }

    FilterTestController.$inject = ['$timeout', 'bbModal'];
    
    angular
        .module('stache')
        .controller('FilterTestController', FilterTestController)
        .controller('FilterModalController', FilterModalController);
}());