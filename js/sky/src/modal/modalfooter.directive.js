/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.modalfooter.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalFooter', function () {
            return {
                controller: angular.noop,
                replace: true,
                transclude: true,
                require: '^bbModal',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooter.html'
            };
        });
}());
