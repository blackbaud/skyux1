/*global angular */

(function () {
    'use strict';

    function DateRangePickerTestController(bbDateRangePicker) {
        var self = this;

        self.dateRangePickerValue = {
            dateRangeType: bbDateRangePicker.dateRangeTypes.TOMORROW
        };
        self.dateRangePickerOptions = {};

        self.specificRangePickerValue = {
            dateRangeType: bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE
        };

        self.specificRangePickerOptions = {};

        self.specificRangePickerOptions.availableDateRangeTypes = bbDateRangePicker.specificDateRangeOptions;
    }

    DateRangePickerTestController.$inject = ['bbDateRangePicker'];

    angular.module('screenshots', ['sky'])
    .controller('DateRangePickerTestController', DateRangePickerTestController);
}());
