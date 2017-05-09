/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.component', [])
        .component('bbSplitpanel', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.component.html',
            transclude: true
        });
}());
