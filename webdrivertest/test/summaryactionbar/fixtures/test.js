/* global angular */

(function () {
    'use strict';

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

    angular.module('screenshots', ['sky'])
        .controller('SummaryModalButtonController', SummaryModalButtonController)
        .controller('SummaryActionbarTestController', angular.noop);

})();