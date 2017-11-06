/* global angular */
(function ($) {
    'use strict';

    angular.module('sky.splitpanel.list.panel.directive', [])
        .directive('bbSplitpanelListPanel', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.list.panel.directive.html',
                replace: true,
                transclude: true,
                controller: ['$window', function ($window) {
                    $($window).on('resize.splitPanelListPanel', function () {
                        $('.bb-splitpanel-workspace').width(($(".bb-splitpanel-container").width() - 20) - $(".bb-splitpanel-list").width());
                    });

                    $(".bb-splitpanel-list").resizable();

                    this.$onDestroy = function () {
                        $($window).off('resize.splitPanelListPanel', function () {
                        });
                    };

                }],
                scope: {
                    maxWidthInPercentage: '=?',
                    minWidthInPercentage: '=?',
                    defaultWidthInPercentage: '=?'
                }
            };
        });
}());