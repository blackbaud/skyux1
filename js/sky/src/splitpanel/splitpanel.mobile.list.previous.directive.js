/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.mobile.list.previous.directive', [])
        .directive('bbSplitpanelMobileListPrevious', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.mobile.list.previous.component.html',
                transclude: true,
                restrict: 'E',
                scope: {
                    bbSplitpanelListPreviousClick: '&?'
                }
            };
        });
})();