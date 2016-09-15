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

        function selectChanged(newIndex) {
            console.log('newIndex: ', newIndex);
            vm.selectedIndex = parseInt(newIndex) - 1;
            console.log('selectedIndex: ', vm.selectedIndex);
        }

        function selectedIndexChange(index) {
            vm.selectedIndex = index;
            vm.selectModel = (index + 1).toString();
        }

        function goToFirstIndex($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.selectedIndex = 0;
        }
        vm.selectedIndexChange = selectedIndexChange;
        vm.goToFirstIndex = goToFirstIndex;

        vm.selectedIndex = 5;

        vm.selectChanged = selectChanged;
    }

    angular.module('stache')
        .controller('CarouselTestController', CarouselTestController);
}());
