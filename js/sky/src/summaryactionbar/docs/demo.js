/* global angular */

(function () {
    'use strict';

    function SummaryActionbarTestController() {
        var ctrl = this;

        function alertEmit(message) {
            alert(message);
        }

        ctrl.alertEmit = alertEmit;
    }

    angular.module('stache')
        .controller('SummaryActionbarTestController', SummaryActionbarTestController);

})();