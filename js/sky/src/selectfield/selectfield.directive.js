/*global angular */

(function () {
    'use strict';

    function bbSelectField() {
        return {
            require: ['bbSelectField', 'ngModel'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldClick: '&',
                bbSelectFieldSelectedItems: '=',
                bbSelectFieldStyle: '@',
                bbSelectFieldText: '@'
            },
            controller: 'BBSelectFieldController',
            controllerAs: 'bbSelectField',
            scope: true,
            templateUrl: 'sky/templates/selectfield/selectfield.directive.html',
            transclude: true
        };
    }

    angular.module('sky.selectfield.directive', ['sky.format', 'sky.resources', 'sky.selectfield.controller'])
        .directive('bbSelectField', bbSelectField);
}());
