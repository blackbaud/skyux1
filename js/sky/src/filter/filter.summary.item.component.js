/* global angular */
(function () {
    'use strict';

    function Controller(bbModal) {
        var ctrl = this;

        function openFilterModal() {
            bbModal
                .open(ctrl.bbFilterButtonModalOpen)
                .result
                .then(function (result) {
                    ctrl.bbFilterButtonApply({filters: angular.copy(result)});
                });
        }

        ctrl.openFilterModal = openFilterModal;
    }

    angular.module('sky.filter.summary.component', [])
        .component('bbFilterSummaryItem', {
            templateUrl: 'sky/templates/filter/filter.summary.item.component.html',
            controller: Controller,
            bindings: {
                bbFilterSummaryItemOnClick: '&?',
                bbFilterSummaryItemOnDismiss: '&?',
                bbFilterSummaryItemIsDismissable: '<?'
            },
            transclude: true
        });
})();