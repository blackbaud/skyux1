/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.workspace.component', [])
        .component('bbSplitpanelWorkspace', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.workspace.component.html',
            replace: true,
            transclude: true
        });
}());