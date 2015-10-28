/*jshint browser: true */
/*global angular */

/** @module Scroll into View
@icon eye
@summary The scroll-into-view component causes an element to scroll into the viewport when its bound value changes.
 @description The scroll-into-view directive causes an element to scroll into the viewport whenever its bound value changes.

### Scroll-into-view Settings ###

 - `bb-scroll-into-view` The value that triggers the scroll.
 - `bb-scroll-into-view-highlight` A Boolean indicating whether the element should be highlighted when scrolling completes.
*/

(function () {
    'use strict';

    var CLS_HIGHLIGHTING = 'bb-scroll-into-view-highlighting',
        RETRY_INTERVAL = 100,
        RETRY_MAX = 10;

    angular.module('sky.scrollintoview', [])
        .constant('bbScrollIntoViewConfig', {
            reservedBottom: 0,
            reservedTop: 0
        })
        .factory('bbScrollIntoView', ['$window', 'bbScrollIntoViewConfig', function ($window, bbScrollIntoViewConfig) {
            function highlightEl(el, options) {
                if (options.highlight) {

                    // The automatic CSS class removal should be factored out once we have some more instances
                    // where we use animations.
                    el
                        .addClass(CLS_HIGHLIGHTING)
                        .one(
                            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                            /*istanbul ignore next */
                            function () {
                                el.removeClass(CLS_HIGHLIGHTING);
                            }
                        );
                }
            }

            function getScrollableParentEl(el) {
                var overflowY,
                    parentEl = el.parent();

                while (parentEl.length > 0) {
                    if (parentEl.is('body')) {
                        return parentEl;
                    }

                    overflowY = parentEl.css('overflow-y');

                    /*istanbul ignore else: sanity check (the computed overflow property will likely never return a non-string value) */
                    if (angular.isString(overflowY)) {
                        switch (overflowY.toUpperCase()) {
                        case 'AUTO':
                        case 'HIDDEN':
                        case 'SCROLL':
                            return parentEl;
                        }
                    }

                    parentEl = parentEl.parent();
                }
            }

            function getHtmlOrBodyScrollTop() {
                return angular.element('html').scrollTop() || angular.element('body').scrollTop();
            }

            function scrollIntoView(el, options) {
                var currentScrollTop,
                    elBottom,
                    elHeight,
                    elOffset,
                    elTop,
                    elToScroll,
                    isScrolledOffBottom,
                    isScrolledOffTop,
                    newScrollTop,
                    parentEl,
                    parentElIsBody,
                    parentHeight,
                    reservedBottom,
                    reservedTop,
                    viewportHeight;

                parentEl = getScrollableParentEl(el);
                parentElIsBody = parentEl.is('body');

                options = options || {};

                reservedBottom = options.reservedBottom;
                reservedTop = options.reservedTop;

                if (!angular.isDefined(reservedBottom)) {
                    reservedBottom = 0;

                    if (parentElIsBody) {
                        reservedBottom = bbScrollIntoViewConfig.reservedBottom || 0;
                    }
                }

                if (!angular.isDefined(reservedTop)) {
                    reservedTop = 0;

                    if (parentElIsBody) {
                        reservedTop = bbScrollIntoViewConfig.reservedTop || 0;
                    }
                }

                if (options.highlight) {
                    reservedBottom += 50;
                    reservedTop += 50;
                }

                if (parentElIsBody) {
                    currentScrollTop = getHtmlOrBodyScrollTop();
                } else {
                    currentScrollTop = parentEl.scrollTop();
                }

                elOffset = el.offset();
                elHeight = el.outerHeight();

                elTop = elOffset.top;

                if (!parentElIsBody) {
                    elTop = (elTop - parentEl.offset().top) + currentScrollTop;
                }

                elBottom = elTop + elHeight;

                parentHeight = parentElIsBody ? angular.element(window).height() : parentEl.height();

                isScrolledOffBottom = elBottom > parentHeight + (currentScrollTop - reservedBottom);
                isScrolledOffTop = elTop < (currentScrollTop + reservedTop);

                if (isScrolledOffBottom || isScrolledOffTop) {
                    if (isScrolledOffBottom) {
                        newScrollTop = elBottom - (parentHeight - reservedBottom);
                    }

                    viewportHeight = parentHeight - (reservedTop + reservedBottom);

                    // Ensure the top of the element is visible after scrolling even if it is currently
                    // scrolled off the bottom of the viewport.
                    if (!isScrolledOffBottom || elHeight > viewportHeight) {
                        newScrollTop = elTop - reservedTop;
                    }

                    elToScroll = parentElIsBody ? angular.element('html, body') : parentEl;

                    elToScroll.animate(
                        {
                            scrollTop: Math.round(newScrollTop)
                        },
                        {
                            duration: 250,
                            always: function () {
                                highlightEl(el, options);
                            }
                        }
                    );
                } else {
                    highlightEl(el, options);
                }
            }

            return scrollIntoView;
        }])
        .directive('bbScrollIntoView', ['$timeout', 'bbScrollIntoViewConfig', 'bbScrollIntoView', function ($timeout, bbScrollIntoViewConfig, bbScrollIntoView) {
            function link(scope, el, attrs) {
                var options,
                    previousTimeout,
                    retryCount;

                function doScroll(firstTry) {
                    if (previousTimeout) {
                        // Make sure any pending scrolling is canceled.
                        $timeout.cancel(previousTimeout);
                    }

                    if (firstTry) {
                        retryCount = 0;
                    }

                    /*istanbul ignore else: hard to reach in a unit test */
                    if (el.is(':visible') && el.children('.collapsing').length === 0) {
                        options = angular.extend({}, bbScrollIntoViewConfig);

                        if (attrs.bbScrollIntoViewHighlight) {
                            options.highlight = scope.$eval(attrs.bbScrollIntoViewHighlight);
                        }

                        bbScrollIntoView(el, options);
                    } else if (retryCount < RETRY_MAX) {
                        // Keep trying to scroll until the element is visible or we run out of retry attempts.
                        retryCount++;
                        previousTimeout = $timeout(doScroll, RETRY_INTERVAL);
                    }
                }

                /*istanbul ignore else: sanity check */
                if (attrs.bbScrollIntoView) {
                    scope.$watch(attrs.bbScrollIntoView, function (newValue, oldValue) {
                        if (newValue && newValue !== oldValue) {
                            doScroll(true);
                        }
                    });
                }
            }

            return {
                link: link,
                restrict: 'A'
            };
        }]);
}());
