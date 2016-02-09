/*global angular, alert */
(function () {
    'use strict';
    function ErrorTestController() {
        var vm = this;
        vm.errorHeader = 'Sorry, something went wrong.';
        vm.errorDescription = 'Try to refresh this page or come back later.';
        vm.action = function () {
            alert('action clicked!');
        };
        vm.actionName = 'Refresh';
    }

    angular.module('stache')
        .controller('ErrorTestController', ErrorTestController);

}());
