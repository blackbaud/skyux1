/*global angular */
(function () {
    'use strict';

    var bbPhoneFieldConfig = {
        countryIso2: '',
        selectedCountry: undefined
    };

    angular.module('sky.phonefield.config', [])
        .constant('bbPhoneFieldConfig', bbPhoneFieldConfig);
}());
