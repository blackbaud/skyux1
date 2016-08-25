/* global angular*/
(function () {
    'use strict';

    function ModalFullTestController($window, bbModal) {
        var modalInstance;
        
        function navigateToModalDoc() {
            $window.location.href = '../modal/';
        }

        // This controller only exists to display the full-page form, so show it
        // as soon as it's created.
        modalInstance = bbModal.open(
            {
                animation: false,
                controller: 'ModalFullContentController as contentCtrl',
                templateUrl: 'demo/modal/modalformfull.html'
            }, 
            {
                fullPage: true
            }
        );

        // Logic to save the form data and navigate would go here.
        modalInstance.result.then(
            function (result) {
                if (!result || result.action !== 'showCode') {
                    navigateToModalDoc();
                }
            },
            function () {
                navigateToModalDoc();
            }
        );
    }

    ModalFullTestController.$inject = ['$window', 'bbModal'];

    function ModalFullContentController($uibModalInstance) {
        var vm = this;

        vm.textLabel = 'Sample text box';

        vm.save = function () {
            $uibModalInstance.close();
        }

        vm.showCode = function () {
            $uibModalInstance.close({
                action: 'showCode'
            });
        };
    }

    ModalFullContentController.$inject = ['$uibModalInstance'];

    angular.module('stache')
        .controller('ModalFullContentController', ModalFullContentController)
        .controller('ModalFullTestController', ModalFullTestController);
}());
