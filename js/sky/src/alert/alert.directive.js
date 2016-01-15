/*global angular */

(function () {
    'use strict';

    function bbAlert() {
        function Controller() {

        }

        function link(scope, el, attrs, vm) {
            vm.close = function () {

            };
        }

        return {
            restrict: 'E',
            controller: Controller,
            controllerAs: 'bbAlert',
            bindToController: {
                bbAlertType: '@',
                bbAlertCloseable: '@'
            },
            link: link,
            scope: {},
            templateUrl: 'sky/templates/alert/alert.html',
            transclude: true
        };
    }

    angular.module('sky.alert')
        .directive('bbAlert', bbAlert);
}());
