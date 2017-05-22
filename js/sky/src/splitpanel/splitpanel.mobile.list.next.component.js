/* global angular */
(function () {
    'use strict';
    angular.module('sky.splitpanel.mobile.list.next.component', [])
        .component('bbSplitpanelMobileListNext', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.mobile.list.next.component.html',
            transclude: true,
            bindings: {
                bbSplitpanelListNextClick: '&'
            }
        });
})();