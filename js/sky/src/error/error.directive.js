/*global angular */
(function () {
    'use strict';
    function bbError() {

        return {
            restrict: 'E',
            templateUrl: 'sky/templates/error/error.directive.html',
            scope: {},
            controllerAs: 'bbError',
            controller: angular.noop,
            bindToController: {
                bbErrorSrc: '=',
                bbErrorHeader: '=',
                bbErrorDescription: '=',
                bbErrorAction: '&',
                bbErrorActionName: '='
            }
        };
    }

    angular.module('sky.error.directive', [])
        .directive('bbError', bbError);
}());
