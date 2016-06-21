/*global angular */
(function () {
    'use strict';

    function PhoneFieldDemoController() {
        var self = this;

        self.bbPhoneFieldConfig = {
            countryIso2: 'us'
        };
    }

    angular.module('stache')
      .controller('PhoneFieldDemoController', PhoneFieldDemoController);
}());
