/*global angular, alert */
(function () {
    'use strict';
    function ErrorTestController(bbErrorModal) {
        var vm = this;

        vm.errorHeader = 'Sorry, something went wrong.';
        vm.errorDescription = 'Try to refresh this page or come back later.';

        vm.action = function () {
            alert('action clicked!');
        };

        vm.actionName = 'Refresh';

        vm.showModal = function () {
            bbErrorModal.open({
                errorTitle: vm.errorHeader,
                errorDescription: vm.errorDescription
            });
        };
    }

    ErrorTestController.$inject = ['bbErrorModal'];

    angular.module('screenshots', ['sky'])
        .controller('ErrorTestController', ErrorTestController);

}());
