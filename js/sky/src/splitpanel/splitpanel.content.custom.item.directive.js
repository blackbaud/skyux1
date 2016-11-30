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
                require: '^^bbSplitpanelContentCustom',
                controller: function ($scope) {
                    var ctrl = this;
                    $scope.selectItem = function () {
                        $scope.item.$index = $scope.$index;
                        $scope.$parent.$parent.$parent.$ctrl.listbuilderContentCtrl.OnSelectedItem($scope.item);
                    }
                }
            };
        });
})();