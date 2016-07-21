/*global angular */

(function () {
    'use strict';

    function AlertTestController() {
        var vm = this;

        vm.alertType = 'warning';

        vm.openAlert = function () {
            vm.alertClosed = false;
            return false;
        };
    }

    angular.module('stache')
        .controller('AlertTestController', AlertTestController);
}());