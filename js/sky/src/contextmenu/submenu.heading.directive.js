/* global angular */

(function () {
    'use strict';

    function bbSubmenuHeading() {
        return {
            bindToController: true,
            controller: angular.noop,
            controllerAs: 'bbSubmenuHeading',
            restrict: 'E',
            require: ['bbSubmenuHeading', '^bbSubmenu'],
            scope: true,
            link: function ($scope, el, attrs, ctrls) {
                var submenuCtrl = ctrls[1],
                    vm = ctrls[0];

                vm.submenuCtrl = submenuCtrl;

                vm.toggleAccordion = function ($event) {
                    submenuCtrl.toggleAccordion($event);
                };
            },
            transclude: true,
            templateUrl: 'sky/templates/contextmenu/submenuheading.html'
        };
    }

    angular.module('sky.submenu.heading.directive', [])
        .directive('bbSubmenuHeading', bbSubmenuHeading);
}());
