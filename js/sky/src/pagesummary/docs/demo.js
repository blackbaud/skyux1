/* global angular*/

(function () {
    'use strict';

    function PageSummaryTestController() {
        var vm = this;

        vm.name = 'Robert C. Hernandez';

        vm.showAlert = true;
        vm.showImage = true;
        vm.showTitle = true;
        vm.showSubtitle = true;
        vm.showStatus = true;
        vm.showContent = true;
        vm.showKeyInfo = true;
    }

    angular.module('stache')
        .controller('PageSummaryTestController', PageSummaryTestController);
}());
