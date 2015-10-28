/*global angular */
(function () {
    'use strict';

    function TabsetVisualController() {
        var self = this;
        self.open = angular.noop;
        self.add = angular.noop;
    }

    angular.module('screenshots', ['sky'])
    .controller('TabsetVisualController', TabsetVisualController);
}());
