/* global angular*/
(function () {
    'use strict';

    function ModalTestController(bbModal) {
        var self = this;
        self.open = function () {
            bbModal.open({
                controller: 'ModalContentController as contentCtrl',
                templateUrl: 'demo/modal/modalform.html'
            });
        };
    }

    function ModalContentController() {
        var self = this;

        self.color_id = '2';

        self.resources = {
            watermark_single: 'Search for a color'
        };

        self.colors = [
            { id: '1', name: 'Aqua' },
            { id: '2', name: 'Blue' },
            { id: '3', name: 'Brown' },
            { id: '4', name: 'Gold' },
            { id: '5', name: 'Gray' },
            { id: '6', name: 'Green' },
            { id: '7', name: 'Navy' },
            { id: '8', name: 'Pink' },
            { id: '9', name: 'Purple' },
            { id: '10', name: 'Silver' },
            { id: '11', name: 'White' },
            { id: '12', name: 'Yellow' }
        ];
    }

    ModalTestController.$inject = ['bbModal'];

    angular.module('stache')
    .controller('ModalContentController', ModalContentController)
    .controller('ModalTestController', ModalTestController);

}());
