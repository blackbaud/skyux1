/* global angular */
(function () {
    'use strict';

    function bbMaxDate() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$validators.maxDate = function (modelValue) {
                    return !$scope.maxDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate($scope.maxDate) || modelValue <= $scope.maxDate;
                };
            }
        };
    }

    angular.module('sky.datepicker.maxDate')
        .directive('bbMaxDate', bbMaxDate);
}());
