/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function onInit() {
            ctrl.bbSummaryActionbarSecondaryActions.addSecondaryButton();
        }

        function onDestroy() {
            ctrl.bbSummaryActionbarSecondaryActions.removeSecondaryButton();
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;
    }

    angular.module('sky.summary.actionbar.secondary.component', [])
        .component('bbSummaryActionbarSecondary', {
            transclude: true,
            controller: Controller,
            require: {
                bbSummaryActionbarSecondaryActions: '^bbSummaryActionbarSecondaryActions'
            },
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.secondary.component.html'
        });
})();