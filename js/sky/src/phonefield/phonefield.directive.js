/* global angular, intlTelInputUtils*/
(function () {
    'use strict';

    /**
    * bbPhoneField directive controller for bb-phone-field
    */
    function bbPhoneField(bbPhoneFieldConfig) {
        function link($scope, el, attrs, ctrls) {
            // ** variables **
            var input = el,
                phoneField = ctrls[0],
                ngModel = ctrls[1];

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
                    if (phoneField.props.countryIso2 === selectedCountryData.iso2) {
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
                        phoneField.props.selectedCountry = countryData;
                    });
            });

            // ** ng-model settings **
            // anytime ng-model is updated, its final value should be the formatted phone number
            ngModel.$parsers.unshift(function () {
                return getFormattedNumber();
            });
            ngModel.$formatters.unshift(function (value) {
                input.val(value);
                return getFormattedNumber();
            });
            // tie ng-model's format validation to the plugin's validator
            ngModel.$validators.bbPhoneFormat = function (modelValue) {
                return modelValue && input.intlTelInput('isValidNumber');
            };

            // ** bbPhoneFieldConfig properties **
            // if a default country as countryIso2 is not provided, we set it to bbPhoneFieldConfig's countryIso2
            if (!phoneField.props.countryIso2) {
                phoneField.props.countryIso2 = bbPhoneFieldConfig.countryIso2;
            }
            input.intlTelInput('setCountry', phoneField.props.countryIso2);
            phoneField.props.selectedCountry = input.intlTelInput('getSelectedCountryData');

            // ** ARIA (Accessibility Rich Internet Applications) **
            // We hide the country dropdown from a screen reader because the "dropdown"
            // is actually an unordered list which is not easily accessed without clicking or arrowing accordingly
            angular.element('.selected-flag').attr('aria-hidden', true);
            // If the screen-reader user does manage to get the dropdown going, we apply the ARIA tags so that they can header the countries
            angular.element('.country-list').attr('role', 'listbox');
            angular.element('.country').attr('role', 'option');
        }

        return {
            bindToController: {
                props: '=bbPhoneField'
            },
            controller: bbPhoneField,
            controllerAs: "bbPhoneField",
            link: link,
            require: ['bbPhoneField', 'ngModel'],
            restrict: 'A'
        };
    }

    bbPhoneField.$inject = ['bbPhoneFieldConfig'];

    angular.module('sky.phonefield.directive', ['sky.phonefield.config'])
        .directive('bbPhoneField', bbPhoneField);
}());
