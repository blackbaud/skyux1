/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.list.header.component', ['sky.card', 'sky.resources'])
        .component('bbSplitpanelListHeader', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.list.header.component.html',
            transclude: true
        });
}());
