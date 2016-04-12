/* global angular */

(function () {
    'use strict';

    function bbContextMenu() {
        return {
            bindToController: true,
            controller: 'BBContextMenuController',
            controllerAs: 'bbContextMenu',
            replace: true,
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/contextmenu/contextmenu.html',
            link: function ($scope) {
                $scope.contextButtonStopPropagation = function ($event) {
                    $event.stopPropagation();
                };
            }
        };
    }

    angular.module('sky.contextmenu.directive', ['ui.bootstrap.dropdown', 'ui.bootstrap.accordion', 'sky.contextmenu.controller'])
        .directive('bbContextMenu', bbContextMenu);
}());
