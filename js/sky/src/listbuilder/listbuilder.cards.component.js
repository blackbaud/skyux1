/* global angular */
(function () {
    'use strict';

    angular.module('sky.listbuilder.cards.component', [])
        .component('bbListbuilderCards', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.cards.component.html',
            transclude: true

        });
}());