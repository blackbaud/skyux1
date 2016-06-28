/*global angular */

(function () {
    'use strict';

    function MicrolayoutTestController() {
        var vm = this;
        vm.heading = 'false';
    }

    angular.module('stache')
        .controller('MicrolayoutTestController', MicrolayoutTestController);
}());