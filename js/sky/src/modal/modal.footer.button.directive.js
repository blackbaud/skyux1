/*jshint browser: true */
/*global angular */

(function () {
    'use strict';

    function bbModalFooterButton() {
        return {
            replace: true,
            transclude: true,
            require: '^bbModalFooter',
            restrict: 'E',
            templateUrl: 'sky/templates/modal/modalfooterbutton.html'
        };
    }

    angular.module('sky.modal.footer.button.directive', ['sky.helpbutton', 'sky.resources', 'ui.bootstrap'])
        .directive('bbModalFooterButton', bbModalFooterButton);
}());
