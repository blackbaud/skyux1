/*global angular */

(function () {
    'use strict';

    function PhoneFieldTestController() {
        var self = this;
        self.bbPhoneFieldConfig = {
            countryIso2: 'us'
        };
    }

    angular.module('screenshots', ['sky'])
    .controller('PhoneFieldTestController', PhoneFieldTestController);

}());
