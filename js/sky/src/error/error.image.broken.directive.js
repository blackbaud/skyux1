/* global angular */
(function () {
    'use strict';

    function bbErrorImageBroken() {
        return {
            templateUrl: 'sky/templates/error/error.image.broken.directive.html',
            restrict: 'E'
        };
    }

    angular.module('sky.error.image.broken.directive', [])
        .directive('bbErrorImageBroken', bbErrorImageBroken);
}());
