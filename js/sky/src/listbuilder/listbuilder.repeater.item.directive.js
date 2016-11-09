/* global angular */
(function () {
    'use strict';

    function linkFn($scope, el, attr, ctrls) {
        var vm = ctrls[0],
            repeaterCtrl = ctrls[1],
            listbuilderCtrl = ctrls[2];
        
        repeaterCtrl.addRepeaterItem();

        function listbuilderRepeaterItemToggled(isSelected) {
            listbuilderCtrl.itemToggled(isSelected, $scope.$eval(attr.bbListbuilderRepeaterItemId));
        }
        
        if (angular.isDefined(attr.bbListbuilderRepeaterItemId)) {
            vm.listbuilderRepeaterItemToggled = listbuilderRepeaterItemToggled;
        }
    }

    angular.module('sky.listbuilder.repeater.item.directive', [])
        .directive('bbListbuilderRepeaterItem', function () {
            return {
                restrict: 'A',
                link: linkFn,
                controller: angular.noop,
                require: ['bbListbuilderRepeaterItem', '^^bbListbuilderRepeater', '^^bbListbuilder']
            }; 
        });
}());