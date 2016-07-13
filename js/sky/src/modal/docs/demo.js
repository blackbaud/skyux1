/* global angular*/
(function () {
    'use strict';

    function ModalTestController(bbModal) {
        var self = this;
        self.open = function (fullscreen) {
            bbModal.open({
                controller: 'ModalContentController as contentCtrl',
                templateUrl: 'demo/modal/modalform.html'
            }, fullscreen);
        };
    }

    function ModalContentController() {
        var vm = this;

        vm.textLabel = 'Sample text box';
    }

    ModalTestController.$inject = ['bbModal'];

    angular.module('stache')
    .controller('ModalContentController', ModalContentController)
    .controller('ModalTestController', ModalTestController);

}());
