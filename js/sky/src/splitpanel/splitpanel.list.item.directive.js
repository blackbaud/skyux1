/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.list.item.directive', [])
        .directive('bbSplitpanelListItem', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.list.item.component.html',
                transclude: true,
                replace: true,
                restrict: 'A',
                controller: ['$scope', function ($scope) {
                    $scope.selectItem = function () {
                        var elem = angular.element('.bb-custom-content');
                        if (!$scope.bbSplitpanelItemIsActive) {
                            $scope.$parent.item.$index = $scope.$parent.$index;
                            $scope.bbListbuilderContentGetPanelData({ arg: $scope.$parent.item });
                        }

                        elem.addClass('bb-splitpanel-hidden');

                        elem = angular.element('.bb-listbuilder-toolbar-container');
                        elem.addClass('bb-splitpanel-hidden');

                        elem = angular.element('.bb-splitPanel-pageHeader');
                        elem.addClass('bb-splitpanel-hidden');

                        elem = angular.element('.split-panel-workspace');
                        elem.removeClass('bb-splitpanel-hidden');

                    };
                }],
                scope: {
                    bbSplitpanelItemIsActive: '=?',
                    bbListbuilderContentGetPanelData: '&?'
                }
            };
        });
})();