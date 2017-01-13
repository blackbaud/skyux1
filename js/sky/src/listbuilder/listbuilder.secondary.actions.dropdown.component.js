/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function dropdownItemChanged(itemAdded) {
            ctrl.bbListbuilderSecondaryActionsItemChanged({itemAdded: itemAdded});
        }

        ctrl.dropdownItemChanged = dropdownItemChanged;
    }

    angular.module('sky.listbuilder.secondary.actions.dropdown.component', [])
        .component('bbListbuilderSecondaryActionsDropdown', {
            controller: Controller,
            transclude: true,
            bindings: {
                bbListbuilderSecondaryActionsItemChanged: '&',
                bbListbuilderSecondaryActionsCurrentView: '<'
            },
            templateUrl: 'sky/templates/listbuilder/listbuilder.secondary.actions.dropdown.component.html'
        });
})();