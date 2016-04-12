/* global angular */

(function () {
    'use strict';

    function BBContextMenuController() {
        var vm = this;

        vm.contextButtonStopPropagation = function ($event) {
            $event.stopPropagation();
        };

        vm.getAriaLabel = function () {
            return vm.bbContextMenuLabel;
        };
    }

    angular.module('sky.contextmenu.controller', [])
        .controller('BBContextMenuController', BBContextMenuController);
}());
