/* global angular */
(function () {
    'use strict';



    function Controller() {
        var ctrl = this;

    }

    angular.module('sky.listbuilder.toolbar.component', [])
        .component('bbListbuilderFooter', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.footer.component.html',
            bindings: {
                bbListbuilderOnLoadMore: '&?'
            },
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });
}());