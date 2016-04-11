/*global angular */

(function () {
    'use strict';

    var evtNsPos = 0;

    angular.module('sky.pagination', ['ui.bootstrap.pagination'])
        .config(['uibPaginationConfig', function (paginationConfig) {
            paginationConfig.maxSize = 4;
            paginationConfig.itemsPerPage = 5;

            paginationConfig.nextText = paginationConfig.previousText = '';
        }])
        .factory('bbPaging', function () {
            return {
                init: function (sourceData, config) {
                    var paging;

                    function setPageData() {
                        var startingIndex,
                            currentPage;

                        if (!paging.disabled && sourceData) {
                            currentPage = paging.currentPage - 1; // 1-based

                            startingIndex = currentPage * paging.itemsPerPage;

                            paging.items = sourceData.slice(startingIndex, startingIndex + paging.itemsPerPage);
                        }
                    }

                    paging = {
                        currentPage: 1,
                        itemsPerPage: 5,
                        totalItems: sourceData ? sourceData.length : 0,
                        pageChanged: setPageData
                    };

                    angular.extend(paging, config);

                    setPageData();

                    return paging;
                }
            };
        })
        .directive('bbPagination', function () {
            return {
                restrict: 'A',
                scope: {
                    paginationDisabled: '=bbPaginationDisabled'
                },
                compile: function (el, attrs) {
                    var pagedData = attrs.bbPagination;

                    /*jslint white: true */
                    el.html(
                        '<uib-pagination ng-show="' + pagedData + '.totalItems > ' + pagedData + '.itemsPerPage" total-items="' + pagedData + '.totalItems" ng-model="' + pagedData + '.currentPage" ng-change="' + pagedData + '.pageChanged()" items-per-page="' + pagedData + '.itemsPerPage"></uib-pagination>' +
                        '<div class="clearfix"></div>'
                    );
                    /*jslint white: false */

                    return function (scope, el) {
                        scope.$watch('paginationDisabled', function (newValue) {
                            var paginationDummyEl,
                                paginationEl;

                            // Since we don't have complete control over the Angular Bootstrap UI pagination directive,
                            // we can't disable it directly.  Instead just clone the pagination element, disable it
                            // and show it while hiding the original element when pagination is disabled.
                            if (angular.isDefined(newValue)) {
                                paginationEl = el.find('.pagination');

                                if (newValue) {
                                    paginationDummyEl = paginationEl
                                        .clone()
                                        .addClass('bb-pagination-dummy');

                                    paginationEl
                                        .before(paginationDummyEl)
                                        .hide();

                                    paginationDummyEl.find('li').addClass('disabled');
                                } else {
                                    el.find('.bb-pagination-dummy').remove();
                                    paginationEl.show();
                                }
                            }
                        });
                    };
                }
            };
        })
        .directive('bbPaginationContent', ['$timeout', '$window', '$animate', function ($timeout, $window, $animate) {
            return {
                link: function (scope, el) {
                    var evtNs;

                    evtNsPos += 1;

                    evtNs = "bbPaginationContent" + evtNsPos;

                    function removeWindowResizeHandler() {
                        angular.element($window).off('.' + evtNs);
                    }

                    scope.$watch('pagedData', function () {
                        var pageCount,
                            pagedData,
                            windowResizeTimeout;

                        // set a min-height on paged data so the paging bar doesn't jump
                        // up when the user hits a page with less than the max number of items.
                        function setMinHeight() {

                            /* This functionality needs to be in a timeout so we can
                               force dirty checking in the changePage function with an $apply.
                               Failure to do so causes the ng-repeat that builds the rows to not
                               be updated, which leads to the same calculated height for each page
                               as the contents of the rows have not been updated. */
                            $timeout(function () {
                                var currentPage,
                                    placeholder,
                                    i,
                                    maxHeight = 0;

                                el.addClass('bb-pagination-content bb-pagination-content-calculating');

                                // Use a placeholder to keep track of where the element is before moving.
                                placeholder = angular.element('<div class="bb-pagination-placeholder"></div>');
                                el.after(placeholder);

                                // Append the element to the body in case certain css rules are affecting the height.
                                angular.element('body').prepend(el);

                                function changePage(pageNumber) {
                                    /* Disable animation for the page change
                                       to prevent issues with ng-repeat
                                       that impact min-height measurements */
                                    $animate.enabled(false, el);
                                    pagedData.currentPage = pageNumber;

                                    pagedData.pageChanged();
                                    scope.$apply();
                                    $animate.enabled(true, el);
                                }

                                // Cache the current page so we can put it back.
                                currentPage = pagedData.currentPage;

                                // Reset the min height from any previous iteration.
                                el.css('min-height', 0);

                                // Navigate through each page and find the tallest page.
                                for (i = 1; i <= pageCount; i += 1) {
                                    changePage(i);
                                    maxHeight = Math.max(el.height(), maxHeight);
                                }

                                // Set the min height to the height of the tallest page.
                                el.css('min-height', maxHeight);

                                // Navigate back to the initial page.
                                changePage(currentPage);

                                // Make sure to move the element back to its original position.
                                placeholder.after(el);
                                placeholder.remove();
                                el.removeClass('bb-pagination-content-calculating');
                            });
                        }

                        pagedData = scope.pagedData;

                        if (angular.isDefined(scope.pagedData)) {
                            pageCount = Math.ceil(pagedData.totalItems / (pagedData.itemsPerPage || 1));

                            if (pageCount > 1) {
                                setMinHeight();

                                removeWindowResizeHandler();

                                angular.element($window).on('resize.' + evtNs, function () {
                                    if (windowResizeTimeout) {
                                        $timeout.cancel(windowResizeTimeout);
                                    }

                                    windowResizeTimeout = $timeout(setMinHeight, 500);
                                });

                                el.on('$destroy', removeWindowResizeHandler);
                            }
                        }
                    });
                },
                scope: {
                    pagedData: '=bbPaginationContent'
                }
            };
        }]);
}());
