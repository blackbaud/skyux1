/*global angular, jQuery */

(function ($) {
    'use strict';

    function bbPopoverTemplate($compile) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, el) {
                var bbPopoverOpenAttr = 'bbPopoverOpen' + $scope.$id;

                //prevent breaking change by adding quotes around template url and
                //passing to new directive
                /*istanbul ignore else */
                if (!el.attr('bb-uib-popover-template')) {
                    el.attr('bb-uib-popover-template', "'" + el.attr('bb-popover-template') + "'");
                }

                if (!el.attr('popover-is-open')) {
                    el.attr('popover-is-open', bbPopoverOpenAttr);
                }

                $scope.bbPopoverAttr = el.attr('popover-is-open');


                el.removeAttr('bb-popover-template');
                $compile(el)($scope);
            }
        };
    }

    bbPopoverTemplate.$inject = ['$compile'];

    function bbUibPopoverTemplate($uibTooltip) {
        var tooltip = $uibTooltip('bbUibPopoverTemplate', 'popover', 'click', {
            useContentExp: true
        });

        return tooltip;
    }

    bbUibPopoverTemplate.$inject = ['$uibTooltip'];

    function bbUibPopoverTemplatePopup($window, $parse) {
        return {
            replace: true,
            scope: { title: '@', contentExp: '&', placement: '@', popupClass: '@', animation: '&', isOpen: '&', originScope: '&' },
            link: function ($scope, el) {

                var origScope = $scope.originScope(),
                    popoverIsOpenAttr,
                    windowEl = $($window),
                    scopeId = $scope.$id;

                popoverIsOpenAttr = origScope.bbPopoverAttr;

                function closePopover() {

                    /* Set the popover is open attribute this way to account for
                       both variables directly on scope as well as using 'controller
                       as'
                    */
                    /* istanbul ignore else: sanity check */
                    if (angular.isDefined(origScope.$eval(popoverIsOpenAttr))) {
                        $parse(popoverIsOpenAttr).assign(origScope, false);
                    }
                }

                origScope.hide = function () {
                    closePopover();
                };

                $scope.$watch('isOpen()', function (value) {
                    if (value) {
                        windowEl.on('click.popover' + scopeId, function (event) {
                            if (!el.is(event.target) && el.has(event.target).length === 0 && $scope.isOpen) {
                                $scope.$apply(function () {
                                    closePopover();
                                });
                            }
                        });
                    }

                });


                $scope.$on('$destroy', function () {
                    windowEl.off('click.popover' + scopeId);
                });
            },
            templateUrl: 'sky/templates/popover/popup.html'
        };
    }
    bbUibPopoverTemplatePopup.$inject = ['$window', '$parse'];

    angular.module('sky.popover', ['ui.bootstrap.tooltip'])
        .directive('bbUibPopoverTemplatePopup', bbUibPopoverTemplatePopup)
        .directive('bbUibPopoverTemplate', bbUibPopoverTemplate)
        .directive('bbPopoverTemplate', bbPopoverTemplate);
}(jQuery));
