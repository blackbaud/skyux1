/*jshint browser: true */
/*global angular, jQuery */

(function () {
    'use strict';

    angular.module('sky.modalheader.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalHeader', function () {
            return {
                controller: angular.noop,
                replace: true,
                transclude: true,
                require: '^bbModal',
                restrict: 'E',
                templateUrl: 'sky/templates/modal/modalheader.html',
                scope: {
                    bbModalHelpKey: '='
                }
            };
        });
}(jQuery));
