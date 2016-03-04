/*global angular */

(function () {
    'use strict';


    function bbTooltip($compile) {
        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, el) {
                //Add bootstrap directive
                /*istanbul ignore else */
                if (!el.attr('uib-tooltip-template')) {
                    el.attr('uib-tooltip-template', "'" + el.attr('bb-tooltip') + "'");
                }

                el.removeAttr('bb-tooltip');
                $compile(el)($scope);
            }
        };
    }

    bbTooltip.$inject = ['$compile'];

    angular.module('sky.tooltip', ['ui.bootstrap.tooltip'])
        .directive('bbTooltip', bbTooltip);

}());
