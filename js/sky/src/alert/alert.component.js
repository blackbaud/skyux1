/*global angular */

(function () {
    'use strict';

    function Controller() {
        var vm = this;
        vm.close = function () {
            vm.bbAlertClosed = true;
        };
    }   
    
    angular.module('sky.alert.component', ['sky.resources'])
        .component('bbAlert', {
            bindings: {
                bbAlertType: '@',
                bbAlertCloseable: '@',
                bbAlertClosed: '=?'
            },
            templateUrl: 'sky/templates/alert/alert.html',
            transclude: true,
            controller: Controller
        });
}());
