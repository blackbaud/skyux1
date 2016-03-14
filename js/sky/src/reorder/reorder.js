/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbReorder() {
        return {
            replace: true,
            restrict: 'E',
            scope: { bbReorderItems: '=' },
            link: function ($scope, element) {
                var sortableOptions, // jQuery sortable widget options
                    currentSortPosition, // the current top offset of the the item being sorted
                    currentSortItemSelector, // jQuery selector to ignore the item being sorted
                    originalSortItemIndex, // the original index of th item being sorted before sorting starts
                    actionBeingDone = false; // are we currently sorting or sending an item to the top

                $scope.sorting = false;

                // sends a item to the top of the list with a rising animation
                $scope.pushToTop = function (index) {
                  var toTheTopEl,
                      toTheTopElOffset,
                      animateCloneEl;

                  // if we are doing something already just ignore
                  if (actionBeingDone) return;

                  actionBeingDone = true;
                  element.sortable("disable"); // don't allow sorting during animation

                  toTheTopEl = $(element.children()[index]);
                  toTheTopElOffset = toTheTopEl.offset();

                  // create a clone of the element being send to the top so we can animate it
                  animateCloneEl = document.createElement("div");
                  animateCloneEl.style.position = 'absolute';
                  animateCloneEl.style.top = toTheTopElOffset.top + "px";
                  animateCloneEl.style.left = toTheTopElOffset.left + "px";
                  animateCloneEl.style.width = toTheTopEl.outerWidth() + "px";
                  animateCloneEl.style.background = 'white';
                  animateCloneEl.innerHTML = toTheTopEl.html();
                  animateCloneEl.className = 'bb-reorder-list-row bb-reorder-list-sorting-item';

                  document.body.appendChild(animateCloneEl);

                  // hide the contents of the element being sent to the top of the list and grey it out
                  toTheTopEl.children().css('visibility', 'hidden');
                  toTheTopEl.addClass('bb-reorder-list-row-placeholder');

                  // animate to the top of the directive
                  $(animateCloneEl).animate({top: element.offset().top}, 300, 'swing', function () {
                    $scope.$apply(function () {

                      // perform the swap moving the item to the 0 index in the list
                      $scope.bbReorderItems.splice(
                        0, 0,
                        $scope.bbReorderItems.splice(index, 1)[0]);

                      toTheTopEl.children().css('visibility', '');
                      toTheTopEl.removeClass('bb-reorder-list-row-placeholder');

                      document.body.removeChild(animateCloneEl);
                      element.sortable("enable");

                      actionBeingDone = false;
                    });
                  });
                };

                //Setup jQuery sortable options for the items being sorted
                sortableOptions = {
                    placeholder: 'bb-reorder-list-row-placeholder', // class to put on placehoder element
                    revert: 250, // animation timing for placing an item back into the list
                    axis: "y", // constrain movement to the Y axis
                    start: function(e, ui) {
                        $scope.$apply(function () {
                            $scope.sorting = true;
                        });

                        actionBeingDone = true;
                        currentSortItemSelector = "[data-index!='" + ui.item.attr('data-index') + "']";
                        originalSortItemIndex = element.children(currentSortItemSelector).index(ui.placeholder);
                        currentSortPosition = ui.item.offset().top;

                        // need to set the height of the placeholder since we need to account for the padding on the row items
                        ui.placeholder.height(ui.item.outerHeight());
                        ui.item.addClass('bb-reorder-list-sorting-item');
                        ui.item.css({'background-color': 'white'});

                        // set the current index of all rows for display purposes
                        $.each(element.children('.bb-reorder-list-row'), function (i, item) {
                          $(item).find('.bb-reorder-list-sorting-number').text(i + 1);
                        });
                    },
                    stop: function (e, ui) {
                      ui.item.removeClass('bb-reorder-list-sorting-item');
                      ui.item.css({'background-color': ''});

                      $scope.$apply(function () {
                          $scope.sorting = false;
                      });

                      actionBeingDone = false;
                      currentSortPosition = null;
                      currentSortItemSelector = null;
                      originalSortItemIndex = null;
                    },
                    update: function(e, ui) {
                        var index = ui.item.index();

                        // stop the sortable from moving the element as we want the ng-repeat directive to do the actual reorder
                        element.sortable('cancel');

                        $scope.$apply(function () {
                          // perform the swap in the that the user just performed
                          $scope.bbReorderItems.splice(
                            index , 0,
                            $scope.bbReorderItems.splice(originalSortItemIndex, 1)[0]);
                        });
                    },
                    change: function(e, ui) {
                        var newSortPosition = ui.offset.top,
                            curSibling,
                            index = element.children(currentSortItemSelector).index(ui.placeholder) + 1; // the current index of the placeholder in the list

                        // when we are sorting, change the position numbers
                        if (newSortPosition === currentSortPosition) {
                          return;
                        } else if (newSortPosition > currentSortPosition) {
                          ui.item.find('.bb-reorder-list-sorting-number').text(index);

                          // set the text of all previous siblings to account for change
                          curSibling = ui.placeholder.prev(currentSortItemSelector);
                          while (curSibling.length > 0) {
                            index = index - 1;
                            curSibling.find('.bb-reorder-list-sorting-number').text(index);
                            curSibling = curSibling.prev(currentSortItemSelector);
                          }
                        } else {
                          ui.item.find('.bb-reorder-list-sorting-number').text(index);

                          // set the text of all next siblings to account for change
                          var curSibling = ui.placeholder.next(currentSortItemSelector);
                          while (curSibling.length > 0) {
                            index = index + 1;
                            curSibling.find('.bb-reorder-list-sorting-number').text(index);
                            curSibling = curSibling.next(currentSortItemSelector);
                          }
                        }

                        currentSortPosition = newSortPosition;
                    }
                };

                element.sortable(sortableOptions);
            },
            templateUrl: 'sky/templates/reorder/reorder.html'
        };
    }

    bbReorder.$inject = [];

    angular.module('sky.reorder', ['sky.resources'])
        .directive('bbReorder', bbReorder);
}(jQuery));
