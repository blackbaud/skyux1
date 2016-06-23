/*jshint browser: true */
/*global angular, jQuery */

(function () {
    'use strict';

    angular.module('sky.modalheader.component', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .component('bbModalHeader', {
            controller: angular.noop,
            transclude: true,
            require: {
                bbModal: '^bbModal'
            },
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalheader.html',
            bindings: {
                bbModalHelpKey: '='
            }
        });
}(jQuery));
