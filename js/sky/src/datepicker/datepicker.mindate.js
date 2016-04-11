/* global angular */
(function () {
    'use strict';

    function bbMinDate() {
        return {
            restrict: 'A',
            require: ['ngModel', '^bbDatepicker'],
            link: function ($scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    bbDatepicker = ctrls[1];

                ngModel.$validators.minDate = function (modelValue) {
                    return !bbDatepicker.minDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate(bbDatepicker.minDate) || modelValue >= bbDatepicker.minDate;
                };
            }
        };
    }


    angular.module('sky.datepicker.mindate', [])
        .directive('bbMinDate', bbMinDate);
}());
