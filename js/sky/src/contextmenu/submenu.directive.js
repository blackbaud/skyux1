/* global angular */

(function () {
    'use strict';

    function getTemplateUrl(name) {
        return 'sky/templates/contextmenu/' + name + '.html';
    }

    function bbSubmenu(bbContextMenuToggleAccordion) {
        return {
            bindToController: {
                heading: '=?bbSubmenuHeading'
            },
            controller: 'BBSubmenuController',
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
            templateUrl: getTemplateUrl('submenu')
        };
    }

    bbSubmenu.$inject = ['bbContextMenuToggleAccordion'];

    angular.module(
        'sky.submenu.directive',
        [
            'sky.submenu.controller',
            'sky.submenu.heading.directive',
            'sky.contextmenu.toggleaccordion.factory',
            'ui.bootstrap.dropdown',
            'ui.bootstrap.accordion'
        ]
    )
        .directive('bbSubmenu', bbSubmenu);
}());
