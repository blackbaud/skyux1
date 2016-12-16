/* global angular */
(function () {
    'use strict';

    angular.module('sky.splitpanel.content.custom.item.directive', [])
        .directive('bbSplitpanelContentCustomItem', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.content.item.component.html',
                transclude: true,
                replace: true,
                restrict: 'A',
                controller: function ($scope) {
                    var ctrl = this;
                    $scope.selectItem = function () {
                        $scope.$parent.item.$index = $scope.$parent.$index;
                        $scope.bbListbuilderContentGetPanelData({ arg: $scope.$parent.item });
                    }
                },
                //require: '^bbSplitpanelContentCustom',
                scope: {
                    bbSplitpanelItemIsActive: '=?',
                    bbListbuilderContentGetPanelData: '&?'
                }
            };
        });
})();