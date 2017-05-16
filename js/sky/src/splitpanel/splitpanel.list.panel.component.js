/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.list.panel.component', [])
        .directive('bbSplitpanelListPanel', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.list.panel.component.html',
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