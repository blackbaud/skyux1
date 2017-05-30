/*global angular */

(function () {
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
        var tooltip = $uibTooltip('bbUibPopoverTemplate', 'popover', 'outsideClick', {
            useContentExp: true
        });

        return tooltip;
    }

    bbUibPopoverTemplate.$inject = ['$uibTooltip'];

    function bbUibPopoverTemplatePopup($parse) {
        return {
            restrict: 'A',
            scope: { uibTitle: '@', contentExp: '&', originScope: '&' },
            link: function ($scope) {

                var origScope = $scope.originScope(),
                    popoverIsOpenAttr;

                popoverIsOpenAttr = origScope.bbPopoverAttr;
                origScope.hide = function () {
                    /* Set the popover is open attribute this way to account for
                       both variables directly on scope as well as using 'controller
                       as'
                    */
                    /* istanbul ignore else */
                    /* sanity check */
                    if (angular.isDefined(origScope.$eval(popoverIsOpenAttr))) {
                        $parse(popoverIsOpenAttr).assign(origScope, false);
                    }

                };
            },
            templateUrl: 'sky/templates/popover/popup.html'
        };
    }

    bbUibPopoverTemplatePopup.$inject = ['$parse'];

    angular.module('sky.popover', ['ui.bootstrap.tooltip'])
        .directive('bbUibPopoverTemplatePopup', bbUibPopoverTemplatePopup)
        .directive('bbUibPopoverTemplate', bbUibPopoverTemplate)
        .directive('bbPopoverTemplate', bbPopoverTemplate);
}());
