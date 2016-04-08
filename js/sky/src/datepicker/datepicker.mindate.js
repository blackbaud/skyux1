/* global angular */
(function () {
    'use strict';

    function bbMinDate() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModel) {
                ngModel.$validators.minDate = function (modelValue) {
                    return !$scope.minDate || !modelValue || !angular.isDate(modelValue) || !angular.isDate($scope.minDate) || modelValue >= $scope.minDate;
                };
            }
        };
    }


    angular.module('sky.datepicker.mindate', [])
        .directive('bbMinDate', bbMinDate);
}());
