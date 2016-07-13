/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalHeader() {
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
    }

    angular.module(
        'sky.modal.header.directive', 
        [
            'sky.helpbutton', 
            'sky.modal', 
            'sky.resources', 
            'ui.bootstrap'
        ]
    )
        .directive('bbModalHeader', bbModalHeader);
}());
