/* global angular */
(function () {
    'use strict';

    function Controller($log) {
        var ctrl = this;

        function summaryItemInit() {
            if (angular.isDefined(ctrl.bbFilterSummaryItemIsDismissable)) {
                $log.warn('bb-filter-summary-item-is-dismissable is deprecated, use bb-filter-summary-item-is-dismissible instead.');
            }

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

    Controller.$inject = ['$log'];

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