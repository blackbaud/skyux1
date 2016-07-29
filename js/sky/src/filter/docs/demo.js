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
                    self.appliedFilters = angular.copy(filters);
                });
        };
       
        
    }

    FilterTestController.$inject = ['bbModal'];
    
    angular
        .module('stache')
        .controller('FilterTestController', FilterTestController)
        .controller('FilterModalController', FilterModalController);
})();