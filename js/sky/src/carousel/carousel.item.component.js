/*global angular */

(function () {
    'use strict';

    function Controller($scope) {
        var vm = this;

        vm.itemClick = function () {
            vm.carouselCtrl.setSelectedItem(vm);
        };

        vm.$onInit = function () {
            vm.carouselCtrl.addItem(vm);
        };
    }

    Controller.$inject = ['$scope'];

    angular.module('sky.carousel.item.component', [])
        .component('bbCarouselItem', {
            bindings: {},
            require: {
                carouselCtrl: '^bbCarousel'
            },
            templateUrl: 'sky/templates/carousel/carousel.item.component.html',
            transclude: true,
            controller: Controller
        });
}());
