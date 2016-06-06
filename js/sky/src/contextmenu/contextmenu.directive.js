/* global angular */

(function () {
    'use strict';

    function bbContextMenu() {
        return {
            bindToController: {
                bbContextMenuLabel: '@'
            },
            controller: 'BBContextMenuController',
            controllerAs: 'bbContextMenu',
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/contextmenu/contextmenu.html'
        };
    }

    angular.module('sky.contextmenu.directive', ['ui.bootstrap.dropdown', 'ui.bootstrap.accordion', 'sky.contextmenu.controller'])
        .directive('bbContextMenu', bbContextMenu);
}());
