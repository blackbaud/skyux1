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
                        $('#workspace').width(($(".split-pattern-container").width() - 20) - $("#splitpanel_list").width());
                    });
                    $("#splitpanel_list").resizable();
                }],
                scope: {
                    maxWidthInPercentage: '=?',
                    minWidthInPercentage: '=?'
                }
            }
        });
}());