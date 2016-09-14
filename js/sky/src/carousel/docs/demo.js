/*global angular */

(function () {
    'use strict';

    function CarouselTestController() {
        var i,
            itemCount = 20,
            vm = this;

        vm.items = [];

        for (i = 0; i < itemCount; i++) {
            vm.items.push(i + 1);
        }

        function selectedIndexChange(index) {
            vm.selectedIndex = index;
        }

        function goToFirstIndex($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.selectedIndex = 0;
        }
        vm.selectedIndexChange = selectedIndexChange;
        vm.goToFirstIndex = goToFirstIndex;

        vm.selectedIndex = 5;
    }

    angular.module('stache')
        .controller('CarouselTestController', CarouselTestController);
}());
