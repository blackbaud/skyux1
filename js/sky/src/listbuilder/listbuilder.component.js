/* global angular */
(function () {
    'use strict';

    var listbuilderComponent = {
        templateUrl: 'sky/templates/listbuilder/listbuilder.component.html',
        transclude: {
            bbListbuilderToolbar: '?bbListbuilderToolbar',
            bbListbuilderContent: '?bbListbuilderContent'
        }
    };

    angular.module('sky.listbuilder.component', [])
        .component('bbListbuilder', listbuilderComponent);
}());