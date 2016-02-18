/*global angular */

(function () {
    'use strict';

    function DateRangePickerDemoController($scope, bbDateRangePicker) {
        var self = this,
            pastDateRangeOptions,
            defaultDateRangeOptions;


        self.options = {};

        self.bbDateRangePicker = bbDateRangePicker;

        pastDateRangeOptions = bbDateRangePicker.getDateRangeOptions(
            {
                includePast: true
            });

        defaultDateRangeOptions = bbDateRangePicker.getDateRangeOptions(
            {
                includeDefault: true
            });


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
                self.dateRangePickerOptions.availableDateRangeTypes = pastDateRangeOptions;
            } else {
                self.dateRangePickerOptions.availableDateRangeTypes = defaultDateRangeOptions;
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

        self.dateRangePickerOptions.availableDateRangeTypes = bbDateRangePicker.getDateRangeOptions(
            {
                includeDefault: true,
                includeSpecific: true
            });

    }

    SpecificDateRangePickerDemoController.$inject = ['$scope', 'bbDateRangePicker'];

    function CustomDateRangePickerDemoController($scope, bbDateRangePicker) {
        var self = this,
            availableTypes,
            everyFourYearsType = 1001;

        self.options = {};

        self.bbDateRangePicker = bbDateRangePicker;
        self.dateRangePickerValue = {
            dateRangeType: everyFourYearsType
        };

        availableTypes = bbDateRangePicker.getDateRangeOptions(
            {
                includeDefault: true
            });

        availableTypes.push(everyFourYearsType);

        function getDateRangeTypeInfo(dateRangeType) {
            if (dateRangeType === everyFourYearsType) {
                return {
                    caption: 'Every four years',
                    description: '{0} for every four years'
                };
            }
        }

        self.dateRangePickerOptions = {
            availableDateRangeTypes: availableTypes,
            getDateRangeTypeInfo: getDateRangeTypeInfo
        };

    }

    CustomDateRangePickerDemoController.$inject = ['$scope', 'bbDateRangePicker'];

    angular.module('stache')
        .controller('DateRangePickerDemoController', DateRangePickerDemoController)
        .controller('SpecificDateRangePickerDemoController', SpecificDateRangePickerDemoController)
        .controller('CustomDateRangePickerDemoController', CustomDateRangePickerDemoController);
}());
