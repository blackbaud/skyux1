/*jshint browser: true */
/*global angular */

(function () {
    'use strict';


    function bbDateRangePickerFactory(bbResources) {
        var dateRangeTypes,
            defaultDateRangeOptions,
            specificDateRangeOptions,
            pastDateRangeOptions,
            dateRangeMap;

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
            THIS_WEEK: 18,
            SPECIFIC_RANGE: 19
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

        specificDateRangeOptions = defaultDateRangeOptions.concat([dateRangeTypes.SPECIFIC_RANGE]);

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

        dateRangeMap = {};
        dateRangeMap[dateRangeTypes.AT_ANY_TIME] = {
            caption: bbResources.date_range_picker_at_any_time,
            description: bbResources.date_range_picker_filter_description_at_any_time
        };
        dateRangeMap[dateRangeTypes.YESTERDAY] = {
            caption: bbResources.date_range_picker_yesterday,
            description: bbResources.date_range_picker_filter_description_yesterday
        };
        dateRangeMap[dateRangeTypes.TODAY] = {
            caption: bbResources.date_range_picker_today,
            description: bbResources.date_range_picker_filter_description_today
        };
        dateRangeMap[dateRangeTypes.TOMORROW] = {
            caption: bbResources.date_range_picker_tomorrow,
            description: bbResources.date_range_picker_filter_description_tomorrow
        };
        dateRangeMap[dateRangeTypes.LAST_WEEK] = {
            caption: bbResources.date_range_picker_last_week,
            description: bbResources.date_range_picker_filter_description_last_week
        };
        dateRangeMap[dateRangeTypes.THIS_WEEK] = {
            caption: bbResources.date_range_picker_this_week,
            description: bbResources.date_range_picker_filter_description_this_week
        };
        dateRangeMap[dateRangeTypes.NEXT_WEEK] = {
            caption: bbResources.date_range_picker_next_week,
            description: bbResources.date_range_picker_filter_description_next_week
        };
        dateRangeMap[dateRangeTypes.LAST_QUARTER] = {
            caption: bbResources.date_range_picker_last_quarter,
            description: bbResources.date_range_picker_filter_description_last_quarter
        };
        dateRangeMap[dateRangeTypes.THIS_QUARTER] = {
            caption: bbResources.date_range_picker_this_quarter,
            description: bbResources.date_range_picker_filter_description_this_quarter
        };
        dateRangeMap[dateRangeTypes.NEXT_QUARTER] = {
            caption: bbResources.date_range_picker_next_quarter,
            description: bbResources.date_range_picker_filter_description_next_quarter
        };
        dateRangeMap[dateRangeTypes.LAST_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_last_calendar_year,
            description: bbResources.date_range_picker_filter_description_last_calendar_year
        };
        dateRangeMap[dateRangeTypes.THIS_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_this_calendar_year,
            description: bbResources.date_range_picker_filter_description_this_calendar_year
        };
        dateRangeMap[dateRangeTypes.NEXT_CALENDAR_YEAR] = {
            caption: bbResources.date_range_picker_next_calendar_year,
            description: bbResources.date_range_picker_filter_description_next_calendar_year
        };
        dateRangeMap[dateRangeTypes.LAST_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_last_fiscal_year,
            description: bbResources.date_range_picker_filter_description_last_fiscal_year
        };
        dateRangeMap[dateRangeTypes.THIS_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_this_fiscal_year,
            description: bbResources.date_range_picker_filter_description_this_fiscal_year
        };
        dateRangeMap[dateRangeTypes.NEXT_FISCAL_YEAR] = {
            caption: bbResources.date_range_picker_next_fiscal_year,
            description: bbResources.date_range_picker_filter_description_next_fiscal_year
        };
        dateRangeMap[dateRangeTypes.THIS_MONTH] = {
            caption: bbResources.date_range_picker_this_month,
            description: bbResources.date_range_picker_filter_description_this_month
        };
        dateRangeMap[dateRangeTypes.NEXT_MONTH] = {
            caption: bbResources.date_range_picker_next_month,
            description: bbResources.date_range_picker_filter_description_next_month
        };
        dateRangeMap[dateRangeTypes.LAST_MONTH] = {
            caption: bbResources.date_range_picker_last_month,
            description: bbResources.date_range_picker_filter_description_last_month
        };
        dateRangeMap[dateRangeTypes.SPECIFIC_RANGE] = {
            caption: bbResources.date_range_picker_specific_range,
            description: bbResources.date_range_picker_filter_description_specific_range
        };

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

            return dateRangeMap[dateRangePickerValue.dateRangeType].caption;
        }

        function getDateRangeFilterDescription(dateRangePickerValue) {
            // If the value is undefiend, then map it to a null object.
            dateRangePickerValue = dateRangePickerValue || {};

            if (!angular.isDefined(dateRangePickerValue.dateRangeType)) {
                // If the enum value is undefined, then it represents any time.
                dateRangePickerValue.dateRangeType = dateRangeTypes.AT_ANY_TIME;
            }

            return dateRangeMap[dateRangePickerValue.dateRangeType].description;
        }

        return {
            dateRangeTypes: dateRangeTypes,
            defaultDateRangeOptions: defaultDateRangeOptions,
            pastDateRangeOptions: pastDateRangeOptions,
            specificDateRangeOptions: specificDateRangeOptions,
            getDateRangeTypeCaption: getDateRangeTypeCaption,
            getDateRangeFilterDescription: getDateRangeFilterDescription
        };
    }

    bbDateRangePickerFactory.$inject = ['bbResources'];

    function bbDateRangePickerDirective(bbDateRangePicker, bbResources) {
        /// <summary>
        /// This directive provides a date range filter control
        /// </summary>

        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'sky/templates/daterangepicker/daterangepicker.html',
            scope: {},
            controllerAs: 'bbDateRangePickerCtrl',
            bindToController: {
                bbDateRangePickerValue: "=",
                bbDateRangePickerAutomationId: "=",
                bbDateRangePickerOptions: '=',
                fromDate: '=?bbDateRangePickerFromDate',
                toDate: '=?bbDateRangePickerToDate',
                pickerLabel: '=?bbDateRangePickerLabel',
                isValid: '=?bbDateRangePickerValid'
            },
            controller: ['$scope', function ($scope) {
                var vm = this;

                vm.bbDateRangePicker = bbDateRangePicker;
                vm.resources = bbResources;

                $scope.$watch(
                    function () {
                        return vm.dateRangeForm.$valid;
                    }, function (newVal) {
                        vm.isValid = newVal;
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.fromDate;
                    }, function (newVal) {
                        /* This prevents minDate from having a reference
                           to fromDate and changing it */
                        vm.minDate = angular.copy(newVal);
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.toDate;
                    }, function (newVal) {
                        /* This prevents maxDate from having a reference
                           to toDate and changing it */
                        vm.maxDate = angular.copy(newVal);
                    }
                );

                $scope.$watch(
                    function () {
                        return vm.bbDateRangePickerValue;
                    }, function (newVal) {
                    if (!newVal) {
                        vm.bbDateRangePickerValue = {
                            dateRangeType: bbDateRangePicker.dateRangeTypes.AT_ANY_TIME
                        };
                        return;
                    }
                    vm.specificRangeIsVisible = vm.bbDateRangePickerValue.dateRangeType === bbDateRangePicker.dateRangeTypes.SPECIFIC_RANGE;
                    newVal.dateRangeType = newVal.dateRangeType || bbDateRangePicker.dateRangeTypes.AT_ANY_TIME;
                }, true);
            }],
            link: function ($scope, el, attr, vm) {
                vm.noLabels = attr.bbDateRangePickerNoLabels;
                if (vm.noLabels) {
                    vm.toPlaceholder = bbResources.date_range_picker_to_date;
                    vm.fromPlaceholder = bbResources.date_range_picker_from_date;
                } else {
                    vm.toPlaceholder = '';
                    vm.fromPlaceholder = '';
                }
            }
        };
    }
    bbDateRangePickerDirective.$inject = ['bbDateRangePicker', 'bbResources'];

    angular.module('sky.daterangepicker', ['sky.resources', 'sky.datepicker'])
        .factory('bbDateRangePicker', bbDateRangePickerFactory)
        .directive('bbDateRangePicker', bbDateRangePickerDirective);
}());
