/*global angular */

(function () {
    'use strict';

    function ModalTestController(bbModal) {
        var vm = this;

        vm.showModal = function () {
            bbModal.open({
                templateUrl: 'demo/modal/modalform.html'
            });
        };

        vm.showModalFull = function () {
            bbModal.open({
                controller: 'ModalFullContentController as contentCtrl',
                templateUrl: 'demo/modal/modalformfull.html'
            }, 
            {
                fullPage: true
            });
        };
    }

    function ModalFullContentController(bbModal) {
        var vm = this;

        vm.showSecondModal = function () {
            bbModal.open({
                controller: 'ModalSecondController as secondCtrl',
                templateUrl: 'demo/modal/modalformsecond.html'
            });
        };

        vm.textLabel = 'Sample text box';

    }

    function ModalSecondController() {
        var vm = this;
        vm.textLabel = 'Second controller';
    }

    ModalTestController.$inject = ['bbModal'];
    ModalFullContentController.$inject = ['bbModal'];
    angular.module('screenshots', ['sky'])
        .controller('ModalTestController', ModalTestController)
        .controller('ModalFullContentController', ModalFullContentController)
        .controller('ModalSecondController', ModalSecondController);
}());
