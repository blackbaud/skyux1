/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.mobile.list.back.directive', [])
        .directive('bbSplitpanelMobileListBack', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.mobile.list.back.component.html',
                transclude: true,
                restrict: 'E',
                controller: ['$scope', function ($scope) {
                    $scope.back = function () {
                        var elem = angular.element('.bb-splitpanel-custom-content');
                        if (elem) {
                            elem.removeClass('bb-splitpanel-hidden');
                        }
                        //listbuilder toolbar
                        elem = angular.element('.bb-listbuilder-toolbar-container');
                        if (elem) {
                            elem.removeClass('bb-splitpanel-hidden');
                        }
                        elem = angular.element('.bb-splitPanel-pageHeader');
                        if (elem) {
                            elem.removeClass('bb-splitpanel-hidden');
                        }
                        elem = angular.element('.split-panel-workspace');
                        if (elem) {
                            elem.addClass('bb-splitpanel-hidden');
                        }

                        $scope.bbSplitpanelListBackClick();

                    };
                }],
                scope: {
                    bbSplitpanelListBackClick: '&?'
                }
            };
        });
})();