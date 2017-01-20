/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function onInit() {
            ctrl.dropdownCtrl.dropdownItemChanged(true);
        }

        function onDestroy() {
            ctrl.dropdownCtrl.dropdownItemChanged(false);
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;
    }

    angular.module('sky.listbuilder.secondary.action.component', [])
        .component('bbListbuilderSecondaryAction', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.secondary.action.component.html',
            transclude: true,
            controller: Controller,
            require: {
                dropdownCtrl: '^^bbListbuilderSecondaryActionsDropdown'
            },
            bindings: {
                bbListbuilderSecondaryActionDisabled: '<?',
                bbListbuilderSecondaryActionClick: '&?'
            }
        });
})();