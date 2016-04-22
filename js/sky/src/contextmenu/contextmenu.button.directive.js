/*global angular */

(function () {
    'use strict';

    function bbContextMenuButton() {
        function link(scope, el, attrs, ctrls) {
            var bbContextMenu = ctrls[1],
                vm = ctrls[0];

            vm.bbContextMenu = bbContextMenu;
        }

        return {
            bindToController: {
                bbContextMenuButtonLabel: '@'
            },
            controller: 'BBContextMenuButtonController',
            controllerAs: 'bbContextMenuButton',
            link: link,
            restrict: 'E',
            replace: true,
            require: ['bbContextMenuButton', '?^bbContextMenu'],
            scope: {},
            templateUrl: 'sky/templates/contextmenu/menubutton.html'
        };
    }

    angular.module(
        'sky.contextmenu.button.directive',
        [
            'sky.contextmenu.button.controller',
            'sky.resources'
        ]
    )
        .directive('bbContextMenuButton', bbContextMenuButton);
}());
