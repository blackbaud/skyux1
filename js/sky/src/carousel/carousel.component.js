/*global angular */

(function () {
    'use strict';

    var MAX_DOTS = 10;

    function Controller($scope, $element) {
        var vm = this;

        function getItemEls() {
            return $element[0].querySelectorAll('.bb-carousel-item');
        }

        function allowIndex(itemIndex) {
            return itemIndex >= 0 && itemIndex < getItemEls().length; 
        }

        function createDots() {
            var i,
                itemCount = getItemEls().length,
                lastDot,
                nextDot;

            vm.dots = [];
            if (itemCount <= MAX_DOTS) {
                for (i = 0; i < itemCount; i++) {
                    vm.dots.push(i);
                }
            } else {
                for (i = 0; i < MAX_DOTS; i++) {
                    switch (i) {
                    case 0:
                        nextDot = 0;
                        break;
                    case (MAX_DOTS - 1):
                        nextDot = itemCount - 1;
                        break;
                    default:
                        nextDot = Math.floor((i * itemCount / (MAX_DOTS - 1)));
                        break;
                    }

                    vm.dots.push(nextDot);

                    lastDot = nextDot;
                }
            }
        }

        function createTransformCss(offset) {
            return 'translate3d(' + offset + '%, 0, 0) scale(' + (offset ? '0.9' : '1') + ')';
        }

        vm.currentItemIndex = 0;
        vm.items = [];

        vm.addItem = function (item) {
            vm.items.push(item);
        };

        vm.setSelectedItem = function (item) {
            var i,
                itemEl,
                itemEls,
                n,
                offset;

            if (typeof item !== 'number') {
                item = vm.items.indexOf(item);
            }

            if (!allowIndex(item)) {
                return;
            }

            offset = item * -100;

            itemEls = getItemEls();

            if (itemEls) {
                for (i = 0, n = itemEls.length; i < n; i++) {
                    itemEl = itemEls[i];
                    itemEl.style.transform = createTransformCss(offset);

                    offset += 100;
                }
            }

            vm.currentItemIndex = item;

            vm.allowPrevious = vm.currentItemIndex > 0;
            vm.allowNext = vm.currentItemIndex < itemEls.length - 1;
        };

        vm.nextCard = function () {
            vm.setSelectedItem(vm.currentItemIndex + 1);
        };

        vm.previousCard = function () {
            vm.setSelectedItem(vm.currentItemIndex - 1);
        };

        $scope.$watchCollection(function () {
            return vm.items;
        }, function () {
            createDots();
            vm.setSelectedItem(vm.currentItemIndex);
        });
    }

    Controller.$inject = ['$scope', '$element'];

    angular.module('sky.carousel.component', [])
        .component('bbCarousel', {
            bindings: {},
            templateUrl: 'sky/templates/carousel/carousel.component.html',
            transclude: true,
            controller: Controller
        });
}());
