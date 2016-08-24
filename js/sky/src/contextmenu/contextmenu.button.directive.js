/*global angular */

(function () {
    'use strict';

    function buttonTemplate(elem, attrs) {
        var templateEl = angular.element('<button type="button" class="btn bb-btn-secondary bb-context-menu-btn" aria-label="{{bbContextMenuButton.getAriaLabel()}}">' +
                                            '<i class="fa fa-ellipsis-h"></i>' +
                                            '</button>');

        if (angular.isDefined(attrs.bbContextMenuButtonDropdownToggle)) {
            templateEl.attr('uib-dropdown-toggle', 'true');
        }

        return templateEl;
    }

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
            require: ['bbContextMenuButton', '?^bbContextMenu'],
            scope: {},
            template: buttonTemplate
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
