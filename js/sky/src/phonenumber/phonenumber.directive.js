/* global angular, intlTelInputUtils*/
(function () {
    'use strict';

    /**
    * bbPhoneNumber directive controller for bb-phone-number
    */
    function bbPhoneNumber() {
        function link($scope, el) {
            // ** variables **
            var input;

            // the element should just be the input of the template
            input = el.find('#bb-phone-number-input');

            // ** functions **
            /**
            * selectedCountryIsDefaultCountry returns true if the selected country is the expected country,
            * false if otherwise
            */
            function selectedCountryIsLocal() {
                return input.intlTelInput('getSelectedCountryData').iso2 === $scope.localCountry;
            }

            /**
            * getFormattedNumber gets the phone number formatted in the default format
            * if the selected country is the default country
            */
            function getFormattedNumber() {
                var formattedNumber = '',
                    selectedCountryData = input.intlTelInput('getSelectedCountryData');

                // Grab the plugin's version of the formatted phone number
                if (input.val()) {
                    formattedNumber = input.intlTelInput('getNumber', intlTelInputUtils.numberFormat.NATIONAL);
                    // If the currently selected country is also the directive's default country, it is already formatted
                    if (selectedCountryIsLocal()) {
                        return formattedNumber;
                    }

                    // Last, we want to return the formatted number in its international form but still formatted, which the plugin does not provide
                    if (selectedCountryData && formattedNumber.indexOf('+') < 0) {
                        return '+' + selectedCountryData.dialCode + ' ' + formattedNumber;
                    }
                }
            }

            // ** intl-tel-input initilization **
            // initialize the intl-tel-input plugin.
            // nationalMode is true by default, which we want for easy formatting purposes.
            input.intlTelInput();

            // ** scope variables **
            // when the plugin's country is changed, update the scope's formatted number
            // and run whatever function is provided in the bb-phone-number-country-changed function
            input.on('countrychange', function (e, countryData) {
                $scope.formattedNumber = getFormattedNumber();

                if ($scope.countryChanged) {
                    $scope.countryChanged({
                        countryData: countryData
                    });
                }
            });

            // if bb-phone-number-formatted-number is not set then we make it empty
            if (!$scope.formattedNumber) {
                $scope.formattedNumber = '';
            }

            // ensure that when the scope's phoneNumber is updated,
            // the variable provided by ng-model
            $scope.$watch('phoneNumber', function () {
                    $scope.formattedNumber = getFormattedNumber();
                }
              );

            // if a bb-phone-number-local-country is provided, then set it to the plugin's country
            if ($scope.localCountry) {
                input.intlTelInput('setCountry', $scope.localCountry);
            }

            $scope.$watch(
                function () {
                    return input.intlTelInput("isValidNumber");
                }, function (newVal) {
                    $scope.isValid = newVal;
                }
            );

            // ** ARIA (Accessibility Rich Internet Applications) **
            angular.element('.country-list').attr('role', 'listbox');
            angular.element('.country').attr('role', 'option');
        }

        return {
            controllerAs: 'bbPhoneNumber',
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                countryChanged: '&bbPhoneNumberCountryChanged',
                formattedNumber: '=?bbPhoneNumberFormattedNumber',
                isValid: '=?bbPhoneNumberValid',
                localCountry: '@bbPhoneNumberLocalCountry',
                phoneNumberLabel: '@?bbPhoneNumberLabel'
            },
            templateUrl: 'sky/templates/phonenumber/phonenumber.directive.html'
        };
    }

    angular.module('sky.phonenumber.directive', [])
        .directive('bbPhoneNumber', bbPhoneNumber);
}());
