/*global angular */

(function () {
    'use strict';

    function BBSelectFieldController() {
        var vm = this;

        vm.setPicker = function (picker) {
            vm.picker = picker;
        };

        vm.selectFieldClick = function () {
            if (vm.picker) {
                vm.picker.open();
            }
        };
    }

    function bbSelectField() {
        return {
            require: ['bbSelectField', 'ngModel'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldClick: '&',
                bbSelectFieldSelectedItems: '='
            },
            controller: BBSelectFieldController,
            controllerAs: 'bbSelectField',
            scope: true,
            templateUrl: 'sky/templates/selectfield/selectfield.directive.html',
            transclude: true
        };
    }

    angular.module('sky.selectfield.directive', [])
        .directive('bbSelectField', bbSelectField);
}());
