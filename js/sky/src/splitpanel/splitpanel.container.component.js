/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.container.component', [])
        .component('bbSplitpanelContainer', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.container.component.html',
            transclude: true
        });
}());