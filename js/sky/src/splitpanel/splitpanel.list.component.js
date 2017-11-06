/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.list.directive', [])
        .component('bbSplitpanelList', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.list.component.html',
            transclude: true
        });
})();