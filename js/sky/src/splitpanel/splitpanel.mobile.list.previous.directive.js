/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.mobile.list.previous.component', [])
        .component('bbSplitpanelMobileListPrevious', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.mobile.list.previous.component.html',
            transclude: true,
            bindings: {
                bbSplitpanelListPreviousClick: '&?'
            }
        });
})();