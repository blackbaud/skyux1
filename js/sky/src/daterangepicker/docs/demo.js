/*global angular */

(function () {
    'use strict';

    function DateRangePickerDemoController($scope, bbDateRangePicker) {
        var self = this;

        self.options = {};

        self.bbDateRangePicker = bbDateRangePicker;
        self.dateRangePickerValue = {
            dateRangeType: bbDateRangePicker.dateRangeTypes.TOMORROW
        };

        self.dateRangePickerOptions = {};

        self.selectToday = function () {
            self.dateRangePickerValue = {
                dateRangeType: bbDateRangePicker.dateRangeTypes.TODAY
            };
        };

        self.reset = function () {
            self.dateRangePickerValue = {};
        };

        $scope.$watch(function () {
            return self.options.pastOnly;
        }, function (newVal) {
            if (newVal === true) {
                self.dateRangePickerOptions.availableDateRangeTypes = bbDateRangePicker.pastDateRangeOptions;
            } else {
                self.dateRangePickerOptions.availableDateRangeTypes = bbDateRangePicker.defaultDateRangeOptions;
            }
        });
    }

    DateRangePickerDemoController.$inject = ['$scope', 'bbDateRangePicker'];

    function SpecificDateRangePickerDemoController($scope, bbDateRangePicker) {
        var self = this;

        self.options = {};

        self.bbDateRangePicker = bbDateRangePicker;
        self.dateRangePickerValue = {
            dateRangeType: bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE
        };

        self.dateRangePickerOptions = {};

        self.dateRangePickerOptions.availableDateRangeTypes = bbDateRangePicker.specificDateRangeOptions;

    }

    SpecificDateRangePickerDemoController.$inject = ['$scope', 'bbDateRangePicker'];

    angular.module('stache')
        .controller('DateRangePickerDemoController', DateRangePickerDemoController)
        .controller('SpecificDateRangePickerDemoController', SpecificDateRangePickerDemoController);
}());
