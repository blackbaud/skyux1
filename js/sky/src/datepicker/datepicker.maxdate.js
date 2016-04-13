/* global angular */
(function () {
    'use strict';

    function bbMaxDate() {
        return {
            restrict: 'A',
            require: ['ngModel', '^bbDatepicker'],
            link: function ($scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    bbDatepicker = ctrls[1];
                ngModel.$validators.maxDate = function (modelValue) {
                    return !bbDatepicker.maxDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate(bbDatepicker.maxDate) || modelValue <= bbDatepicker.maxDate;
                };
            }
        };
    }

    angular.module('sky.datepicker.maxdate', [])
        .directive('bbMaxDate', bbMaxDate);
}());
