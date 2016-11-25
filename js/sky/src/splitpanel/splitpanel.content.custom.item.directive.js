/* global angular */
(function () {
    'use strict';

    function linkFn(scope, el, attr, customCtrl) {
        customCtrl.addItem();
    }

    angular.module('sky.splitpanel.content.custom.item.directive', [])
        .directive('bbSplitpanelContentCustomItem', function () {
            return {
                templateUrl: 'sky/templates/splitpanel/splitpanel.content.item.component.html',
                transclude: true,
                restrict: 'A',
                link: linkFn,
                require: '^^bbSplitpanelContentCustom',
                controller: function ($scope) {
                    var ctrl = this;
                    $scope.selectItem = function (currentScope) {
                        currentScope.item.$index = currentScope.$index;
                        this.$parent.$parent.$parent.$ctrl.listbuilderContentCtrl.OnSelectedItem(currentScope.item);
                    }
                }
            };
        });
})();