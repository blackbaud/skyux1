/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.container.component', [])
        .directive('bbSplitpanelContainer', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.container.component.html',
                transclude: true
            };
        });
}());