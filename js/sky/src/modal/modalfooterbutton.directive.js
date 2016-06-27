/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    angular.module('sky.modalfooterbutton.component', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .component('bbModalFooterButton', {
            transclude: true,
            require: {
                bbModalFooter: '^bbModalFooter'
            },
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooterbutton.html'
        });
}());
