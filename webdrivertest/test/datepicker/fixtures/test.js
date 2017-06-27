/*global angular */

(function () {
    'use strict';
    
    function DatepickerTestController(bbModal) {
        var self = this;
        
        self.date1 = '05/06/2015';
        
        self.date2 = '04/03/2015';

        self.open = function () {
            bbModal.open({
                controller: 'FirstModalController as firstModalCtrl',
                templateUrl: 'demo/datepicker/firstmodal.html'
            });
        };
    }

    function FirstModalController(bbModal) {
        var self = this;
        self.open = function () {
            bbModal.open({
                controller: 'SecondModalController as secondModalCtrl',
                templateUrl: 'demo/datepicker/secondmodal.html'
            });
        };
    }

    function SecondModalController() {
        var self = this;
        self.date = '06/19/2017';
    }

    DatepickerTestController.$inject = ['bbModal'];
    FirstModalController.$inject = ['bbModal'];
    
    angular.module('screenshots', ['sky'])
        .controller('DatepickerTestController', DatepickerTestController)
        .controller('FirstModalController', FirstModalController)
        .controller('SecondModalController', SecondModalController);
}());