/*global angular, jQuery */

(function ($) {
    'use strict';

    function Controller($scope, $element, $timeout, $filter) {
        var sortableOptions, // jQuery sortable widget options
            originalSortItemIndex, // the original index of th item being sorted before sorting starts
            currentSortItemIndex, // the index where the sorting item is currently being placed
            finalIndex = -1, // the final index of the element being sorting after sorting has ended
            currentRepeaterItems, // the set of items from ng-repeat before sorting starts
            vm = this,
            bbAutonumericConfig = {
                mDec: 0 // no decimals
            };

        function applyNumberFormatting(index) {
            return $filter('bbAutonumeric')(index, bbAutonumericConfig);
        }

        function setPositionNumberText(item, index) {
            $(item).find('.bb-reorder-list-sorting-number').text(applyNumberFormatting(index));
        }

        function setPositionNumbers(incrementStep, siblingTraversalFunc, displayIndex, placeholder, item) {
            var curSibling;

            // set the position number of the item being sorted to account for how the user moved it
            setPositionNumberText(item, displayIndex);

            curSibling = siblingTraversalFunc.call(placeholder).not(item);
            while (curSibling.length > 0) {
                displayIndex = displayIndex + incrementStep;
                setPositionNumberText(curSibling, displayIndex);
                curSibling = siblingTraversalFunc.call(curSibling).not(item);
            }
        }
        
        function getListItems() {
            return $element.find('.bb-reorder-list-row');
        }
            
        vm.sorting = false;
            
        // sends an item to the top of the list with a rising animation
        vm.pushToTop = function (item) {
            var toTheTopEl,
                index,
                toTheTopElOffset,
                animateCloneEl;

            index = vm.bbReorderItems.indexOf(item);
            $element.sortable("disable"); // don't allow sorting during animation

            toTheTopEl = angular.element(getListItems()[index]);
            
            toTheTopElOffset = toTheTopEl.position();

            // create a clone of the element being moved to the top so we can animate it without messing with the ng-repeat
            animateCloneEl = toTheTopEl.clone();
            animateCloneEl.addClass('bb-reorder-animate-element');
            animateCloneEl.css({top: toTheTopElOffset.top + "px", left: toTheTopElOffset.left + "px", width: toTheTopEl.outerWidth() + "px"});

            $element.append(animateCloneEl);

            toTheTopEl.addClass('bb-reorder-list-row-placeholder');

            // animate that we are moving the item to the top of the list
            $(animateCloneEl).fadeOut({duration: 500, queue: false, always: function () {
                    toTheTopEl.removeClass('bb-reorder-list-row-placeholder');

                    animateCloneEl.remove();
                    $element.sortable("enable");

                    $scope.$apply(function () {
                        // perform the swap moving the item to the top of the list
                        vm.bbReorderItems.splice(
                        0, 0,
                        vm.bbReorderItems.splice(index, 1)[0]);
                    });
                }});
        };

        //Setup jQuery sortable options for the items being sorted
        sortableOptions = {
            placeholder: 'bb-reorder-list-row-placeholder', // class to put on placeholder element
            axis: 'y', // constrain movement to the Y axis,
            handle: '.bb-reorder-list-col-icon',
            start: function (e, ui) {
                $scope.$apply(function () {
                    vm.sorting = true;
                });

                // need to keep track of the how the items were placed in the DOM since
                // the sortable is going to mess them up which breaks ng-repeat
                currentRepeaterItems = $element.contents().not(ui.placeholder);

                ui.item.addClass('bb-reorder-list-sorting-item');

                originalSortItemIndex = ui.item.index();
                currentSortItemIndex = originalSortItemIndex;

                // need to set the height of the placeholder since we need to account for the padding on the row items
                ui.placeholder.height(ui.item.outerHeight());

                // set the current index of all rows for display purposes
                $.each(getListItems(), function (i, item) {
                    setPositionNumberText(item, i + 1);
                });
            },
            stop: function (e, ui) {
                // replace the repeater elements and comments so ng-repeat does not break
                currentRepeaterItems.appendTo($element);

                ui.item.removeClass('bb-reorder-list-sorting-item');

                if (finalIndex >= 0 && finalIndex !== originalSortItemIndex) {
                    $scope.$apply(function () {
                        // perform the swap that the user just performed
                        vm.bbReorderItems.splice(
                            finalIndex, 0,
                            vm.bbReorderItems.splice(originalSortItemIndex, 1)[0]);
                    });
                }

                $scope.$apply(function () {
                    vm.sorting = false;
                });

                originalSortItemIndex = null;
                currentSortItemIndex = null;
                finalIndex = -1;
                currentRepeaterItems = null;

                // once the ng-repeat has finished rendering the move, re-enable animations
                $timeout(function () {
                    getListItems().removeClass('bb-reorder-list-no-animate');
                });
            },
            update: function (e, ui) {
                // grab the final index of the item being sorted before we cancel
                // the sort and its position gets reset.
                finalIndex = ui.item.index();

                // don't animate the move when sorting
                getListItems().addClass('bb-reorder-list-no-animate');

                // stop the sortable from moving the element as we want the ng-repeat directive to do the actual reorder
                $element.sortable('cancel');
            },
            change: function (e, ui) {
                var displayIndex,
                    newIndex;

                // Since the element being sorted is positioned absolute it remains in the
                // same position so we can't use its index. Instead use the placeholder since
                // that will be in the right position in the list.
                newIndex = ui.item.siblings().index(ui.placeholder);

                if (newIndex === currentSortItemIndex) {
                    return;
                }

                // the display position shown to the user should start at 1, not 0
                displayIndex = newIndex + 1;

                // when we are sorting, change the position numbers on the rows
                if (newIndex > currentSortItemIndex) {
                    // set the text of all previous siblings to account for change
                    setPositionNumbers(-1, $.fn.prev, displayIndex, ui.placeholder, ui.item);
                } else {
                    // set the text of all next siblings to account for change
                    setPositionNumbers(1, $.fn.next, displayIndex, ui.placeholder, ui.item);
                }

                currentSortItemIndex = newIndex;
            }
        };

        $element.sortable(sortableOptions);
    }
    
    Controller.$inject = ['$scope', '$element', '$timeout', '$filter'];
    
    angular.module('sky.reorder.component', ['sky.resources', 'sky.autonumeric', 'ngAnimate'])
        .component('bbReorder', {
            bindings: {
                bbReorderItems: '='
            },
            controller: Controller,
            templateUrl: 'sky/templates/reorder/reorder.component.html'
        });
}(jQuery));
