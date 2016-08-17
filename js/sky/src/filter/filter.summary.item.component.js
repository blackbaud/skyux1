/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function summaryItemInit() {
            if (angular.isUndefined(ctrl.bbFilterSummaryItemIsDismissable) && angular.isUndefined(ctrl.bbFilterSummaryItemIsDismissible)) {
                ctrl.bbFilterSummaryItemIsDismissible = true;
            }
        }

        function clearFilter($event) {
            $event.stopPropagation();
            if (angular.isFunction(ctrl.bbFilterSummaryItemOnDismiss)) {
                ctrl.bbFilterSummaryItemOnDismiss();
            }
            
        }

        ctrl.$onInit = summaryItemInit;

        ctrl.clearFilter = clearFilter;
    }

    angular.module('sky.filter.summary.item.component', [])
        .component('bbFilterSummaryItem', {
            templateUrl: 'sky/templates/filter/filter.summary.item.component.html',
            controller: Controller,
            bindings: {
                bbFilterSummaryItemOnClick: '&?',
                bbFilterSummaryItemOnDismiss: '&?',
                bbFilterSummaryItemIsDismissable: '<?',
                bbFilterSummaryItemIsDismissible: '<?'
            },
            transclude: true
        });
})();