/* global angular */

(function () {
    'use strict';

    function BBSubmenuController(bbContextMenuToggleAccordion) {
        var vm = this;

        vm.toggleAccordion = function ($event) {
            bbContextMenuToggleAccordion($event, vm);
        };
    }

    BBSubmenuController.$inject = ['bbContextMenuToggleAccordion'];

    angular.module('sky.submenu.controller', ['sky.contextmenu.toggleaccordion.factory'])
        .controller('BBSubmenuController', BBSubmenuController);
}());
