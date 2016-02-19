/*global angular, alert */
(function () {
    'use strict';
    function ErrorTestController(bbErrorModal) {
        var vm = this;

        vm.errorTitle = 'Sorry, something went wrong.';
        vm.errorDescription = 'Try to refresh this page, or come back later.';

        vm.action = function () {
            alert('action clicked!');
        };

        vm.actionName = 'Refresh';

        vm.openModal = function () {
            bbErrorModal.open({
                errorTitle: vm.errorTitle,
                errorDescription: vm.errorDescription
            });
        };
    }

    ErrorTestController.$inject = ['bbErrorModal'];

    angular.module('stache')
        .controller('ErrorTestController', ErrorTestController);

}());
