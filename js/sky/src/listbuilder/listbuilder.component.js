/* global angular */
(function () {
    'use strict';

    var listbuilderComponent = {
        templateUrl: 'sky/templates/listbuilder/listbuilder.component.html',
        transclude: {
            bbListbuilderToolbar: '?bbListbuilderToolbar',
            bbListbuilderContent: '?bbListbuilderContent'
        },
        controller: 'BBListbuilderController'
    };

    angular.module('sky.listbuilder.component', ['sky.listbuilder.controller', 'sky.card'])
        .component('bbListbuilder', listbuilderComponent);
}());