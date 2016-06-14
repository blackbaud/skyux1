/*global angular */

(function () {
    'use strict';

    function Controller($element) {
        var vm = this;

        vm.elIsItem = function (el) {
            return $element[0].contains(el);
        };

        vm.itemClick = function () {
            vm.carouselCtrl.setSelectedItem(vm);
        };

        vm.$onInit = function () {
            vm.carouselCtrl.addItem(vm);
        };
    }

    Controller.$inject = ['$element'];

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
