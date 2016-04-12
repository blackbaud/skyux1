/*global angular */

(function () {
    'use strict';

    function bbContextMenuButton() {
        return {
            bindToController: true,
            controller: angular.noop,
            controllerAs: 'bbContextMenuButton',
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'sky/templates/contextmenu/menubutton.html'
        };
    }

    angular.module('sky.contextmenu.button.directive', [])
        .directive('bbContextMenuButton', bbContextMenuButton);
}());
