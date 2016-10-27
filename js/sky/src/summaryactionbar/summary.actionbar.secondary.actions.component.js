/* global angular */
(function () {
    'use strict';

    function Controller(bbMediaBreakpoints, $scope) {
        var ctrl = this;

        function addSecondaryButton() {
            ctrl.secondaryButtonCount++;
        }

        function removeSecondaryButton() {
            ctrl.secondaryButtonCount--;
        }

        function breakpointChanged(breakpoint) {
            ctrl.isXsScreen = breakpoint && breakpoint.xs;
        }

        function onInit() {
            ctrl.secondaryButtonCount = 0;
            ctrl.menuId = 'bb-summary-actionbar-secondary-' + $scope.$id;
            bbMediaBreakpoints.register(breakpointChanged);
            
        }

        function onDestroy() {
            bbMediaBreakpoints.unregister(breakpointChanged);
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.addSecondaryButton = addSecondaryButton;
        ctrl.removeSecondaryButton = removeSecondaryButton;
    }

    Controller.$inject = ['bbMediaBreakpoints', '$scope'];

    angular.module('sky.summary.actionbar.secondary.actions.component', ['ui.bootstrap.dropdown', 'sky.mediabreakpoints'])
        .component('bbSummaryActionbarSecondaryActions', {
            transclude: true,
            controller: Controller,
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.secondary.actions.component.html'
        });
})();