/*global angular */

(function () {
    'use strict';

    function ResourcesTestController(bbResources) {
        var vm = this;
        vm.fiscal = bbResources.date_range_picker_this_fiscal_year;
    }

    ResourcesTestController.$inject = ['bbResources'];

    angular.module('stache')
        .controller('ResourcesTestController', ResourcesTestController);
}());
