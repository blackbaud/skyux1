/*global angular */

(function () {
    'use strict';

    var MAX_DOTS = 10;

    function Controller($scope, $element, bbFormat, bbResources) {
        var currentItemIndex,
            vm = this;

        function getItemEls() {
            return $element[0].querySelectorAll('.bb-carousel-item');
        }

        function allowIndex(itemIndex) {
            return itemIndex >= 0 && itemIndex < getItemEls().length; 
        }

        function createDots() {
            var i,
                itemCount = getItemEls().length,
                nextDot;

            vm.dots = [];
            if (itemCount <= MAX_DOTS) {
                for (i = 0; i < itemCount; i++) {
                    vm.dots.push(i);
                }
            } else {
                for (i = 0; i < MAX_DOTS; i++) {
                    nextDot = Math.floor((i * itemCount / (MAX_DOTS)));
                    vm.dots.push(nextDot);
                }
            }
        }

        function createTransformCss(offset) {
            if (offset) {
                return 'translate3d(' + offset + '%, 0, 0) scale(0.9)';    
            }

            return 'none';
        }

        function getElIndex(item) {
            var i,
                itemEls = getItemEls(),
                n;

            for (i = 0, n = itemEls.length; i < n; i++) {
                if (item.elIsItem(itemEls[i])) {
                    return i;
                }
            }
        }

        currentItemIndex = 0;

        vm.items = [];

        vm.addItem = function (item) {
            vm.items.push(item);
        };

        vm.setSelectedItem = function (item, skipChange) {
            var i,
                itemEl,
                itemEls,
                n,
                offset;

            if (typeof item !== 'number') {
                item = getElIndex(item);
            }

            /*istanbul ignore if */
            if (!allowIndex(item)) {
                return;
            }

            offset = item * -100;

            itemEls = getItemEls();

            /*istanbul ignore else */
            if (itemEls) {
                for (i = 0, n = itemEls.length; i < n; i++) {
                    itemEl = itemEls[i];
                    itemEl.style.transform = createTransformCss(offset);

                    offset += 100;
                }
            }

            currentItemIndex = item;

            vm.allowPrevious = currentItemIndex > 0;
            vm.allowNext = currentItemIndex < itemEls.length - 1;

            if (!skipChange && angular.isFunction(vm.bbCarouselSelectedIndexChange)) {
                vm.bbCarouselSelectedIndexChange({
                    index: currentItemIndex
                });
            }
        };

        vm.nextCard = function () {
            vm.setSelectedItem(currentItemIndex + 1);
        };

        vm.previousCard = function () {
            vm.setSelectedItem(currentItemIndex - 1);
        };

        vm.dotIsSelected = function (dot) {
            var dotIndex,
                dots = vm.dots,
                itemIndex = currentItemIndex;

            if (dot === itemIndex) {
                return true;
            }

            dotIndex = dots.indexOf(dot);

            if (dotIndex === dots.length - 1) {
                if (currentItemIndex > dots[dotIndex]) {
                    return true;
                }
            } else if (itemIndex > dots[dotIndex] && itemIndex < dots[dotIndex + 1]) {
                return true;
            }

            return false;
        };

        vm.getDotLabel = function (dot) {
            return bbFormat.formatText(bbResources.carousel_dot_label, dot + 1);
        };

        $scope.$watchCollection(function () {
            return vm.items;
        }, function () {
            createDots();
            vm.setSelectedItem(currentItemIndex, true);
        });

        $scope.$watch(function () {
            return vm.bbCarouselSelectedIndex;
        }, function () {
            vm.setSelectedItem(vm.bbCarouselSelectedIndex || 0, true);
        });
    }

    Controller.$inject = ['$scope', '$element', 'bbFormat', 'bbResources'];

    angular.module('sky.carousel.component', ['ngTouch'])
        .component('bbCarousel', {
            bindings: {
                bbCarouselSelectedIndex: '<?',
                bbCarouselSelectedIndexChange: '&?',
                bbCarouselStyle: '@'
            },
            templateUrl: 'sky/templates/carousel/carousel.component.html',
            transclude: true,
            controller: Controller
        });
}());
