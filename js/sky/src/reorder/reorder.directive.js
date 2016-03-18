/*global angular, jQuery, document */

(function ($) {
    'use strict';

    function bbReorder() {
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
                    toTheTopElPos,
                    animateCloneEl;

                // if we are doing something already just ignore
                if (actionBeingDone) {
                    return;
                }

                actionBeingDone = true;
                el.sortable("disable"); // don't allow sorting during animation

                toTheTopEl = $(el.children()[index]);
                toTheTopElPos = toTheTopEl.position();

                // create a clone of the element being sent to the top so we can animate it
                animateCloneEl = document.createElement("div");
                animateCloneEl.style.position = 'absolute';
                animateCloneEl.style.top = toTheTopElPos.top + "px";
                animateCloneEl.style.left = toTheTopElPos.left + "px";
                animateCloneEl.style.width = toTheTopEl.outerWidth() + "px";
                animateCloneEl.innerHTML = toTheTopEl.html();
                animateCloneEl.className = 'bb-reorder-list-row bb-reorder-list-sorting-item';

                el.append(animateCloneEl);

                // hide the contents of the element being sent to the top of the list and grey it out
                toTheTopEl.children().css('visibility', 'hidden');
                toTheTopEl.addClass('bb-reorder-list-row-placeholder');

                // animate to the top of the directive
                $(animateCloneEl).animate({top: 0}, 400, 'easeInExpo', function () {
                   toTheTopEl.children().css('visibility', '');
                   toTheTopEl.removeClass('bb-reorder-list-row-placeholder');

                   el.find('.bb-reorder-list-sorting-item').remove();
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
                placeholder: 'bb-reorder-list-row-placeholder', // class to put on placehoder element
                axis: "y", // constrain movement to the Y axis
                scrollSpeed: 10,
                start: function (e, ui) {
                    actionBeingDone = true;
                    currentSortItemSelector = "[data-index!='" + ui.item.attr('data-index') + "']";
                    originalSortItemIndex = el.children(currentSortItemSelector).index(ui.placeholder);
                    currentSortItemIndex = originalSortItemIndex;

                    // need to set the height of the placeholder since we need to account for the padding on the row items
                    ui.placeholder.height(ui.item.outerHeight());
                    ui.item.addClass('bb-reorder-list-sorting-item');

                    // set the current index of all rows for display purposes
                    $.each(el.children('.bb-reorder-list-row'), function (i, item) {
                        $(item).find('.bb-reorder-list-sorting-number').text(i + 1);
                    });

                    scope.$apply(function () {
                        vm.sorting = true;
                    });
                },
                stop: function (e, ui) {
                    ui.item.removeClass('bb-reorder-list-sorting-item');
                    ui.item.css({'background-color': ''});

                    $.each(el.children('.bb-reorder-list-row'), function (i, item) {
                        $(item).find('.bb-reorder-list-sorting-number').text('');
                    });

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
                    var curSibling,
                        displayIndex,
                        newIndex;

                    // Since the element being sorted is positioned absolute it remains in the
                    // same position so we can't use its index. Instead use the placeholder since
                    // that will be in the right position in the list.
                    newIndex = el.children(currentSortItemSelector).index(ui.placeholder);

                    if (newIndex === currentSortItemIndex) {
                        return;
                    }

                    displayIndex = newIndex + 1;

                    ui.item.find('.bb-reorder-list-sorting-number').text(displayIndex);

                    // when we are sorting, change the position numbers on the rows
                    if (newIndex > currentSortItemIndex) {
                        // set the text of all previous siblings to account for change
                        curSibling = ui.placeholder.prev(currentSortItemSelector);
                        while (curSibling.length > 0) {
                            displayIndex = displayIndex - 1;
                            curSibling.find('.bb-reorder-list-sorting-number').text(displayIndex);
                            curSibling = curSibling.prev(currentSortItemSelector);
                        }
                    } else {
                        // set the text of all next siblings to account for change
                        curSibling = ui.placeholder.next(currentSortItemSelector);
                        while (curSibling.length > 0) {
                            displayIndex = displayIndex + 1;
                            curSibling.find('.bb-reorder-list-sorting-number').text(displayIndex);
                            curSibling = curSibling.next(currentSortItemSelector);
                        }
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

    bbReorder.$inject = [];

    angular.module('sky.reorder.directive', ['sky.resources'])
        .directive('bbReorder', bbReorder);
}(jQuery));
