/*global angular*/

/** @module Window
@icon desktop
@summary The window services provides helper methods to edit the browser’s window title and to obtain the browser’s scrollbar width.
@description An angular service with the following functions:

  - `setWindowTitle(title)` Changes the browser window's title. If a product name is specified in `bbWindowConfig`, then the product name will be appended to the passed title.
  - `getScrollbarWidth` Calculates and returns the width of the scrollbar for the current browser.
  - `isIosUserAgent` Uses window navigator user agent to determine if current user agent is an iPod, iPad, or iPhone.
*/

(function () {
    'use strict';

    angular.module('sky.window', [])
        .constant('bbWindowConfig', {
            productName: ''
        })
        .factory('bbWindow', ['$window', 'bbWindowConfig', '$timeout', '$document', function ($window, bbWindowConfig, $timeout, $document) {
            var scrollbarWidth;

            function calculateScrollbarWidth() {
                var inner,
                    outer,
                    w1,
                    w2;

                inner = angular.element('<p></p>');
                inner.css('width', '100%');
                inner.css('height', '200px');

                outer = angular.element('<div></div>');
                outer.css('position', 'absolute');
                outer.css('top', '0px');
                outer.css('left', '0px');
                outer.css('visibility', 'hidden');
                outer.css('width', '200px');
                outer.css('height', '150px');
                outer.css('overflow', 'hidden');

                outer.append(inner);

                $document.find('body').append(outer);

                w1 = inner[0].offsetWidth;

                outer.css('overflow', 'scroll');
                w2 = inner[0].offsetWidth;

                /*istanbul ignore next: sanity check */
                if (w1 === w2) {
                    w2 = outer[0].clientWidth;
                }
                outer.remove();
                return (w1 - w2);
            }

            return {
                setWindowTitle: function (title) {
                    var textToAppend = bbWindowConfig.productName;

                    if (textToAppend) {
                        title = title || '';

                        if (title) {
                            title += ' - ';
                        }

                        title += textToAppend;
                    }

                    //Adding a delay so the setWindowTitle method can be safely called after an angular
                    //state change without taking affect until after the browser has completed its
                    //state change.  Without this, the previous page will be renamed in the browser history.
                    $timeout(function () {
                        $window.document.title = title;
                    });
                },
                getScrollbarWidth: function () {
                    if (!scrollbarWidth && scrollbarWidth !== 0) {
                        scrollbarWidth = calculateScrollbarWidth();
                    }

                    return scrollbarWidth;
                },
                isIosUserAgent: function () {
                    return /iPad|iPod|iPhone/i.test($window.navigator.userAgent);
                }
            };
        }]);
}());
