/*jshint browser: true */
/*global angular */

/** @module Date Range Picker
@icon calendar
@summary The date-range picker creates an input text box with a dropdown to select date ranges from a set of well-known options.
 @description The date-range picker directive creates an input text box where users can select date ranges from a set of well-known options. The directive works hand-in-hand with a date-range picker service to provide more service-oriented functionality.

### Date-range Picker Settings ###

 - `bb-date-range-picker-value` &mdash; Specifies an object that tracks the value of the date-range picker control. The `.dateRangeType` property provides the integer (ENUM) value of the date-range type selected in the picker. For details about the ENUM, see the Date-range Picker Service section below.
 - `bb-date-range-picker-automation-id` &mdash; Specifies a string to use when creating the `bb-auto-field` attribute on elements in the date-range picker.
 - `bb-date-range-picker-options` &mdash; *(Optional.)* Specifies an options object that can customize the behavior of the date-range picker.

### Date-range Picker Options Settings ###

 - `availableDateRangeTypes` &mdash; Optional. Provides an array of integers (`dateRangeTypes` ENUM) to specify an ordered list of date-range types for the dropdown.  Common variations are available in the date-range picker service.

### Date-range Picker Service ###
The date-range picker service provides functionality that works closely with the directive. The service provides the following members:

 - `dateRangeTypes` &mdash; An ENUM of all date-range types that the date-range picker understands and can include in the dropdown.
 - `defaultDateRangeOptions` &mdash; An array of `dateRangeTypes` that provides the default order and set of date-range types included in the dropdown.
 - `pastDateRangeOptions` &mdash; An array of `dateRangeTypes` that are appropriate to filter for things that occurred in the past. For example, you don't want to search for items created "next month."
 - `getDateRangeTypeCaption` &mdash; A function to get the caption of the dropdown item for a given `bb-date-range-picker-value`.
 - `getDateRangeFilterDescription` &mdash; A function to get the description of a given `bb-date-range-picker-value`.
 */

