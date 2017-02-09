/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.header.component', [])
        .component('bbSplitpanelHeader', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.header.component.html',
            transclude: true
        });
}());
