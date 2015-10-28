/*global angular */

(function () {
    'use strict';
    function TabscrollTestController($timeout) {
        var self = this;
        self.replay = function () {
            self.ready = false;
            $timeout(function () {
                self.ready = true;
            }, 200);
        };

        $timeout(function () {
            self.ready = true;
        }, 2000);
    }

    TabscrollTestController.$inject = ['$timeout'];

    angular.module('stache').controller('TabscrollTestController', TabscrollTestController);

}());
