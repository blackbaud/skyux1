/* global angular */
(function () {
    'use strict';

    function Controller(bbResources) {
        var self = this;

        function onInit() {
            if (angular.isUndefined(self.bbListbuilderAddLabel)) {
                self.bbListbuilderAddLabel = bbResources.listbuilder_add_title;
            }
        }

        self.$onInit = onInit;
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