/*global angular */
(function () {
    'use strict';

    var bbPhoneFieldConfig = {
        countryIso2: 'us'
    };

    angular.module('sky.phonefield.config', [])
        .constant('bbPhoneFieldConfig', bbPhoneFieldConfig);
}());
