/* global angular*/

(function () {
    'use strict';

    function CardTestController($scope) {
        var vm = this;

        $scope.$watch(function () {
            return vm.itemsToShow;
        }, function (newValue) {
            var itemsToShow = newValue.split(','),
                selectableParts;

            selectableParts = newValue.split(':');

            if (selectableParts.length > 1 && selectableParts[1] === 'selectable') {
                vm.showCheckbox = true;
                newValue = selectableParts[0];
            }

            itemsToShow = newValue.split(',');

            itemsToShow.forEach(function (itemToShow) {
                vm['show' + itemToShow] = true;
            });
        });
    }

    CardTestController.$inject = ['$scope'];

    angular.module('screenshots', ['sky'])
        .controller('CardTestController', CardTestController);
}());
