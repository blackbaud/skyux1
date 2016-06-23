/* global angular */
(function () {
    'use strict';

    var listbuilderFooterComponent = {
        templateUrl: 'sky/templates/listbuilder/listbuilder.footer.component.html',
        bindings: {
            bbListbuilderOnLoadMore: '&?'
        },
        controller: 'BBListbuilderFooterController',
        require: {
            listbuilderCtrl: '^bbListbuilder'
        }
    };

    angular.module('sky.listbuilder.toolbar.component', ['sky.listbuilder.footer.controller'])
        .component('bbListbuilderFooter', listbuilderFooterComponent);
}());