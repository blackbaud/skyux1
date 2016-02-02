/*global angular */

/** @module Select Field
 @icon question
 @summary Select field description.
 @description Select field description.

 */

(function () {
    'use strict';

    function BBSelectFieldController() {

    }

    function bbSelectField() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0];

            scope.$watch(attrs.ngModel, function (newValue) {
                vm.selectedItem = newValue;
            });
        }

        return {
            require: ['bbSelectField', 'ngModel'],
            restrict: 'E',
            bindToController: true,
            controller: BBSelectFieldController,
            controllerAs: 'bbSelectField',
            link: link,
            scope: {},
            templateUrl: 'sky/templates/selectfield/selectfield.directive.html'
        };
    }

    angular.module('sky.selectfield.directive', [])
        .directive('bbSelectField', bbSelectField);
}());
