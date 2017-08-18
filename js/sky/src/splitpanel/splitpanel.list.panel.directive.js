/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.list.panel.directive', [])
        .directive('bbSplitpanelListPanel', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.list.panel.directive.html',
                replace: true,
                transclude: true,
                controller: ['$window', function ($window) {
                    $($window).resize(function () {
                        $('.bb-splitpanel-workspace').width(($(".bb-splitpanel-container").width() - 20) - $(".bb-splitpanel-list").width());
                    });
                    $(".bb-splitpanel-list").resizable();
                }],
                scope: {
                    maxWidthInPercentage: '=?',
                    minWidthInPercentage: '=?',
                    defaultWidthInPercentage: '=?'
                }
            };
        });
}());