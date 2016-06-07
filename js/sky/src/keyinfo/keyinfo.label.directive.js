/*global angular,console */

(function () {
    'use strict';

    function bbKeyInfoLabel() {
        function Controller() {

        }

        function link(scope, el, attrs, vm) {
            
        }

        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'bbKeyInfoLabel',
            link: link,
            scope: {},
            templateUrl: 'sky/templates/keyinfo/keyinfo.label.directive.html',
            transclude: true
        };
    }

    angular.module('sky.keyinfo.label.directive', [])
        .directive('bbKeyInfoLabel', bbKeyInfoLabel);
}());