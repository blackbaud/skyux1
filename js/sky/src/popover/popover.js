/*global angular */

(function () {
    'use strict';

    function bbPopoverTemplate($compile) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, el) {

                //prevent breaking change by adding quotes around template url and
                //passing to new directive
                /*istanbul ignore else */
                if (!el.attr('bb-uib-popover-template')) {
                    el.attr('bb-uib-popover-template', "'" + el.attr('bb-popover-template') + "'");
                }

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

    function bbUibPopoverTemplatePopup() {
        return {
            restrict: 'A',
            scope: { uibTitle: '@', contentExp: '&', originScope: '&' },
            link: function ($scope) {

                var origScope = $scope.originScope();

                origScope.hide = function () {
                    console.log('in is open', $scope.$parent.$parent.isOpen);
                    $scope.$parent.$parent.isOpen = false;
                };
            },
            templateUrl: 'sky/templates/popover/popup.html'
        };
    }

    angular.module('sky.popover', ['ui.bootstrap.tooltip'])
        .directive('bbUibPopoverTemplatePopup', bbUibPopoverTemplatePopup)
        .directive('bbUibPopoverTemplate', bbUibPopoverTemplate)
        .directive('bbPopoverTemplate', bbPopoverTemplate);
}());
