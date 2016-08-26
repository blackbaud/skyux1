/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalHeader() {
        function link(scope, el, attrs, bbModal) {
            bbModal.setHeaderEl(el);
        }

        return {
            controller: angular.noop,
            link: link,
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
