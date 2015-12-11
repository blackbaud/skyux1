/*global angular, alert */
(function () {
    'use strict';

    function AutonumericInputTestController() {
        var self = this;

        self.moneyValue = 12345678;
        self.numberValue = 87654321;
        self.customSettings = {
            aSign: '$',
            vMin: 0
        };

        self.clickButton = function () {
            alert('model value is: ' + self.moneyValue);
        };

    }

    function AutonumericConfig(bbAutonumericConfig) {
        bbAutonumericConfig.money.aSep = ',';
    }

    AutonumericConfig.$inject = ['bbAutonumericConfig'];

    angular.module('stache')
    .config(AutonumericConfig)
    .controller('AutonumericInputTestController', AutonumericInputTestController);

}());
