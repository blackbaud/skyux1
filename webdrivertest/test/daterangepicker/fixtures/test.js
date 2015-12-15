/*global angular */

(function () {
    'use strict';
    
    function DateRangePickerTestController(bbDateRangePicker) {
        var self = this;
        
        self.dateRangePickerValue = {
            dateRangeType: bbDateRangePicker.dateRangeTypes.TOMORROW
        };
        self.dateRangePickerOptions = {};
    }
    
    DateRangePickerTestController.$inject = ['bbDateRangePicker'];
    
    angular.module('screenshots', ['sky'])
    .controller('DateRangePickerTestController', DateRangePickerTestController);
}());