/*global angular, jQuery */

/** @module Popover
@icon newspaper-o
@summary The popover component wraps the Angular UI Bootstrap popover directive to create an HTML-formatted popover that is displayed by a trigger element.
 @description The `bb-popover-template` directive enables an HTML-formatted popover to be displayed via a trigger element. This directive is an alternative to the `popover` directive from Angular UI Bootstrap, making it easier to define markup in a template rather than directly in the view's controller.

The `bb-popover-template` attribute should specify a URL for a template in the `$templateCache` that will be used as the popover content. The scope applied to this template inherits the current scope. A `hide` function is also
provided on the scope to dismiss the popover.

The directive is built as a thin wrapper of the [Angular UI Bootstrap Popover](http://angular-ui.github.io/bootstrap/) directive and supports all of it's optional properties.
 */

(function ($) {
    'use strict';

    angular.module('sky.popover', ['sky.data'])
        .directive('bbPopoverTemplatePopup', ['$templateCache', '$compile', '$timeout', '$window', function ($templateCache, $compile, $timeout, $window) {
            return {
                restrict: 'EA',
                replace: true,
                scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
                templateUrl: 'sky/templates/popover/popup.html',
                compile: function () {
                    return function ($scope, el) {
                        var compiledEl,
                            html = $templateCache.get($scope.content),
                            origScope,
                            popoverFlyoutScope,
                            popoverTriggerScope,
                            windowEl = $($window);

                        function removeTooltip() {
                            /*istanbul ignore else: sanity check */
                            if (el) {
                                el.remove();
                                el = null;
                            }
                            /*istanbul ignore else: sanity check */
                            if (popoverFlyoutScope) {
                                popoverFlyoutScope.$destroy();
                                popoverFlyoutScope = null;
                            }
                        }

                        function windowClickHandler(e) {
                            if (!el.is(e.target) && el.has(e.target).length === 0) {
                                $scope.$apply(function () {
                                    popoverFlyoutScope.hide();
                                });
                            }
                        }

                        //Get the scope of the popover directive.
                        popoverTriggerScope = $scope.$parent.$parent;

                        //Get the original scope that contains the popover directive
                        origScope = popoverTriggerScope.$parent;

                        //Create a new scope that will be bound to the template inside the flyout.  Base
                        //this scope on the original scope that contained the popover directive.
                        popoverFlyoutScope = origScope.$new();

                        popoverFlyoutScope.hide = function () {
                            $scope.$parent.$parent.isOpen = false;

                            //Borrowed from $tooltip, need to remove the item after the animation
                            $timeout(removeTooltip, 500);
                        };

                        $scope.$watch('isOpen()', function (value) {
                            if (value) {
                                $timeout(function () {
                                    windowEl.on('click', windowClickHandler);
                                });
                            } else {
                                windowEl.off('click', windowClickHandler);
                            }
                        });

                        compiledEl = $compile(html)(popoverFlyoutScope);
                        el.find('.popover-content').html(compiledEl);
                        popoverFlyoutScope.$apply();
                    };
                }
            };
        }])
        .directive('bbPopoverTemplate', ['$tooltip', function ($tooltip) {
            return $tooltip('bbPopoverTemplate', 'popover', 'click');
        }]);
}(jQuery));
