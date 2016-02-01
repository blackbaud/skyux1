/*jslint browser: true */
/*global angular, jQuery */

/** @module Wait
@icon spinner
@summary The wait component disables an element in a waiting state and visually indicates that it is in a waiting state.
 @description The wait directive allows you to disable and visually indicate that an element is in a waiting state.
When `bb-wait` is set to true, the element will initially be blocked with a clear mask, but after 300ms a visual indicator will cover the element as well.
This will allow for the element to immediately be disabled but not cause visual disturbances for very brief waits.

### Dependencies ###

 - **[jquery.blockUI.js](http://malsup.com/jquery/block/) (2.66.0-2013.10.09 or higher)**

---

If the value bound to `bb-wait` is truthy, then the element will begin waiting until the value becomes falsey.

### Multiple Waits ###
You can set the value of `bb-wait` to a numeric value to track a count of simultaneous waits.
When waits are added, increment the wait count and when they are removed then decrement the count.
This will cause the wait UI to only clear once all waits are removed.

### Full-page Waits ###
If bb-wait is added to the `<body>` tag, then a full-page version of the wait UI will be created.

### Raising Wait Events ###
Wait events can be raised from one controller to another by calling `$scope.$emit("bbBeginWait");` and `$scope.$emit("bbEndWait");` respectively.
A controller can capture that event and begin waiting its element by listening for the event and updating its own bb-wait directive.
When doing so, itshould call `stopPropagation()` on the event so that other parents won't catch it as well.
Uncaught events will raise all the way to the main controller of the application which can cause the entire page to wait.

    $scope.$on("bbBeginWait", function (event) {
        event.stopPropagation();
        $scope.myElementWaitCount += 1;
    });

### Wait Service ###
In addition to the `bb-wait` directive, a `bbWait` service exists to allow functional access to adding and removing waits on elements or the page as a whole.
This service supports the following functions

 - `beginElWait(element)` - Adds a wait for the specified element. Implicitly tracks a wait count for the element.
 - `endElWait(element)` - Removes a wait for the specified element. Implicitly tracks a wait count for the element and clears the wait UI when the count is 0.
 - `clearElWait(element)` - Removes all waits for the specified element and will clear any wait UI.
 - `beginPageWait()` - Adds a wait for the whole page (same as body element). Implicitly tracks a wait count for the element.
 - `endPageWait()` - Removes a wait for the whole page (same as body element). Implicitly tracks a wait count for the element and clears the wait UI when the count is 0.
 - `clearPageWait()` - Removes all waits for the whole page (same as body element) and will clear any wait UI.
 */

