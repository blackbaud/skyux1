/*global angular */

(function () {
    'use strict';

    function bbContextMenuItem() {
        return {
            bindToController: {
                clickItem: '&bbContextMenuAction'
            },
            controller: angular.noop,
            controllerAs: 'bbContextMenuItem',
            restrict: 'E',
            transclude: true,
            scope: {},
            templateUrl: 'sky/templates/contextmenu/menuitem.html'
        };
    }

    angular.module('sky.contextmenu.item.directive', [])
        .directive('bbContextMenuItem', bbContextMenuItem);
}());
