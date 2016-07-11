/* global angular */
(function () {
    'use strict';

    angular.module('sky.listbuilder.add.component', [])
        .component('bbListbuilderAdd', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.add.component.html',
            bindings: {
                bbListbuilderAddAction: '&?'
            }
        });
}());