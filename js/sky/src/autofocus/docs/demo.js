/*global angular */

(function () {
    'use strict';

    function AutoFocusTestController(bbModal) {
        var self = this;

        self.open = function () {
            bbModal.open({
                templateUrl: 'demo/autofocus/autofocusform.html'
            });
        };
    }

    AutoFocusTestController.$inject = ['bbModal'];

    angular.module('stache').controller('AutoFocusTestController', AutoFocusTestController);
}());
