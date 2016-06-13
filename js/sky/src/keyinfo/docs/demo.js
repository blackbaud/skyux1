/*global angular */

(function () {
    'use strict';

    function KeyInfoTestController() {
        var vm = this;
        vm.layout = 'horizontal';

    }

    angular.module('stache')
        .controller('KeyInfoTestController', KeyInfoTestController);
}());
