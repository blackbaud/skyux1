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
        return {
            require: ['bbSelectField', 'ngModel'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldClick: '&',
                bbSelectFieldSelectedItems: '='
            },
            controller: BBSelectFieldController,
            controllerAs: 'bbSelectField',
            scope: {},
            templateUrl: 'sky/templates/selectfield/selectfield.directive.html'
        };
    }

    angular.module('sky.selectfield.directive', [])
        .directive('bbSelectField', bbSelectField);
}());