(function () {
    'use strict';
    angular.module('sky.daterangepicker', ['sky.resources'])
        .factory('bbDateRangePicker', ['bbResources', function (bbResources) {

            var dateRangeTypes,
                defaultDateRangeOptions,
                pastDateRangeOptions;

            dateRangeTypes = {
                AT_ANY_TIME: 0,
                NEXT_WEEK: 1,
                THIS_MONTH: 2,
                NEXT_MONTH: 3,
                THIS_QUARTER: 4,
                NEXT_QUARTER: 5,
                THIS_FISCAL_YEAR: 6,
                NEXT_FISCAL_YEAR: 7,
                THIS_CALENDAR_YEAR: 8,
                NEXT_CALENDAR_YEAR: 9,
                LAST_WEEK: 10,
                LAST_MONTH: 11,
                LAST_QUARTER: 12,
                LAST_FISCAL_YEAR: 13,
                LAST_CALENDAR_YEAR: 14,
                TODAY: 15,
                YESTERDAY: 16,
                TOMORROW: 17,
                THIS_WEEK: 18
            };

            defaultDateRangeOptions = [
                dateRangeTypes.AT_ANY_TIME,
                dateRangeTypes.YESTERDAY,
                dateRangeTypes.TODAY,
                dateRangeTypes.TOMORROW,
                dateRangeTypes.LAST_WEEK,
                dateRangeTypes.THIS_WEEK,
                dateRangeTypes.NEXT_WEEK,
                dateRangeTypes.LAST_MONTH,
                dateRangeTypes.THIS_MONTH,
                dateRangeTypes.NEXT_MONTH,
                dateRangeTypes.LAST_QUARTER,
                dateRangeTypes.THIS_QUARTER,
                dateRangeTypes.NEXT_QUARTER,
                dateRangeTypes.LAST_CALENDAR_YEAR,
                dateRangeTypes.THIS_CALENDAR_YEAR,
                dateRangeTypes.NEXT_CALENDAR_YEAR,
                dateRangeTypes.LAST_FISCAL_YEAR,
                dateRangeTypes.THIS_FISCAL_YEAR,
                dateRangeTypes.NEXT_FISCAL_YEAR
            ];

            pastDateRangeOptions = [
                dateRangeTypes.AT_ANY_TIME,
                dateRangeTypes.YESTERDAY,
                dateRangeTypes.TODAY,
                dateRangeTypes.LAST_WEEK,
                dateRangeTypes.THIS_WEEK,
                dateRangeTypes.LAST_MONTH,
                dateRangeTypes.THIS_MONTH,
                dateRangeTypes.LAST_QUARTER,
                dateRangeTypes.THIS_QUARTER,
                dateRangeTypes.LAST_CALENDAR_YEAR,
                dateRangeTypes.THIS_CALENDAR_YEAR,
                dateRangeTypes.LAST_FISCAL_YEAR,
                dateRangeTypes.THIS_FISCAL_YEAR
            ];

            function getDateRangeTypeCaption(dateRangePickerValue) {
                if (angular.isNumber(dateRangePickerValue)) {
                    // If the input is the enum value itself, then map it to the object structure we expect before proceeding.
                    dateRangePickerValue = { dateRangeType: dateRangePickerValue };
                } else {
                    // If the value is undefiend, then map it to a null object.
                    dateRangePickerValue = dateRangePickerValue || {};
                }

                if (!angular.isDefined(dateRangePickerValue.dateRangeType)) {
                    // If the enum value is undefined, then it represents any time.
                    dateRangePickerValue.dateRangeType = dateRangeTypes.AT_ANY_TIME;
                }

                switch (dateRangePickerValue.dateRangeType) {
                case dateRangeTypes.AT_ANY_TIME:
                    return bbResources.date_range_picker_at_any_time;

                case dateRangeTypes.THIS_WEEK:
                    return bbResources.date_range_picker_this_week;

                case dateRangeTypes.NEXT_WEEK:
                    return bbResources.date_range_picker_next_week;

                case dateRangeTypes.THIS_MONTH:
                    return bbResources.date_range_picker_this_month;

                case dateRangeTypes.NEXT_MONTH:
                    return bbResources.date_range_picker_next_month;

                case dateRangeTypes.THIS_QUARTER:
                    return bbResources.date_range_picker_this_quarter;

                case dateRangeTypes.NEXT_QUARTER:
                    return bbResources.date_range_picker_next_quarter;

                case dateRangeTypes.THIS_FISCAL_YEAR:
                    return bbResources.date_range_picker_this_fiscal_year;

                case dateRangeTypes.NEXT_FISCAL_YEAR:
                    return bbResources.date_range_picker_next_fiscal_year;

                case dateRangeTypes.THIS_CALENDAR_YEAR:
                    return bbResources.date_range_picker_this_calendar_year;

                case dateRangeTypes.NEXT_CALENDAR_YEAR:
                    return bbResources.date_range_picker_next_calendar_year;

                case dateRangeTypes.LAST_WEEK:
                    return bbResources.date_range_picker_last_week;

                case dateRangeTypes.LAST_MONTH:
                    return bbResources.date_range_picker_last_month;

                case dateRangeTypes.LAST_QUARTER:
                    return bbResources.date_range_picker_last_quarter;

                case dateRangeTypes.LAST_FISCAL_YEAR:
                    return bbResources.date_range_picker_last_fiscal_year;

                case dateRangeTypes.LAST_CALENDAR_YEAR:
                    return bbResources.date_range_picker_last_calendar_year;

                case dateRangeTypes.TODAY:
                    return bbResources.date_range_picker_today;

                case dateRangeTypes.YESTERDAY:
                    return bbResources.date_range_picker_yesterday;

                case dateRangeTypes.TOMORROW:
                    return bbResources.date_range_picker_tomorrow;

                }
            }

            function getDateRangeFilterDescription(dateRangePickerValue) {
                // If the value is undefiend, then map it to a null object.
                dateRangePickerValue = dateRangePickerValue || {};

                if (!angular.isDefined(dateRangePickerValue.dateRangeType)) {
                    // If the enum value is undefined, then it represents any time.
                    dateRangePickerValue.dateRangeType = dateRangeTypes.AT_ANY_TIME;
                }

                switch (dateRangePickerValue.dateRangeType) {
                case dateRangeTypes.AT_ANY_TIME:
                    return bbResources.date_range_picker_filter_description_at_any_time;

                case dateRangeTypes.THIS_WEEK:
                    return bbResources.date_range_picker_filter_description_this_week;

                case dateRangeTypes.NEXT_WEEK:
                    return bbResources.date_range_picker_filter_description_next_week;

                case dateRangeTypes.THIS_MONTH:
                    return bbResources.date_range_picker_filter_description_this_month;

                case dateRangeTypes.NEXT_MONTH:
                    return bbResources.date_range_picker_filter_description_next_month;

                case dateRangeTypes.THIS_QUARTER:
                    return bbResources.date_range_picker_filter_description_this_quarter;

                case dateRangeTypes.NEXT_QUARTER:
                    return bbResources.date_range_picker_filter_description_next_quarter;

                case dateRangeTypes.THIS_FISCAL_YEAR:
                    return bbResources.date_range_picker_filter_description_this_fiscal_year;

                case dateRangeTypes.NEXT_FISCAL_YEAR:
                    return bbResources.date_range_picker_filter_description_next_fiscal_year;

                case dateRangeTypes.THIS_CALENDAR_YEAR:
                    return bbResources.date_range_picker_filter_description_this_calendar_year;

                case dateRangeTypes.NEXT_CALENDAR_YEAR:
                    return bbResources.date_range_picker_filter_description_next_calendar_year;

                case dateRangeTypes.LAST_WEEK:
                    return bbResources.date_range_picker_filter_description_last_week;

                case dateRangeTypes.LAST_MONTH:
                    return bbResources.date_range_picker_filter_description_last_month;

                case dateRangeTypes.LAST_QUARTER:
                    return bbResources.date_range_picker_filter_description_last_quarter;

                case dateRangeTypes.LAST_FISCAL_YEAR:
                    return bbResources.date_range_picker_filter_description_last_fiscal_year;

                case dateRangeTypes.LAST_CALENDAR_YEAR:
                    return bbResources.date_range_picker_filter_description_last_calendar_year;

                case dateRangeTypes.TODAY:
                    return bbResources.date_range_picker_filter_description_today;

                case dateRangeTypes.YESTERDAY:
                    return bbResources.date_range_picker_filter_description_yesterday;

                case dateRangeTypes.TOMORROW:
                    return bbResources.date_range_picker_filter_description_tomorrow;

                }
            }

            return {
                dateRangeTypes: dateRangeTypes,
                defaultDateRangeOptions: defaultDateRangeOptions,
                pastDateRangeOptions: pastDateRangeOptions,
                getDateRangeTypeCaption: getDateRangeTypeCaption,
                getDateRangeFilterDescription: getDateRangeFilterDescription
            };

        }])
        .directive('bbDateRangePicker', ['bbDateRangePicker', function (bbDateRangePicker) {
            /// <summary>
            /// This directive provides a date range filter control
            /// </summary>

            return {
                replace: true,
                restrict: 'E',
                templateUrl: 'sky/templates/daterangepicker/daterangepicker.html',
                scope: {
                    bbDateRangePickerValue: "=",
                    bbDateRangePickerAutomationId: "=",
                    bbDateRangePickerOptions: '='
                },
                controller: ['$scope', function ($scope) {

                    $scope.locals = {
                        bbDateRangePicker: bbDateRangePicker
                    };

                    $scope.$watch("bbDateRangePickerValue", function (newVal) {
                        if (!newVal) {
                            $scope.bbDateRangePickerValue = {
                                dateRangeType: bbDateRangePicker.dateRangeTypes.AT_ANY_TIME
                            };
                            return;
                        }
                        newVal.dateRangeType = newVal.dateRangeType || bbDateRangePicker.dateRangeTypes.AT_ANY_TIME;
                    }, true);
                }]
            };
        }]);

}());
