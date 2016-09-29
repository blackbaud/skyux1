/*global angular */

(function () {
    'use strict';

    function Controller($element, $scope) {
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

        vm.$onDestroy = function () {
            $element.find('.bb-carousel-item').removeClass('bb-carousel-item');
            vm.carouselCtrl.removeItem(vm);
        };

        // There's no "ng-focusin" equivalent so we have to attach the handler
        // here instead.
        $element.on('focusin', function () {
            // Select this item when it or any of its child elements receive focus.
            // Otherwise if the user is tabbing through focusable elements inside
            // the item the browser will scroll the carousel container itself
            // and throw off the positioning of the selected item.
            vm.carouselCtrl.setSelectedItem(vm);
            $scope.$apply();
        });
    }

    Controller.$inject = ['$element', '$scope'];

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
