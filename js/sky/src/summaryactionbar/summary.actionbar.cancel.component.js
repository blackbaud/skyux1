/* global angular */
(function () {
    'use strict';

    angular.module('sky.summary.actionbar.cancel.component', [])
        .component('bbSummaryActionbarCancel', {
            transclude: true,
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.cancel.component.html',
            bindings: {
                bbSummaryActionDisabled: '<?'
            }
        });
})();