(function ($) {
    'use strict';

    angular.module('sky.wait', [])
        .factory('bbWait', ['$timeout', function ($timeout) {

            var addWait,
                removeWait,
                clearBlockOptions,
                fullPageClearBlockOptions,
                fullPageVisibleBlockOptions,
                fullPageZIndex = 20000,
                nonBlockWaitCountAttr = 'bb-wait-non-block-count',
                visibleBlockOptions,
                showingWaitAttr = 'bb-wait-showingwait',
                waitCountAttr = 'bb-wait-count';

            visibleBlockOptions = {
                message: '<div class="bb-wait-wrap"><div class="bb-wait-spinner"></div></div>'
            };

            clearBlockOptions = {
                message: "",
                fadeOut: 0,
                fadeIn: 0,
                overlayCSS: {
                    opacity: 0
                }
            };

            fullPageClearBlockOptions = angular.copy(clearBlockOptions);
            fullPageClearBlockOptions.overlayCSS["z-index"] = fullPageZIndex;

            fullPageVisibleBlockOptions = angular.copy(visibleBlockOptions);
            fullPageVisibleBlockOptions.overlayCSS = { "z-index": fullPageZIndex };
            fullPageVisibleBlockOptions.css = { "z-index": fullPageZIndex + 1 };

            function isBlockUISupported() {
                // Returns whether jquery.blockUI is loaded.
                return ($ && $.blockUI);
            }

            function isFullPage(el) {
                // Returns whether the element specified should be causing a
                // full page wait rather than just on the element itself.
                return $(el)[0] === document.body;
            }

            function getWaitCount(el, nonblocking) {
                // Returns the elements current wait count
                var attr = nonblocking ? nonBlockWaitCountAttr : waitCountAttr;
                return parseInt($(el).data(attr) || 0, 10);
            }

            function setWaitCount(el, count, nonblocking) {
                var attr = nonblocking ? nonBlockWaitCountAttr : waitCountAttr;

                // Sets the elements current wait count
                if (!count) {
                    $(el).removeData(attr);
                } else {
                    $(el).data(attr, count);
                }
            }

            function nonblockEl(el, options) {
                var childOptions = angular.extend({}, options),
                    nonblock = $(el).children(".bb-wait-nonblock");

                if (nonblock.length === 0) {
                    nonblock = $("<div class='bb-wait-nonblock'></div>");
                    $(el).append(nonblock);
                    $(nonblock).click(function () {
                        nonblock.hide();
                    });
                }
                nonblock.show();

                childOptions.nonblocking = false;

                addWait(nonblock[0], childOptions);
            }

            function unNonblockEl(el, options) {
                var childOptions = angular.extend({}, options),
                    nonblock = $(el).children(".bb-wait-nonblock");

                if (nonblock.length > 0) {
                    childOptions.nonblocking = false;
                    removeWait(nonblock[0], childOptions);
                }
            }

            function blockEl(el, options) {
                // Shows the element block UI.

                var customBlockOptions,
                    $el = $(el);

                if (!isBlockUISupported()) {
                    return;
                }

                /* istanbul ignore if: this doesn't seem ever be hit; maybe revisit. */
                if ($el.data(showingWaitAttr)) {
                    // If we're already showing the block, then don't start this again.
                    // Using a different flag than the count itself to support delaying the unblock.
                    return;
                }

                function showFullBlock() {
                    /* istanbul ignore if: this doesn't seem ever be hit; maybe revisit. */
                    if (!$el.data(showingWaitAttr)) {
                        // If we're no longer showing the wait then the block was removed before the visible block was added.
                        // We shouldn't continue to add the visible block.
                        return;
                    }

                    if (isFullPage(el)) {
                        $.blockUI(angular.extend({}, fullPageVisibleBlockOptions, customBlockOptions));
                    } else {
                        $el.block(angular.extend({}, visibleBlockOptions, customBlockOptions));
                    }
                }

                options = angular.extend({}, {
                    visualBlockDelay: 300
                }, options || /* istanbul ignore next: sanity check */ {});

                customBlockOptions = {
                    fadeIn: options.fadeIn
                };

                $el.data(showingWaitAttr, true);

                if (options.visualBlockDelay) {
                    if (isFullPage(el)) {
                        $.blockUI(fullPageClearBlockOptions);
                    } else {
                        $el.block(clearBlockOptions);
                    }

                    $timeout(showFullBlock, options.visualBlockDelay);
                } else {
                    showFullBlock();
                }
            }

            function unblockEl(el) {
                // Removes the element block UI.

                // Including a setTimeout here so that if a block is immediately re-added, then there won't be a blink
                // between turning off the current block and then adding another.
                // This timeout could default to something higher than 0 or we could make it configurable if needed.
                // A set timeout of 0 handles blocks added without async operations before starting another, which
                // would indicate that the block should have been maintained anyways.
                $timeout(function () {
                    var $el;

                    /* istanbul ignore else: sanity check */
                    if (getWaitCount(el) === 0) {
                        $el = $(el);

                        if (!isBlockUISupported()) {
                            return;
                        }

                        if (isFullPage(el)) {
                            $.unblockUI();
                        } else {
                            $el.unblock();
                        }
                        $el.removeData(showingWaitAttr);
                    }
                }, 0);
            }

            addWait = function (el, options) {
                var count;
                options = options || {};

                // Increases the element wait count and shows the wait if the count is above 0.
                count = getWaitCount(el, options.nonblocking);
                count += 1;

                setWaitCount(el, count, options.nonblocking);
                if (count === 1) {
                    if (options.nonblocking) {
                        nonblockEl(el, options);
                    } else {
                        blockEl(el, options);
                    }
                }
            };

            removeWait = function (el, options) {
                var count;
                options = options || {};

                // Decreases the element wait count and hides the wait if the count is at 0.
                count = getWaitCount(el, options.nonblocking);
                if (count > 0) {
                    count -= 1;

                    setWaitCount(el, count, options.nonblocking);
                    if (count === 0) {
                        if (options.nonblocking) {
                            unNonblockEl(el, options);
                        } else {
                            unblockEl(el, options);
                        }
                    }
                }
            };

            function clearAllWaits(el) {
                // Forcibly clears out the wait count for an element
                setWaitCount(el, 0);
                unblockEl(el);
                setWaitCount(el, 0, true);
                unNonblockEl(el);
            }

            if (isBlockUISupported()) {
                // Clear any blockUI defaults.  Specifying these in the block call itself just gets appended to the defaults
                // but is incapable of generically clearing them all.
                $.blockUI.defaults.css = {};
                $.blockUI.defaults.overlayCSS = {};
            }

            return {
                beginElWait: function (el, options) {
                    addWait(el, options);
                },
                beginPageWait: function (options) {
                    addWait(document.body, options);
                },
                clearElWait: function (el) {
                    clearAllWaits(el);
                },
                clearPageWait: function () {
                    clearAllWaits(document.body);
                },
                endElWait: function (el, options) {
                    removeWait(el, options);
                },
                endPageWait: function (options) {
                    removeWait(document.body, options);
                }
            };
        }])
        .directive('bbWait', ['bbWait', function (bbWait) {
            /// <summary>
            /// This directive provides an attribute that can be placed on elements indicating whether they should or shouldn't be blocked for waiting.
            /// </summary>
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    var firstScopeLoad = true;
                    scope.$watch(attrs.bbWait, function (value, oldValue) {
                        if (value && (!oldValue || firstScopeLoad)) {
                            bbWait.beginElWait(el);
                        } else if (oldValue && !value) {
                            bbWait.endElWait(el);
                        }
                        firstScopeLoad = false;
                    });
                }
            };
        }]);

}(jQuery));
