/* global angular */
(function () {
    'use strict';

    function linkFn(scope, el, attr, customCtrl) {
        customCtrl.addItem();
    }

    angular.module('sky.listbuilder.content.custom.item.directive', [])
        .directive('bbListbuilderContentCustomItem', function ($rootScope) {
            return {
                templateUrl: 'sky/templates/listbuilder/listbuilder.repeater.component.html',
                transclude: true,
                restrict: 'A',
                link: linkFn,
                require: '^^bbListbuilderContentCustom',
                controller: function ($scope) {
                    var ctrl = this;
                    $scope.selectItem = function (item) {
                        console.log("selectItem");
                        //$rootScope.$emit('handleBroadcast', item);
                        this.$parent.$parent.$parent.$ctrl.listbuilderContentCtrl.OnSelectedItem(item);
                    }
                }
            };
        });
})();