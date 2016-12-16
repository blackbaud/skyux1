/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.workspace.fixedHeader.component', ['sky.card', 'sky.resources'])
        .component('bbSplitpanelWorkspaceFixedHeader', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.workspace.fixedHeader.component.html',
            transclude: true
        });
}());
