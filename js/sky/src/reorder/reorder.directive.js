/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbReorder($filter) {
        var bbAutonumericConfig = {
            mDec: 0
        };

        function applyNumberFormatting(index) {
            return $filter('bbAutonumeric')(index, bbAutonumericConfig);
        }

        function setSiblingNumbers(incrementStep, siblingTraversalFunc, displayIndex, startSibling, currentSortItemSelector) {
            var curSibling;

            curSibling = siblingTraversalFunc.call(startSibling, currentSortItemSelector);
            while (curSibling.length > 0) {
                displayIndex = displayIndex + incrementStep;
                curSibling.find('.bb-reorder-list-sorting-number').text(applyNumberFormatting(displayIndex));
                curSibling = siblingTraversalFunc.call(curSibling, currentSortItemSelector);
            }
        }

        function link(scope, el, attrs, vm) {
            var sortableOptions, // jQuery sortable widget options
                currentSortItemSelector, // jQuery selector to ignore the item being sorted
                originalSortItemIndex, // the original index of th item being sorted before sorting starts
                currentSortItemIndex, // the index where the sorting item is currently being placed
                actionBeingDone = false; // are we currently sorting or sending an item to the top

            vm.sorting = false;

            // sends a item to the top of the list with a rising animation
            vm.pushToTop = function (index) {
                var toTheTopEl,
                    toTheTopElOffset,
                    animateCloneEl;

                // if we are doing something already just ignore
                if (actionBeingDone) {
                    return;
                }

                actionBeingDone = true;
                el.sortable("disable"); // don't allow sorting during animation

                toTheTopEl = $(el.children()[index]);
                toTheTopElOffset = toTheTopEl.position();

                // create a clone of the element being sent to the top so we can animate it
                animateCloneEl = toTheTopEl.clone();
                animateCloneEl.addClass('bb-reorder-animate-element');
                animateCloneEl.css({top: toTheTopElOffset.top + "px", left: toTheTopElOffset.left + "px", width: toTheTopEl.outerWidth() + "px"});

                el.append(animateCloneEl);

                // hide the contents of the element being sent to the top of the list and grey it out
                toTheTopEl.children().css('visibility', 'hidden');
                toTheTopEl.addClass('bb-reorder-list-row-placeholder');

                // animate to the top of the directive
                $(animateCloneEl).fadeOut('slow', function () {
                   toTheTopEl.children().css('visibility', '');
                   toTheTopEl.removeClass('bb-reorder-list-row-placeholder');

                   el.find('.bb-reorder-animate-element').remove();
                   el.sortable("enable");

                   actionBeingDone = false;

                   scope.$apply(function () {
                       // perform the swap moving the item to the 0 index in the list
                       vm.bbReorderItems.splice(
                         0, 0,
                         vm.bbReorderItems.splice(index, 1)[0]);
                   });
               });
            };

            //Setup jQuery sortable options for the items being sorted
            sortableOptions = {
                placeholder: 'bb-reorder-list-row-placeholder', // class to put on placeholder element
                axis: 'y', // constrain movement to the Y axis
                scrollSpeed: 10,
                start: function (e, ui) {
                    scope.$apply(function () {
                        vm.sorting = true;
                    });

                    actionBeingDone = true;
                    currentSortItemSelector = "[data-index!='" + ui.item.attr('data-index') + "']";
                    originalSortItemIndex = el.children(currentSortItemSelector).index(ui.placeholder);
                    currentSortItemIndex = originalSortItemIndex;

                    // need to set the height of the placeholder since we need to account for the padding on the row items
                    ui.placeholder.height(ui.item.outerHeight());
                    ui.item.addClass('bb-reorder-list-sorting-item');

                    // set the current index of all rows for display purposes
                    $.each(el.children('.bb-reorder-list-row'), function (i, item) {
                        $(item).find('.bb-reorder-list-sorting-number').text(applyNumberFormatting(i + 1));
                    });
                },
                stop: function (e, ui) {
                    ui.item.removeClass('bb-reorder-list-sorting-item');

                    scope.$apply(function () {
                        vm.sorting = false;
                    });

                    actionBeingDone = false;
                    currentSortItemSelector = null;
                    originalSortItemIndex = null;
                },
                update: function (e, ui) {
                    var index = ui.item.index();

                    // stop the sortable from moving the element as we want the ng-repeat directive to do the actual reorder
                    el.sortable('cancel');

                    scope.$apply(function () {
                        // perform the swap that the user just performed
                        vm.bbReorderItems.splice(
                          index, 0,
                          vm.bbReorderItems.splice(originalSortItemIndex, 1)[0]);
                    });
                },
                change: function (e, ui) {
                    var displayIndex,
                        newIndex;

                    // Since the element being sorted is positioned absolute it remains in the
                    // same position so we can't use its index. Instead use the placeholder since
                    // that will be in the right position in the list.
                    newIndex = el.children(currentSortItemSelector).index(ui.placeholder);

                    if (newIndex === currentSortItemIndex) {
                        return;
                    }

                    displayIndex = newIndex + 1;

                    ui.item.find('.bb-reorder-list-sorting-number').text(applyNumberFormatting(displayIndex));

                    // when we are sorting, change the position numbers on the rows
                    if (newIndex > currentSortItemIndex) {
                        // set the text of all previous siblings to account for change
                        setSiblingNumbers(-1, $.fn.prev, displayIndex, ui.placeholder, currentSortItemSelector);
                    } else {
                        // set the text of all next siblings to account for change
                        setSiblingNumbers(1, $.fn.next, displayIndex, ui.placeholder, currentSortItemSelector);
                    }

                    currentSortItemIndex = newIndex;
                }
            };

            el.sortable(sortableOptions);
        }

        return {
            replace: true,
            restrict: 'E',
            scope: {},
            bindToController: {
                bbReorderItems: '='
            },
            controller: angular.noop,
            controllerAs: 'bbReorder',
            templateUrl: 'sky/templates/reorder/reorder.directive.html',
            link: link
        };
    }

    bbReorder.$inject = ['$filter'];

    angular.module('sky.reorder.directive', ['sky.resources', 'sky.autonumeric'])
        .directive('bbReorder', bbReorder);
}(jQuery));
