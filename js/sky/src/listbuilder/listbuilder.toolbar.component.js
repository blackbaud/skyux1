/* global angular */
(function () {
    'use strict';

    var listbuilderToolbarComponent = {
        templateUrl: 'sky/templates/listbuilder/listbuilder.toolbar.component.html',
        bindings: {
            bbListbuilderOnSearch: '&?',
            bbListbuilderSearchText: '<?'
        },
        controller: 'BBListbuilderToolbarController',
        require: {
            listbuilderCtrl: '^bbListbuilder'
        }
    };

    angular.module('sky.listbuilder.toolbar.component', ['sky.listbuilder.toolbar.controller'])
        .component('bbListbuilderToolbar', listbuilderToolbarComponent);
}());