/* global angular */

(function () {
    'use strict';

    function bbDatepickerCustomValidate($filter, bbDatepickerParser) {
        return {
            restrict: 'A',
            require: ['ngModel', '^bbDatepicker'],
            link: function ($scope, el, attr, controllers) {
                var ngModel = controllers[0],
                    format = attr.uibDatepickerPopup;

                if (attr.bbDatepickerCustomValidate && attr.bbDatepickerCustomValidate === 'true') {
                    ngModel.$parsers = [];
                    ngModel.$validators.date = function () {
                        return true;
                    };
                } else {
                    ngModel.$parsers.unshift(function (viewValue) {
                        var newDate = ngModel.$viewValue,
                            date = null;

                        date = bbDatepickerParser.runParsers(newDate, format);

                        if (angular.isDate(date)) {
                            el.val($filter('date')(date, format));
                        }

                        return date ? date : viewValue;
                    });
                }
                controllers[1].getInputNgModel = function () {
                    return ngModel;
                };
            }
        };
    }

    bbDatepickerCustomValidate.$inject = ['$filter', 'bbDatepickerParser'];

    angular.module('sky.datepicker.customvalidate', ['sky.datepicker.parser'])
        .directive('bbDatepickerCustomValidate', bbDatepickerCustomValidate);
}());
