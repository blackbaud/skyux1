/* global angular, intlTelInputUtils*/
(function () {
    'use strict';

    /**
    * bbPhoneField directive controller for bb-phone-field
    */
    function bbPhoneField() {
        function link($scope, el, attrs, ngModel) {
            // ** variables **
            var input = el;

            /**
            * getFormattedNumber returns the national or internationally formatted phone number in the input
            * based on the currently selected country and the default country
            */
            function getFormattedNumber() {
                var formattedNumber = '',
                    selectedCountryData = input.intlTelInput('getSelectedCountryData');

                // Grab the plugin's version of the formatted phone number
                if (input.val()) {
                    formattedNumber = input.intlTelInput('getNumber', intlTelInputUtils.numberFormat.NATIONAL);
                    // If the currently selected country is also the directive's default country, it is already formatted
                    if ($scope.bbPhoneFieldConfig.props && $scope.bbPhoneFieldConfig.props.countryIso2 === selectedCountryData.iso2) {
                        return formattedNumber;
                    } else if (selectedCountryData && formattedNumber.indexOf('+') < 0) {
                        return '+' + selectedCountryData.dialCode + ' ' + formattedNumber;
                    }
                }

                return formattedNumber;
            }

            // ** intl-tel-input initilization **
            // initialize the intl-tel-input plugin.
            // nationalMode is true by default, which we want for easy formatting purposes.
            input.intlTelInput();
            // when the country changes, update the scope's bbPhoneFieldConfig property
            input.on('countrychange', function (e, countryData) {
                ngModel.$setViewValue(getFormattedNumber());
                $scope.$apply(function () {
                        if ($scope.bbPhoneFieldConfig.props) {
                            $scope.bbPhoneFieldConfig.props.selectedCountry = countryData;
                        }
                    });
            });

            // ** ng-model settings **
            // anytime ng-model is updated, its final value should be the formatted phone number
            $scope.$watch(attrs.ngModel, function () {
                ngModel.$setViewValue(getFormattedNumber());
            });
            // tie ng-model's format validation to the plugin's validator
            ngModel.$validators.bbPhoneFormat = function (modelValue) {
                return modelValue && input.intlTelInput('isValidNumber');
            };

            // ** bbPhoneFieldConfig properties **
            if ($scope.bbPhoneFieldConfig.props) {
                // if a default country is provided, we set that as the initial country
                if ($scope.bbPhoneFieldConfig.props.countryIso2) {
                    input.intlTelInput('setCountry', $scope.bbPhoneFieldConfig.props.countryIso2);
                }
                $scope.bbPhoneFieldConfig.props.selectedCountry = input.intlTelInput('getSelectedCountryData');
            }
        }

        return {
            bindToController: {
                props: '=bbPhoneField'
            },
            controller: bbPhoneField,
            controllerAs: "bbPhoneFieldConfig",
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
    }

    angular.module('sky.phonefield.directive', [])
        .directive('bbPhoneField', bbPhoneField);
}());
