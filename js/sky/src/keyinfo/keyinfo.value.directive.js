/*global angular,console */

(function () {
    'use strict';

    function bbKeyInfoValue() {
        function Controller() {
           
        }

        function link(scope, el, attrs, vm) {

            
        }

        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'bbKeyInfoValue',
            link: link,
            scope: {},
            templateUrl: 'sky/templates/keyinfo/keyinfo.value.directive.html',
            transclude: true
        };
    }

    angular.module('sky.keyinfo.value.directive', [])
        .directive('bbKeyInfoValue', bbKeyInfoValue);
}());