/* global angular */
(function () {
    'use strict';

    function Controller(bbResources) {
        var ctrl = this;

        function onInit() {
            if (angular.isUndefined(ctrl.bbListbuilderAddLabel)) {
                ctrl.bbListbuilderAddLabel = bbResources.listbuilder_add_title;
            }
        }

        ctrl.$onInit = onInit;
    }

    Controller.$inject = ['bbResources'];

    angular.module('sky.listbuilder.add.component', ['sky.resources'])
        .component('bbListbuilderAdd', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.add.component.html',
            controller: Controller,
            bindings: {
                bbListbuilderAddAction: '&?',
                bbListbuilderAddLabel: '<?'
            }
        });
}());