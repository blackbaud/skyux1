/* global angular */
(function () {
    'use strict';

    function Controller($scope) {
        var ctrl = this;

        function onInit() {
            ctrl.secondaryMenuId = 'bb-listbuilder-secondary-actions-' + $scope.$id;
        }

        ctrl.$onInit = onInit;

    }

    Controller.$inject = ['$scope'];

    angular.module('sky.listbuilder.secondary.actions.component', 
        [
            'ui.bootstrap.dropdown', 
            'sky.resources', 
            'sky.listbuilder.secondary.action.component'
        ])
        .component('bbListbuilderSecondaryActions', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.secondary.actions.component.html',
            controller: Controller,
            transclude: true,
            bindings: {
                bbListbuilderSecondaryActionsAppendToBody: '<?'
            }
        });
})();