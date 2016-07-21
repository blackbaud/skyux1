/* global angular */
(function () {
    'use strict';

    function bbDatepickerMaxDate() {
        return {
            restrict: 'A',
            require: ['ngModel', '^bbDatepicker'],
            link: function ($scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    bbDatepicker = ctrls[1];
                ngModel.$validators.maxDate = function (modelValue) {
                    return !bbDatepicker.bbMaxDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate(bbDatepicker.bbMaxDate) || modelValue <= bbDatepicker.bbMaxDate;
                };
            }
        };
    }

    angular.module('sky.datepicker.maxdate', [])
        .directive('bbDatepickerMaxDate', bbDatepickerMaxDate);
}());
