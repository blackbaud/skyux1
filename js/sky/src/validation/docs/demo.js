/*global angular */
(function () {
    'use strict';

    function ValidationTestController() {
        var self = this;
        self.email = '';
    }

    angular.module('stache').controller('ValidationTestController', ValidationTestController);
}());
