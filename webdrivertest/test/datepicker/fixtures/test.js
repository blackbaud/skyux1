/*global angular */

(function () {
    'use strict';
    
    function DatepickerTestController() {
        var self = this;
        
        self.date1 = '05/06/2015';
        
        self.date2 = '04/03/2015';
    }
    
    angular.module('screenshots', ['sky'])
    .controller('DatepickerTestController', DatepickerTestController);
}());