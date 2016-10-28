/* global angular */

(function () {
    'use strict';

    function SummaryActionbarTestController() {
        var ctrl = this;

        function alertEmit(message) {
            alert(message);
        }

        ctrl.alertEmit = alertEmit;
    }

    function SummaryModalButtonController(bbModal) {
        var ctrl = this;
        
        ctrl.open = function () {
            bbModal.open(
                {
                    controller: 'SummaryActionbarTestController as summaryCtrl',
                    templateUrl: 'demo/summaryactionbar/modalform.html'
                },
                {
                    fullPage: false
                }
            );
        };
    }

    SummaryModalButtonController.$inject = ['bbModal'];

    angular.module('stache')
        .controller('SummaryModalButtonController', SummaryModalButtonController)
        .controller('SummaryActionbarTestController', SummaryActionbarTestController);

})();