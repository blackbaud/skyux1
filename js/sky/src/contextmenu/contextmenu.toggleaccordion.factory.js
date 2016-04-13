/*global angular */

(function () {
    'use strict';

    function bbContextMenuToggleAccordion() {
        return function ($event, vm) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.accordionOpen = !vm.accordionOpen;
        };
    }

    angular.module('sky.contextmenu.toggleaccordion.factory', [])
        .factory('bbContextMenuToggleAccordion', bbContextMenuToggleAccordion);

}());
