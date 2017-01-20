/* global angular */
(function () {
    'use strict';

    angular.module('sky.summary.actionbar.primary.component', [])
        .component('bbSummaryActionbarPrimary', {
            transclude: true,
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.primary.component.html',
            bindings: {
                bbSummaryActionDisabled: '<?',
                bbSummaryActionClick: '&?'
            }
        });
})();