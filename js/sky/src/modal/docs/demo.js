/* global angular*/
(function () {
    'use strict';

    function ModalTestController(bbModal) {
        var self = this;
        
        self.open = function (fullPage) {
            var modalInstance = bbModal.open(
                {
                    controller: 'ModalContentController as contentCtrl',
                    templateUrl: 'demo/modal/modalform.html'
                }, 
                {
                    fullPage: fullPage
                }
            );

            modalInstance.result.then(
                function (result) {
                    console.log('saved with data:', result);
                },
                function (result) {
                    console.log('dismissed with data:', result);
                });
        };
    }

    function ModalContentController($uibModalInstance) {
        var vm = this;

        function saveModal() {
            $uibModalInstance.close('saved data');
        }

        vm.textLabel = 'Sample text box';
        vm.saveModal = saveModal;
    }

    ModalContentController.$inject = ['$uibModalInstance'];

    ModalTestController.$inject = ['bbModal'];

    angular.module('stache')
    .controller('ModalContentController', ModalContentController)
    .controller('ModalTestController', ModalTestController);

}());
