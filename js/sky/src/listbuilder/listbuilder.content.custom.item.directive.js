/* global angular */
(function () {
    'use strict';

    function Controller($scope) {
        var ctrl = this;
        
        function listbuilderCustomItemToggled(selectedArgs) {
            ctrl.listbuilderCtrl.itemToggled(selectedArgs.isSelected, ctrl.geCustomItemId());
        }

        $scope.$on('bbListbuilderCustomItemInitialized', function (event, data) {
            data.customItemCtrl.bbCustomItemSelectionToggled = listbuilderCustomItemToggled;
            event.stopPropagation();
            event.preventDefault(); 
        });
    }

    function linkFn(scope, el, attr, ctrls) {
        var ctrl = ctrls[0],
            customCtrl = ctrls[1];
        customCtrl.addItem();

        ctrl.listbuilderCtrl = ctrls[2];

        function getCustomItemId() {
            return scope.$eval(attr.bbListbuilderContentCustomItemId);
        }

        ctrl.geCustomItemId = getCustomItemId;
    }

    Controller.$inject = ['$scope'];

    angular.module('sky.listbuilder.content.custom.item.directive', [])
        .directive('bbListbuilderContentCustomItem', function () {
            return {
                restrict: 'A',
                link: linkFn,
                require: ['bbListbuilderContentCustomItem', '^^bbListbuilderContentCustom', '^^bbListbuilder'],
                controller: Controller
            };
        });
})();