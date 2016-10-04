/*global angular */

(function () {
    'use strict';

    var MAX_DOTS = 10;

    function Controller($scope, $element, bbFormat, bbResources) {
        var currentItemIndex,
            currentItem,
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

        function getElItem(index) {
            var el,
                i,
                items = vm.items,
                itemEls = getItemEls(),
                n;

            if (index < itemEls.length) {
                el = itemEls[index];

                for (i = 0, n = items.length; i < n; i++) {
                    if (items[i].elIsItem(el)) {
                        return items[i];
                    }
                }
            }
        }

        currentItemIndex = 0;

        vm.items = [];

        vm.addItem = function (item) {
            vm.items.push(item);

            if ((angular.isUndefined(vm.bbCarouselSelectedIndex) && vm.items.length === 1) || vm.bbCarouselSelectedIndex === (vm.items.length - 1)) {
                vm.setSelectedItem(vm.bbCarouselSelectedIndex || 0, true);
            }
            
        };

        vm.removeItem = function (item) {
            var elIndex,
                i,
                items = vm.items,
                index,
                n;

            //Remove the item from the item array;
            for (i = 0, n = items.length; i < n; i++) {
                if (items[i] === item) {
                    index = i;
                    break;
                }
            }       

            items.splice(index, 1);

            //Update selected element index.
            if (currentItemIndex >= (items.length)) {
                //If the selected index is out of bounds after removal, select the last element
                vm.setSelectedItem(items.length - 1, true);
            } else {
                //If the current selected item is still in the array but at a different index, update the current selected index.  This would happen
                //if an item before the current selected item is removed.  In that case, the indexes would have shifted.
                elIndex = getElIndex(currentItem);
                if (elIndex >= 0 && elIndex !== currentItemIndex) {
                    vm.setSelectedItem(elIndex, true);
                }
            }
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
            currentItem = getElItem(item);

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

        function onChanges(changesObj) {
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbCarouselSelectedIndex && angular.isDefined(changesObj.bbCarouselSelectedIndex.currentValue)) {
                vm.setSelectedItem(changesObj.bbCarouselSelectedIndex.currentValue || 0, true);
            }
        }

        vm.$onChanges = onChanges;

    }

    Controller.$inject = ['$scope', '$element', 'bbFormat', 'bbResources'];

    angular.module('sky.carousel.component', ['ngTouch', 'sky.format', 'sky.resources'])
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
