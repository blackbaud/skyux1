/* global angular */
(function () {
    'use strict';

    function Controller($scope) {
        var ctrl = this;
        
        function listbuilderRepeaterItemToggled(selectedArgs) {
            ctrl.listbuilderCtrl.itemToggled(selectedArgs.isSelected, ctrl.getRepeaterItemId());
        }

        $scope.$on('bbRepeaterItemInitialized', function (event, data) {
            data.repeaterItemCtrl.bbRepeaterItemSelectionToggled = listbuilderRepeaterItemToggled;
            event.stopPropagation();
            event.preventDefault(); 
        });
    }

    Controller.$inject = ['$scope'];

    function linkFn($scope, el, attr, ctrls) {
        var ctrl = ctrls[0],
            repeaterCtrl = ctrls[1];

        ctrl.listbuilderCtrl = ctrls[2];

        function getRepeaterItemId() {
            return $scope.$eval(attr.bbListbuilderRepeaterItemId);
        }

        ctrl.getRepeaterItemId = getRepeaterItemId;
        
        repeaterCtrl.addRepeaterItem();
    }

    angular.module('sky.listbuilder.repeater.item.directive', [])
        .directive('bbListbuilderRepeaterItem', function () {
            return {
                restrict: 'A',
                link: linkFn,
                controller: Controller,
                require: ['bbListbuilderRepeaterItem', '^^bbListbuilderRepeater', '^^bbListbuilder']
            }; 
        });
}());