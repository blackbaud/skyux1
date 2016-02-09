/* global angular*/

(function () {
    'use strict';

    function PageSummaryTestController($scope) {
        var vm = this;

        vm.name = 'Robert C. Hernandez';

        $scope.$watch(function () {
            return vm.itemsToShow;
        }, function (newValue) {
            var itemsToShow = newValue.split(',');

            itemsToShow.forEach(function (itemToShow) {
                vm['show' + itemToShow] = true;
            });
        });
    }

    PageSummaryTestController.$inject = ['$scope'];

    angular.module('screenshots', ['sky'])
        .controller('PageSummaryTestController', PageSummaryTestController);
}());
