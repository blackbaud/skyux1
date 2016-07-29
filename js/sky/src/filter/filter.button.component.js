/* global angular */
(function () {
    'use strict';

    function Controller(bbModal) {
        var ctrl = this;

        function openFilterModal() {
            bbModal
                .open(ctrl.bbListbuilderFilterModalOpen)
                .result
                .then(function (result) {
                    ctrl.bbListbuilderFilterApply({filters: angular.copy(result)});
                });
        }

        ctrl.openFilterModal = openFilterModal;
    }

    Controller.$inject = ['bbModal'];

    angular.module('sky.listbuilder.filter.component', ['sky.modal', 'sky.resources'])
        .component('bbFilterButton', {
            templateUrl: 'sky/templates/filter/filter.button.component.html',
            controller: Controller,
            bindings: {
                bbFilterButtonModalOpen: '<',
                bbFilterButtonApply: '&',
                bbFilterButtonIsApplied: '<?'
            }
        });
}());