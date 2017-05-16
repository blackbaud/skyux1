/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.mobile.list.next.directive', [])
        .directive('bbSplitpanelMobileListNext', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.mobile.list.next.component.html',
                transclude: true,
                restrict: 'E',
                scope: {
                    bbSplitpanelListNextClick: '&?'
                }
            };
        });
})();