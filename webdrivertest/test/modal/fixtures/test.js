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
    }

    ModalTestController.$inject = ['bbModal'];
    angular.module('screenshots', ['sky'])
        .controller('ModalTestController', ModalTestController);
}());
