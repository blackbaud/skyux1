/* global angular */
(function () {
    'use strict';

    function bbDatepickerMinDate() {
        return {
            restrict: 'A',
            require: ['ngModel', '^bbDatepicker'],
            link: function ($scope, element, attrs, ctrls) {
                var ngModel = ctrls[0],
                    bbDatepicker = ctrls[1];

                ngModel.$validators.minDate = function (modelValue) {
                    return !bbDatepicker.bbMinDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate(bbDatepicker.bbMinDate) || modelValue >= bbDatepicker.bbMinDate;
                };
            }
        };
    }


    angular.module('sky.datepicker.mindate', [])
        .directive('bbDatepickerMinDate', bbDatepickerMinDate);
}());
