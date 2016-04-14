/*global angular */

(function () {
    'use strict';

    function BBContextMenuButtonController(bbResources) {
        var vm = this;

        vm.getAriaLabel = function () {
            var ariaLabel;

            if (vm.bbContextMenu) {
                ariaLabel = vm.bbContextMenu.getAriaLabel();
            }

            if (!ariaLabel) {
                ariaLabel = vm.bbContextMenuButtonLabel || bbResources.context_menu_default_label;
            }

            return ariaLabel;
        };
    }

    BBContextMenuButtonController.$inject = ['bbResources'];

    angular.module('sky.contextmenu.button.controller', ['sky.resources'])
        .controller('BBContextMenuButtonController', BBContextMenuButtonController);
}());
