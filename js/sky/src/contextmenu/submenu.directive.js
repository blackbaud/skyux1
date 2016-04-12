/* global angular */

(function () {
    'use strict';

    function bbSubmenu(bbContextMenuToggleAccordion) {
        return {
            bindToController: {
                heading: '=?bbSubmenuHeading'
            },
            controller: angular.noop,
            controllerAs: 'bbSubmenu',
            restrict: 'E',
            scope: {},
            link: function (scope, el, attrs, vm) {
                vm.accordionOpen = false;
                vm.staticHeader = false;

                if (angular.isDefined(attrs.bbSubmenuHeading)) {
                    vm.staticHeader = true;
                }

                vm.toggleAccordion = function ($event) {
                    bbContextMenuToggleAccordion($event, vm);
                };
            },
            transclude: true,
            templateUrl: 'sky/templates/contextmenu/submenu.html'
        };
    }

    bbSubmenu.$inject = ['bbContextMenuToggleAccordion'];

    angular.module(
        'sky.submenu.directive',
        [
            'sky.submenu.heading.directive',
            'sky.contextmenu.toggleaccordion.factory',
            'ui.bootstrap.dropdown',
            'ui.bootstrap.accordion'
        ]
    )
        .directive('bbSubmenu', bbSubmenu);
}());
