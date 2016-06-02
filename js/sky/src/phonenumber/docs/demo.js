/*global angular */
(function () {
    'use strict';

    function PhoneNumberDemoController($scope) {
        var self = this;
        self.countryData = {
            name: 'United States',
            iso2: 'us',
            dialCode: 1
        };

        self.countryChanged = function (countryData) {
            $scope.$apply(function () {
                self.countryData = countryData;
            });
        };
    }

    PhoneNumberDemoController.$inject = ['$scope'];

    angular.module('stache')
      .controller('PhoneNumberDemoController', PhoneNumberDemoController);
}());
