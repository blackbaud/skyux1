/* global angular*/

(function () {
    'use strict';

    function CardTestController() {
        var vm = this;

        vm.showTitle = true;
        vm.showContent = true;
        vm.showActions = true;
        vm.showCheckbox = true;
    }

    angular.module('stache')
        .controller('CardTestController', CardTestController);
}());
