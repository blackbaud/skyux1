/* global angular*/

(function () {
    'use strict';

    function PageSummaryTestController() {
        var vm = this;

        vm.showTitle = true;
        vm.showStatus = true;
        vm.showContent = true;
    }

    angular.module('stache')
        .controller('PageSummaryTestController', PageSummaryTestController);
}());
