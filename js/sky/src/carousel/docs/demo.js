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
    }

    angular.module('stache')
        .controller('CarouselTestController', CarouselTestController);
}());
