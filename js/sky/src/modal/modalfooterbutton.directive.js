/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.modalfooterbutton.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalFooterButton', function () {
            return {
                replace: true,
                transclude: true,
                require: '^bbModalFooter',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalfooterbutton.html'
            };
        });
}());
