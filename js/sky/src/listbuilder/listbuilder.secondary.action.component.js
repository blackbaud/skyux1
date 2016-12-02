/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function onInit() {
            ctrl.secondaryActionsCtrl.addSecondaryAction();
        }

        ctrl.$onInit = onInit;
    }

    angular.module('sky.listbuilder.secondary.action.component', [])
        .component('bbListbuilderSecondaryAction', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.secondary.action.component.html',
            transclude: true,
            controller: Controller,
            require: {
                secondaryActionsCtrl: '^bbListbuilderSecondaryActions'
            },
            bindings: {
                bbListbuilderSecondaryActionDisabled: '<?',
                bbListbuilderSecondaryActionClick: '&?'
            }
        });
})();