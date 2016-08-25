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

    function ModalFullContentController() {
        var vm = this;

        vm.textLabel = 'Sample text box';

    }

    ModalTestController.$inject = ['bbModal'];
    angular.module('screenshots', ['sky'])
        .controller('ModalTestController', ModalTestController)
        .controller('ModalFullContentController', ModalFullContentController);
}());
