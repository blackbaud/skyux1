/* global angular */

(function () {
    'use strict';

    function SummaryActionbarTestController($uibModalInstance) {
        var ctrl = this;

        function close() {
            $uibModalInstance.close();
        }

        ctrl.close = close;

        function alertEmit(message) {
            alert(message);
        }

        ctrl.alertEmit = alertEmit;
    }

    function SummaryModalButtonController(bbModal) {
        var ctrl = this;
        
        ctrl.open = function (fullPage) {
            bbModal.open(
                {
                    controller: 'SummaryActionbarTestController as summaryCtrl',
                    templateUrl: 'demo/summaryactionbar/modalform.html'
                },
                {
                    fullPage: fullPage
                }
            );
        };
    }

    SummaryModalButtonController.$inject = ['bbModal'];
    SummaryActionbarTestController.$inject = ['$uibModalInstance'];

    angular.module('stache')
        .controller('SummaryModalButtonController', SummaryModalButtonController)
        .controller('SummaryActionbarTestController', SummaryActionbarTestController);

})();