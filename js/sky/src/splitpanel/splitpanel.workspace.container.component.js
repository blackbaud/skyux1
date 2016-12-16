/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.workspace.container.component', ['sky.card', 'sky.resources'])
        .component('bbSplitpanelWorkspaceContainer', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.workspace.container.component.html',
            transclude: true
        });
}());
