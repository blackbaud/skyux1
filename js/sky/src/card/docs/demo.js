/* global angular*/

(function () {
    'use strict';

    function CardTestController($scope) {
        var vm = this;

        vm.showTitle = true;
        vm.showHeaderLeft = true;
        vm.showHeaderRight = true;
        vm.showContent = true;
        vm.showActions = true;
        vm.showCheckbox = true;

        $scope.$watch(function () {
            return vm.showCheckbox;
        }, function () {
            if (vm.showCheckbox) {
                vm.showHeaderRight = false;
            }
        });
    }

    CardTestController.$inject = ['$scope'];

    angular.module('stache')
        .controller('CardTestController', CardTestController);
}());
