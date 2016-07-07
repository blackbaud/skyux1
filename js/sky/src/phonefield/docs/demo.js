/*global angular */
(function () {
    'use strict';

    function PhoneFieldDemoController() {
        var self = this;

        self.bbPhoneFieldConfig = {
            countryIso2: 'us'
        };

        self.phoneNumber = '01812-345678';
    }

    angular.module('stache')
      .controller('PhoneFieldDemoController', PhoneFieldDemoController);
}());
