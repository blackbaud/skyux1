/* global angular */
(function () {
    'use strict';

    function Controller($timeout, bbResources) {
        var ctrl = this;
    }

    Controller.$inject = ['$timeout', 'bbResources'];

    angular.module('sky.splitpanel.workspace.component', ['sky.card', 'sky.resources'])
        .component('bbSplitpanelWorkspace', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.workspace.component.html',
            transclude: true,
            replace:true,
            controller: Controller,
        });
}());