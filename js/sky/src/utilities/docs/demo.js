/*global angular */
(function () {
    'use strict';

    function UtilitiesController() {
        var self = this;

        self.formattedText = '';
        self.encodedText = 'amp=&';
    }

    angular.module('stache').controller('UtilitiesController', UtilitiesController);
}());
