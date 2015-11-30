/*jslint nomen: true, plusplus: true */
/*global angular, jQuery */

/** @module Tab Scroll
@icon arrows-h
@summary The tab scroll component makes a row of tabs horizontally scrollable when the row is wider than its container.
 @description ### Dependencies ###

The `bb-tab-scroll` directive causes the row of tabs to be horizontally scrollable when the width of the tabs exceeds the width of its container.  The tabs are also animated to indicate to the user that they can be scrolled.

### Tab Scroll Settings ###

 - `bb-tab-scroll-ready` Used to indicate the tabs are ready to be animated.  This should be used when the tabs are loaded dynamically based on some asynchronous logic like loading data from a web server.

 */

(function ($) {
    'use strict';

    var tabScrollId = 0;

    angular.module('sky.tabscroll', ['ui.bootstrap.tabs'])
        .directive('bbTabScroll', ['$timeout', '$window', function ($timeout, $window) {
            return {
                link: function (scope, el, attrs) {
                    var lastWindowResizeTimeout,
                        lastWindowWidth;

                    function getNavTabsEl() {
                        return el.children('.nav-tabs');
                    }

                    function getScrollLeftForEl(navTabsEl, selector) {
                        var elWidth,
                            scrollLeft,
                            tabEl,
                            tabLeft,
                            tabPosition,
                            tabRight;

                        if (angular.isString(selector)) {
                            tabEl = navTabsEl.children(selector);
                        } else {
                            tabEl = selector;
                        }

                        tabPosition = tabEl.position();

                        if (tabPosition) {
                            tabLeft = tabPosition.left;

                            if (tabLeft < 0) {
                                scrollLeft = tabLeft + navTabsEl[0].scrollLeft;
                            } else {
                                elWidth = el.width();
                                tabRight = tabLeft + tabEl.width();

                                if (tabRight > elWidth) {
                                    scrollLeft = navTabsEl[0].scrollLeft + (tabRight - elWidth);
                                }
                            }
                        }

                        return scrollLeft;
                    }

                    function getScrollLeft(navTabsEl) {
                        return getScrollLeftForEl(navTabsEl, '.active') || 0;
                    }

                    function stopAnimateTabScroll(navTabsEl) {
                        navTabsEl.stop(true, true);
                    }

                    function animateTabScroll(navTabsEl, scrollLeft, duration) {
                        stopAnimateTabScroll(navTabsEl);

                        navTabsEl
                            .animate(
                                {
                                    scrollLeft: scrollLeft
                                },
                                {
                                    duration: duration || 500
                                }
                            );
                    }

                    function showTabsCanScroll(force) {
                        var hasOverflow,
                            navTabsEl = getNavTabsEl(),
                            overflowOccurred,
                            scrollLeft;

                        /*istanbul ignore else: sanity check */
                        if (navTabsEl.length > 0) {
                            hasOverflow = angular.isDefined(getScrollLeftForEl(navTabsEl, 'li:first')) ||
                                angular.isDefined(getScrollLeftForEl(navTabsEl, 'li:last'));

                            force = force || angular.isDefined(getScrollLeftForEl(navTabsEl, '.active'));

                            overflowOccurred = !showTabsCanScroll.previousHadOverflow && hasOverflow;

                            if (force || overflowOccurred) {
                                scrollLeft = getScrollLeft(navTabsEl);

                                stopAnimateTabScroll(navTabsEl);

                                if (overflowOccurred) {
                                    navTabsEl.scrollLeft(navTabsEl[0].scrollWidth - el.width());
                                }

                                animateTabScroll(navTabsEl, scrollLeft);
                            }
                        }

                        showTabsCanScroll.previousHadOverflow = hasOverflow;
                    }

                    tabScrollId++;

                    el.addClass('bb-tab-scroll');

                    if (attrs.bbTabScrollReady) {
                        scope.$watch(attrs.bbTabScrollReady, function (newValue, oldValue) {
                            if (newValue && newValue !== oldValue) {
                                showTabsCanScroll(true);
                            }
                        });
                    }

                    lastWindowWidth = $($window).width();

                    // Show initial scroll animation whenever the window width changes.
                    $($window).on('resize.tabscroll' + tabScrollId, function () {
                        var windowWidth = $($window).width();

                        if (lastWindowWidth !== windowWidth) {
                            $timeout.cancel(lastWindowResizeTimeout);

                            lastWindowResizeTimeout = $timeout(function () {
                                showTabsCanScroll();
                            }, 250);
                        }

                        lastWindowWidth = windowWidth;
                    });

                    // Ensure that when a tab is clicked the tab is fully visible and not partially
                    // scrolled off either side.
                    el.on('click', '> .nav-tabs > li', function () {
                        var navTabsEl,
                            scrollLeft;

                        navTabsEl = getNavTabsEl();
                        scrollLeft = getScrollLeftForEl(navTabsEl, $(this));

                        if (angular.isDefined(scrollLeft)) {
                            animateTabScroll(navTabsEl, scrollLeft, 250);
                        }
                    });

                    el.on('$destroy', function () {
                        $($window).off('.tabscroll' + tabScrollId);
                    });
                }
            };
        }]);
}(jQuery));
