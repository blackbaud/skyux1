/* global angular */
(function () {
    'use strict';

    function linkFn(scope, el, attr, customCtrl) {
        customCtrl.addItem();
    }

    angular.module('sky.listbuilder.content.custom.item.directive', [])
        .directive('bbListbuilderContentCustomItem', function () {
            return {
                templateUrl: 'sky/templates/listbuilder/listbuilder.repeater.component.html',
                transclude: true,
                restrict: 'A',
                replace: true,
                link: linkFn,
                require: '^^bbListbuilderContentCustom',
                //scope: {
                //    onSelectItem: '&'
                //},
                controller: function ($scope) {
                    var ctrl = this;
                    $scope.selectItem = function (item) {
                        console.log("selectItem");
                        //$scope.onSelectItem(item);
                        //ctrl.bbListbuilderContentGetPanelData(ctrl.$parent.item);
                    }




                }
                //,
                //bindings: {
                //    bbListbuilderContentGetPanelData: '&?'
                //}
            };
        });
})();